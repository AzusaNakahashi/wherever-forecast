import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/pageState/error.module.scss";
import { setCurrentLocationCoordinates } from "../../features/map";

const Error = () => {
  const map = useSelector((state) => state.map);
  const weather = useSelector((state) => state.weather);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    //setTimeout(() => {
    //  dispatch(setCurrentLocationCoordinates());
    //}, 5000);
  }, []);
  return (
    <div className={styles["error-container"]}>
      <h1>Oops! Something went wrong.</h1>
      <p>we are automatically going to reload the home page...</p>
    </div>
  );
};

export default Error;
