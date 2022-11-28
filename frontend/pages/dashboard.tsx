import { Fragment, useState } from "react";
import { AuctionTicket, DashboardNavItem, MyEvents } from "@components";
import { NextPage } from "next";
import { default as NextHead } from "next/head";
import styles from "../styles/dashboard.module.scss";

const Dashboard: NextPage = () => {
  const [sec, setSec] = useState("");
  const whatSection = (section: string) => {
    setSec(section);
  };

  return (
    <Fragment>
      <NextHead>
        <title>Dashboard | TronEvents - A decentralized events application powered by Tron</title>
      </NextHead>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <DashboardNavItem func={whatSection} />
          </div>

          <div className={styles.dashSection}>
            {sec === "MyEvents" ? <MyEvents /> : null}
            {sec === "AuctionTicket" ? <AuctionTicket /> : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Dashboard;
