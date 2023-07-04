import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProjectById,
  deleteProject,
  postExpense,
  getExpensesById,
  getInvestorsById,
} from "../../api/internal";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./ProjectDetails.module.css";
// import ExpenseList from "../../components/ExpenseList/ExpenseList";
import Expense from "../../components/Expense/Expense";

 function ProjectDetails() {
    const [project, setProject] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [ownsProject, setOwnsProject] = useState(false);
    const [newExpense, setNewExpense] = useState("");
    const [newExpenseTitle, setNewExpenseTitle] = useState("");
    const [reload, setReload] = useState(false);
    const [total, setTotal] = useState(0)
    var amountTotal = 0;
    var expenseTotal = 0;



    const navigate = useNavigate();

    const params = useParams();
    const projectId = params.id;


  const customerName = useSelector((state) => state.user.customerName);
  const userId = useSelector((state) => state.user._id);


  useEffect(() => {
    async function getProjectDetails() {
      const expenseResponse = await getExpensesById(projectId);
      if (expenseResponse.status === 200) {
        // console.log(expenseResponse.data.data);
        setExpenses(expenseResponse.data.data);
      }
    

      const investorResponse = await getInvestorsById(projectId);
      if (investorResponse.status === 200) {
        // console.log(expenseResponse.data.data);
        setInvestors(investorResponse.data.data);
      }

      const projectResponse = await getProjectById(projectId);
      
      if (projectResponse.status === 200) {
        // set ownership
        setOwnsProject(customerName === projectResponse.data.project.customerName);
        setProject(projectResponse.data.project);
      }
    }
    getProjectDetails();
  }, [reload]);

  // {Object.values(investors).map((values) => {
 
  
    for (let i = 0; i < investors.length; i++) {
      amountTotal += investors[i].amount;
    }
    for (let i = 0; i < expenses.length; i++) {
      expenseTotal += expenses[i].amount;
    }
    
  
  const postExpenseHandler = async () => {
    const data = {
      projectId: projectId,
      projectOwner: userId,
      expenseName: newExpenseTitle, 
      amount: newExpense,
    };

    const response = await postExpense(data);

    if (response.status === 200) {
      setNewExpense("");
      setNewExpenseTitle("");
      setReload(!reload);
    }
  };

  const deleteProjecthandler = async () => {
    const response = await deleteProject(projectId);

    if (response.status === 200) {
      navigate("/");
    }
  };

  if (project.length === 0) {
    return <Loader text="project details" />;
  }


  return (
    <div className={styles.detailsWrapper}>
    <div className={styles.left}>
    <h1 className={styles.title}>{project.projectName}</h1>
    <div className={styles.meta}>
      <p>
        By 
        {project.customerName +
          " on " +
          new Date(project.createdAt).toDateString()}
      </p>
    </div>
    <p className={styles.content}>{project.projectDes}</p>
    {ownsProject && (
      <div className={styles.controls}>
           <button
          className={styles.editButton}
          onClick={() => navigate(`/report/${project._id}`)}
        >
          View Report
        </button>
        <button
          className={styles.editButton}
          onClick={() => navigate(`/add-investor/${project._id}`)}
        >
          Add Investor
        </button>
        <button className={styles.deleteButton} onClick={deleteProjecthandler}>
          Delete
        </button>
      </div>
    )}

    <div>
      <div className={styles.investor}>Investors</div>
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th> # </th>
          <th> Date </th>
          <th> Name </th>
          <th> Amount </th>
          {/* <th> % </th> */}
          
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
            {/* setTotal(total + investor.amount) */}
      
            {/* <td
              style={
                coin.price_change_percentage_24h < 0
                  ? negativeStyle
                  : positiveStyle
              }
            >
              {coin.price_change_percentage_24h}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
    <div>Total investment on this project is Rs  {amountTotal}</div>

    </div>
  </div>


  {ownsProject && (
  <div className={styles.right}>
        <div className={styles.expensesWrapper}>
            {/* <ExpenseList expense= {expenses}/> */}
            <div className={styles.noExpenses}>Expenses</div>
        {
        expenses.length === 0 ? (
         
          <div className={styles.noExpenses}>No expenses added</div>
        ) : (
            expenses.map((expense) => (
            <Expense key={expense._id} expense={expense} />
          ))
        )
        }
          <div>Total expenses on this project is Rs  {expenseTotal}</div>
          <div className={styles.postExpense}>
          <input
              className={styles.input}
              placeholder="expense title"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="expense amount"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
            />
            <button
              className={styles.postExpenseButton}
              onClick={postExpenseHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
  )}
    </div>
  )
}

export default ProjectDetails;
