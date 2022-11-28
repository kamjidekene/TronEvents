import { FC, Fragment, useState } from "react";
import { ChevronDown, Image2, Ticket, TicketStar } from "react-iconly";
import styles from "./dashboard-nav-item.module.scss";

export let DashboardNav: string;

export const DashboardNavItem: FC<DashboardNavItemProps> = (
  props: DashboardNavItemProps
) => {
  const [sec, setSec] = useState("MyEvents");
  props.func(sec);

  return (
    <Fragment>
      <nav className={styles.navItem}>
        <ul>
          <li onClick={() => setSec("MyEvents")}>
            <TicketStar
              set="curved"
              primaryColor="currentColor"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            My Events
          </li>
          <ul>
            <li>
              <Ticket
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              Withdraw Earnings
            </li>
          </ul>
          <li onClick={() => setSec("AuctionTicket")}>
            <Ticket
              set="curved"
              primaryColor="currentColor"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Auction Ticket
          </li>
          <li onClick={() => setSec("poap")}>
            <Image2
              set="curved"
              primaryColor="currentColor"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            POAP
            <ChevronDown
              set="bold"
              primaryColor="currentColor"
              size={15}
              style={{ verticalAlign: "middle", marginLeft: "100px" }}
            />
          </li>

          <li className={styles.sub} onClick={() => setSec("poap")}>
            <p>
              <Image2
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              Airdrop POAP
            </p>
          </li>
          <li className={styles.sub} onClick={() => setSec("poap")}>
            <p>
              <Image2
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              My POAP
            </p>
          </li>
          <li className={styles.sub} onClick={() => setSec("poap")}>
            <p>
              <Image2
                set="curved"
                primaryColor="currentColor"
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              Mint POAP
            </p>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export interface DashboardNavItemProps {
  func: Function;
}
