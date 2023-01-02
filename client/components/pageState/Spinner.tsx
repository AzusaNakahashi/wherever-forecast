import styles from "../../styles/pageState/spinner.module.scss";
const Spinner = () => {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner-icon"]}></div>
      <p className={styles["text"]}>LOADING...</p>
    </div>
  );
};

export default Spinner;
