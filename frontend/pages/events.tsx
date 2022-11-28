import { Fragment } from "react";
import { NextPage } from "next";
import { default as NextHead } from "next/head";
import { EventList } from "@components";

const Events: NextPage<eventDataProps> = ({ events }) => {
  return (
    <Fragment>
      <NextHead>
        <title>All Events | TronEvents - A decentralized events application powered by Tron</title>
      </NextHead>
      <EventList events={events} />
    </Fragment>
  );
};

// export async function getServerSideProps() {
//   // fetch data from api
//   const res = await fetch("https://blockevents.herokuapp.com/events");

//   const eventData = await res.json();

//   return {
//     props: {
//       events: eventData.data,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from api
  const res = await fetch("https://blockevents.herokuapp.com/events");

  const eventData = await res.json();

  return {
    props: {
      events: eventData.data,
    },
    revalidate: 60,
  };
}

export default Events;

export interface eventArr {
  id: string;
  eventName: string;
  participantsNumber: number;
  eventType: string;
  organizers: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  description: string;
  ticketPrice: number;
  eventFile: string;
}

export interface eventDataProps {
  events: eventArr[];
}
