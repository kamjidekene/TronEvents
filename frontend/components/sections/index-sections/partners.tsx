import { FC, Fragment } from "react";
import styles from "./partners.module.scss";

export const PartnerSection: FC = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <h2 className={styles.heading}>Partners</h2>
        <div className={styles.partners}>
          <div className={styles.partners__box}>
            <div className={styles.partners__image}>
              <img
                className={styles.partners__img}
                src="./polygon-matic.svg"
                alt="polygon logo"
              />
            </div>
            <div className={styles.partners__name}>
              <h2>polygon</h2>
            </div>
          </div>
          <div className={styles.partners__box}> </div>
          <div className={styles.partners__box}> </div>
        </div>
      </div>
    </Fragment>
  );
};
