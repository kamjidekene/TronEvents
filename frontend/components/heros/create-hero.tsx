import { FC } from "react";
import styles from "./create-hero.module.scss";

export const CreateHero: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <h2 className={styles.heading}>
            Create your event with our <span>custom templates</span> that works
            for all
          </h2>
          <p className={styles.heading__sub}>
            Fill your event details with with ease
          </p>
        </div>
        <div className={styles.innerRight}>
          <img className={styles.image} src="./DRIP_14.png" alt="home image" />
        </div>
      </div>
    </div>
  );
};
