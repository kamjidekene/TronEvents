import { FC, Fragment } from "react";
import { Ticket } from "react-iconly";
import styles from "./how-it-works.module.scss";

export const HowItWorksSection: FC = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <h2 className={styles.heading}>How it works</h2>
        <div className={styles.content}>
          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Create an event</h3>
            </div>
            <p className={styles.content__para}>
              Organizers of event can customize event details and set prices
              also with also proper provision to track the statistics of each
              event
            </p>
          </div>

          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Users can re-auction tickets</h3>
            </div>
            <p className={styles.content__para}>
              Users can re-sell their tickets to others, incase unexpected
              circumstances come up and they are unable to attend the event
            </p>
          </div>

          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Manage events</h3>
            </div>
            <p className={styles.content__para}>
              Organizers can track their event tractions, and manage analytics
              seamlessly
            </p>
          </div>

          <div className={styles.content__row}>
            <div className={styles.content__header}>
              <Ticket set="curved" primaryColor="blueviolet" />
              <h3>Airdrop NFT to attendee</h3>
            </div>
            <p className={styles.content__para}>
              Organizers of event can send Tron to their attendees with ease,
              these nft can be token gated. The address of the attendees can also be
              whitelisted for any use case the Organizers of the events can think of
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
