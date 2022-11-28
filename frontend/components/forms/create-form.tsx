import { FC, Fragment, useMemo, useState } from "react";
import { BlocAddress, blocContractABI } from "@lib";
import { FileUploader } from "@components";
// import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import styles from "./create-form.module.scss";
import type { TransactionReceipt } from "@ethersproject/providers";

export const CreateForm: FC<CreateFormProps> = (props: CreateFormProps) => {
  const { onError, onSuccess } = props;

  const [errorReason, setErrorReason] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreationFormData>({ mode: "onSubmit" });

  const creation = useContractWrite({
    addressOrName: BlocAddress,
    contractInterface: blocContractABI,
    functionName: "createEvent",
    onSettled: async (_, error) => {
      if (error) {
        const reason = (error as unknown as { reason: string }).reason;
        const reasonString = reason.split(":")[1];
        setErrorReason(reasonString);
        await onError(error);
      }
    },
  });

  const waitCreation = useWaitForTransaction({
    wait: creation.data?.wait,
    hash: creation.data?.hash,
    onSuccess: async (data: TransactionReceipt) => {
      await onSuccess(data);
    },
  });

  async function postRequest(formData: any) {
    const res = await fetch("https://blockevents.herokuapp.com/events", {
      method: "POST",
      body: formData,
    });
    const resData = await res.json();
    console.log(resData);
  }

  const registerHandler = async (data: CreationFormData) => {
    if (isValid) {
      console.log(data);
      const {
        eventName,
        organizers,
        eventType,
        category,
        eventDate,
        startTime,
        endTime,
        participantsNumber,
        description,
        ticketPrice,
      } = data;

      console.log(files?.[0]);

      const formData: any = new FormData();
      formData.append("eventName", eventName);
      formData.append("eventType", eventType);
      formData.append("category", category);
      formData.append("eventDate", eventDate);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("description", description);
      formData.append("organizers", organizers);
      formData.append("participantsNumber", participantsNumber);
      formData.append("ticketPrice", ticketPrice);
      formData.append("image", files?.[0]);
      console.log(formData);
      try {
        await creation.writeAsync({
          args: [participantsNumber, ticketPrice],
        });
        await postRequest(formData);
      } catch (error) {
        return;
      }
    }
  };

  const onFileChangeHandler = async (files: File[] | undefined) => {
    setFiles(files);
  };

  const isLoading = useMemo<boolean>(() => {
    return Boolean(creation.isLoading || waitCreation.isLoading);
  }, [creation.isLoading, waitCreation.isLoading]);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.heading}>Event information</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(registerHandler)}>
          {/* /* === eventName === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="eventName"
              type="text"
              {...register("eventName", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label htmlFor="eventName" className={styles.inputContainer__label}>
              Event Name
            </label>
          </div>
          {/* /* === participantsNumber === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="participantsNumber"
              type="number"
              {...register("participantsNumber", { required: true, min: 1 })}
            />
            <label
              htmlFor="participantsNumber"
              className={styles.inputContainer__label}
            >
              Maximum number of participants
            </label>
          </div>
          {/* /* === organizers === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="organizers"
              type="text"
              {...register("organizers", {
                required: true,
                minLength: 1,
              })}
            />
            <label
              htmlFor="organizers"
              className={styles.inputContainer__label}
            >
              Organizers
            </label>
          </div>
          {/* /* === eventType === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="eventType"
              type="text"
              {...register("eventType", {
                required: true,
                minLength: 1,
              })}
            />
            <label htmlFor="eventType" className={styles.inputContainer__label}>
              Event Type (e.g Virtual)
            </label>
          </div>
          {/* /* === category === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="category"
              type="text"
              {...register("category", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label htmlFor="category" className={styles.inputContainer__label}>
              Category
            </label>
          </div>

          {/* /* === eventDate === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="eventDate"
              type="date"
              // value={format(new Date(), "yyyy-MM-dd")}
              {...register("eventDate", {
                required: true,
                minLength: 1,
              })}
            />
            <label htmlFor="eventDate" className={styles.inputContainer__label}>
              Choose Event Date
            </label>
          </div>

          {/* /* === StartTime === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="startTime"
              type="time"
              // value={format(new Date(), "HH:mm")}
              {...register("startTime", {
                required: true,
              })}
            />
            <label htmlFor="startTime" className={styles.inputContainer__label}>
              Start Time
            </label>
          </div>

          {/* /* === endTime === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="endTime"
              type="time"
              // value={format(new Date(), "HH:mm")}
              {...register("endTime", {
                required: true,
              })}
            />
            <label htmlFor="endTime" className={styles.inputContainer__label}>
              End Time
            </label>
          </div>

          {/* /* === description === */}
          <div className={styles.inputContainer}>
            <textarea
              className={styles.inputContainer__input}
              id="description"
              {...register("description", {
                required: true,
                minLength: 1,
                maxLength: 32,
              })}
            />
            <label
              htmlFor="description"
              className={styles.inputContainer__label}
            >
              Enter Description, explain in details
            </label>
          </div>

          {/* /* === ticketPrice === */}
          <div className={styles.inputContainer}>
            <input
              className={styles.inputContainer__input}
              id="ticketPrice"
              type="number"
              {...register("ticketPrice", { required: true, min: 0 })}
            />
            <label htmlFor="eventName" className={styles.inputContainer__label}>
              Ticket Price
            </label>
          </div>

          {/* /* === image === */}
          <div className={styles.fullContainer}>
            <FileUploader
              onChange={(files: File[] | undefined) =>
                onFileChangeHandler(files)
              }
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnContainer__btn} type="submit">
              {isLoading ? (
                <MoonLoader size={30} />
              ) : errorReason ? (
                errorReason
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

interface CreateFormProps {
  onError: (error: Error) => Promise<void>;
  onSuccess: (data: TransactionReceipt) => Promise<void>;
}

export interface CreationFormData {
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
  image: File[];
}
