import { FC, Fragment } from "react";
import styles from "./my-events.module.scss";

export const MyEvents: FC = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.box__container}>
          <div className={`${styles.box} ${styles.box__1}`}>
            <h1>25+</h1>
            <h3>Total Events</h3>
          </div>
          <div className={`${styles.box} ${styles.box__2}`}>
            <h1>100k</h1>
            <h3>Total Earnings</h3>
          </div>
          <div className={`${styles.box} ${styles.box__3}`}>
            <h1>4.5k</h1>
            <h3>Available Earnings</h3>
          </div>
          <div className={`${styles.box} ${styles.box__4}`}>
            <h1>5.1k</h1>
            <h3>POAP Airdrop</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
