import styles from "./Signup.module.css";
import TextInput from "../../components/TextInput/TextInput";
import signupSchema from "../../schemas/signupSchema";
import { useFormik } from "formik";
import { setUser } from '../../store/userSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { signup } from '../../api/internal';



function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");


    const handleSignup = async () => {
        const data = {
            customerName : values.customerName,
            customerEmail : values.customerEmail,
            customerPhone : values.customerPhone,
            customerAddress : values.customerAddress,
            password : values.password,
            confirmPassword : values.confirmPassword,
        }
            
            const response = await signup(data);

            if(response.status === 201){
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
        
                }else if(response.code === 'ERR_BAD_RESPONSE'){
                // display error message
                setError(response.response.data.message);
        
                }
    



    }

const {values, touched, handleBlur, handleChange, errors} = useFormik({
    initialValues:{
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        password: '',
        confirmPassword: ''
    },
    validationSchema: signupSchema

});

return (
    <div className={styles.signupWrapper}>
        <div className={styles.signupHeader}>Create an account</div>
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
        type="text"
        value={values.customerEmail}
        name="customerEmail"
        onBlur = {handleBlur}
        onChange = {handleChange}
        placeholder = "email"
        error={errors.customerEmail && touched.customerEmail ? 1: undefined}
        errormessage={errors.customerEmail}
        />

<TextInput 
        type="number"
        value={values.customerPhone}
        name="customerPhone"
        onBlur = {handleBlur}
        onChange = {handleChange}
        placeholder = "phone"
        error={errors.customerPhone && touched.customerPhone ? 1: undefined}
        errormessage={errors.customerPhone}
        />

<TextInput 
        type="text"
        value={values.customerAddress}
        name="customerAddress"
        onBlur = {handleBlur}
        onChange = {handleChange}
        placeholder = "address"
        error={errors.customerAddress && touched.customerAddress ? 1: undefined}
        errormessage={errors.customerAddress}
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

<TextInput
         type="password"
         value={values.confirmPassword}
         name="confirmPassword"
         onBlur = {handleBlur}
         onChange = {handleChange}
         placeholder = "confirmPassword"
         error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
         errormessage={errors.confirmPassword}
        />
                <button className={styles.signupButton} onClick={handleSignup}
                 disabled={
                    !values.customerName ||
                    !values.password ||
                    !values.customerEmail ||
                    !values.customerPhone ||
                    !values.customerAddress ||
                    !values.confirmPassword ||
                    errors.customerName ||
                    errors.password ||
                    errors.confirmPassword ||
                    errors.customerPhone ||
                    errors.customerEmail ||
                    errors.customerAddress 
                  }
                >Sign Up</button>
        <span>Already have an account? <button className={styles.login} onClick={()=>navigate('/login')}>Log In</button></span>
    {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
        </div>

)}

export default  Signup;