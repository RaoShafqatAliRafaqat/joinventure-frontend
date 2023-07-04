import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../Report/Report.module.css";
import TextInput from "../../components/TextInput/TextInput";
import { useNavigate,useParams } from "react-router-dom";
import {
    getInvestorsById,
  } from "../../api/internal";
  import Loader from '../../components/Loader/Loader';


function Report() {
    const [investors, setInvestors] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.id;
    var amountTotal = 0;

    const [amount, setAmount] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");


    const customerId = useSelector((state) => state.user._id);

    useEffect(() => {
        async function getProjectDetails() {
          const investorResponse = await getInvestorsById(projectId);
          if (investorResponse.status === 200) {
            // console.log(expenseResponse.data.data);
            setInvestors(investorResponse.data.data);
          }
    
        }
        getProjectDetails();
      }, [reload]);

    for (let i = 0; i < investors.length; i++) {
        amountTotal += investors[i].amount;
      }

      const negativeStyle = {
        color: '#ea3943'
      }
      const positiveStyle = {
        color: '#16c784'
      }
    

      if(investors.length === 0){
        return <Loader text="investors"/>
      }
   

    return (
        <div className={styles.wrapper}>
                  <div className={styles.header}>Project Report</div>
             <div className={styles.wrapperInner}>
      
             <TextInput
                type="number"
                name="sellingPrice"
                placeholder="enter closing amount"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                style={{ width: "60%" }}
            />
            {/* <textarea
                className={styles.content}
                placeholder="your content goes here..."
                maxLength={400}
                value={amount}
                onChange={(e) => setProjectDes(e.target.value)}
            /> */}
            {/* <button
                className={styles.submit}
                // onClick={submitHandler}
                disabled={sellingPrice === "" }
            >
                view profit/loss
            </button> */}
            </div>

            <div>
      <div className={styles.investor}>Investors</div>
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th> # </th>
          <th> Date </th>
          <th> Name </th>
          <th> Amount </th>
          <th> % </th>
          <th> Profit/loss </th>
          
        </tr>
      </thead>
      <tbody>
        {investors.map((investor,index) => (
      
          <tr id={investor.id} className={styles.tableRow}>
            <td>{index + 1}</td>
            <td>
              <div className={styles.logo}>
                 {new Date(investor.createdAt).toDateString()}
              </div>
            </td>
            <td>
              <div className={styles.symbol}>{investor.investorName}</div>
            </td>
            <td>{investor.amount}</td> 
            <td>{((investor.amount/amountTotal)*100).toFixed(2)}</td>  
            <td
              style={
                ((((investor.amount/amountTotal)*100)/100)*sellingPrice) < investor.amount
                  ? negativeStyle
                  : positiveStyle
              }
            >
              {((((investor.amount/amountTotal)*100)/100)*sellingPrice).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div>Total investment on this project is Rs  {amountTotal}</div>
    <div>Closing price of this project is Rs  {sellingPrice}</div>

    </div>
  </div>

       
    );
}

export default Report;