import { useState } from "react";
import { addInvestor } from "../../api/internal";
import { useSelector } from "react-redux";
import styles from "../AddInvestors/AddInvestors.module.css";
import TextInput from "../../components/TextInput/TextInput";
import { useNavigate,useParams } from "react-router-dom";


function AddInvestors() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.id;

    const [investorName, setInvestorName] = useState("");
    const [amount, setAmount] = useState("");


    const customerId = useSelector((state) => state.user._id);


    const submitHandler = async () => {
        const data = {
            investorName,
            projectId,
            customerId,
            amount
        };

        const response = await addInvestor(data);

        if (response.status === 201) {
           navigate(`/project/${projectId}`)
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Add a investor</div>
            <TextInput
                type="text"
                name="investorName"
                placeholder="investor name"
                value={investorName}
                onChange={(e) => setInvestorName(e.target.value)}
                style={{ width: "60%" }}
            />
             <TextInput
                type="number"
                name="amount"
                placeholder="enter amount of the investment"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "60%" }}
            />
            {/* <textarea
                className={styles.content}
                placeholder="your content goes here..."
                maxLength={400}
                value={amount}
                onChange={(e) => setProjectDes(e.target.value)}
            /> */}
            <button
                className={styles.submit}
                onClick={submitHandler}
                disabled={investorName === "" || amount === "" }
            >
                Add
            </button>
        </div>
    );
}

export default AddInvestors;