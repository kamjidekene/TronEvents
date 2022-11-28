import { FC, Fragment, useMemo, useState } from "react";
import { BlocAddress, blocContractABI } from "@lib";
import { MoonLoader } from "react-spinners";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import styles from "./event-item.module.scss";
import type { TransactionReceipt } from "@ethersproject/providers";

export const EventItem: FC<eventArr> = ({
  //   id,
  eventName,
  organizers,
  eventFile,
  eventDate,
  ticketPrice,
  description,
  startTime,
  endTime,
}: eventArr) => {
  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);

  const buyTicket = useContractWrite({
    addressOrName: BlocAddress,
    contractInterface: blocContractABI,
    functionName: "buyTicket",
    onSettled: async (_, error) => {
      if (error) {
        const reason = (error as unknown as { reason: string }).reason;
        const reasonString = reason.split(":")[1];
        setErrorReason(reasonString);
      }
    },
  });

  const waitBuyTicket = useWaitForTransaction({
    wait: buyTicket.data?.wait,
    hash: buyTicket.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      console.log(data);
    },
  });

  const buyTicketHandler = async () => {
    try {
      await buyTicket.writeAsync({
        args: [0],
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const isLoading = useMemo<boolean>(() => {
    return Boolean(buyTicket.isLoading || waitBuyTicket.isLoading);
  }, [buyTicket.isLoading, waitBuyTicket.isLoading]);

  const image = eventFile.replace("ipfs://", "https://ipfs.io/ipfs/");

  function fee() {
    if (ticketPrice === 0) {
      return "Free";
    } else {
      return ticketPrice + " Matic";
    }
  }

  return (
    <Fragment>
      <li>
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img className={styles.card__img} src={image} alt="event image" />
          </div>
          <div className={styles.card__content}>
            <h3>{eventName}</h3>
            <h5>
              Organized by: <span>{organizers}</span>
            </h5>
            <p>Description: {description}</p>
            <p>Date: {eventDate}</p>
            <p>Start Time: {startTime}</p>
            <p>End Time: {endTime}</p>
            <p>Fee: {fee()}</p>
            <div className={styles.card__button}>
              <button
                onClick={() => {
                  buyTicketHandler();
                }}
              >
                {isLoading ? (
                  <MoonLoader size={30} />
                ) : errorReason ? (
                  errorReason
                ) : (
                  "Purchase Ticket"
                )}
              </button>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

interface eventArr {
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
