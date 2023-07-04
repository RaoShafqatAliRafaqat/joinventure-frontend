import styles from "./Expense.module.css";

function Expense({ expense }) {
  const date = new Date(expense.createdAt).toDateString();

  return (
    <div className={styles.expense}>
      <div className={styles.header}>
        <div className={styles.author}> {expense.expenseName}</div>
        <div className={styles.date}>{date}</div>
        <div className={styles.AmountText}>Rs {expense.amount}</div>
      </div>
    </div>
  );
}

export default Expense;