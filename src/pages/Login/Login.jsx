import { useState } from "react";
import styles from "./Login.module.css";
import TextInput from "../../components/TextInput/TextInput";
import loginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";
import { login } from '../../api/internal';
import { setUser } from '../../store/userSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';



function Login() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [error, setError] = useState("");

     const handleLogin = async () => {
        const data = {
            customerName: values.customerName,
            password: values.password
        }

        const response =  await login(data);

        if(response.status === 200){
        //1. setUser
        const user = {
            _id: response.data.user._id,
            customerName: response.data.user.customerName,
            customerEmail: response.data.user.customerEmail,
            auth: response.data.auth
        }

        dispatch(setUser(user));
        //2. redirect -> home
        navigate('/');

        }else if(response.code === "ERR_BAD_REQUEST"){
       // display error message
    //    console.log(response.response.data.message);
       setError(response.response.data.messsage);

        }
    }

const {values, touched, handleBlur, handleChange, errors} = useFormik({
    initialValues:{
        customerName: '',
        password: ''
    },
    validationSchema: loginSchema

});

  return (
    <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>Log in to your account</div>
        <TextInput 
        type="text"
        value={values.customerName}
        name="customerName"
        onBlur = {handleBlur}
        onChange = {handleChange}
        placeholder = "username"
        error={errors.customerName && touched.customerName ? 1: undefined}
        errormessage={errors.customerName}
        />
        <TextInput
         type="password"
         value={values.password}
         name="password"
         onBlur = {handleBlur}
         onChange = {handleChange}
         placeholder = "password"
         error={errors.password && touched.password ? 1 : undefined}
         errormessage={errors.password}
        />
        <button className={styles.logInButton} onClick={handleLogin} 
        disabled={
            !values.customerName ||
            !values.password ||
            errors.customerName ||
            errors.password
          }
        >Log In</button>
        <span>Don't have an account? <button className={styles.createAccount} onClick={()=>navigate('/signup')}>Register</button></span>
        {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  )
}

export default  Login;
