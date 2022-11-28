import { FC } from "react";
import styles from "./index-hero.module.scss";
import Link from "next/link";

export const IndexHero: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <h2 className={styles.heading}>
            Take <span>charge</span> of your rendezvous and events
          </h2>
          <p className={styles.heading__sub}>
            Automatically mint with Tron integration for all members who attend
          </p>
          <div className={styles.button}>
            <Link href="./create">
              <button className={styles.button__btn}>Create Event</button>
            </Link>
            <Link href="./events">
              <button className={styles.button__btnNbg}>Buy Ticket</button>
            </Link>
          </div>
        </div>
        <div className={styles.innerRight}>
          <img className={styles.image} src="./74611-client-meeting.gif" alt="home image" />
        </div>
      </div>
    </div>
  );
};
