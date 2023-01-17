import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/pageState/error.module.scss";
import { useAppSelector } from "../../features/hooks";

const Error = () => {
  const weather = useAppSelector((state) => state.weather);
  const map = useAppSelector((state) => state.map);
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
    </div>
  );
};

export default Error;
