
 

import styles from "./ExpenseList.module.css";
import Expense from "../Expense/Expense";

function ExpenseList({ expenses }) {
  return (
    <div className={styles.expenseListWrapper}>
      <div className={styles.expenseList}>
        {/* {
        expenses.length === 0 ? (
          <div className={styles.noExpenses}>No expenses added</div>
        ) : (
            expenses.map((expense) => (
            <Expense key={expense._id} expense={expense} />
          ))
        )
        } */}
      </div>
    </div>
  );
}

export default ExpenseList;