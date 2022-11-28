import { Fragment } from "react";
import { CreateForm, CreateHero } from "@components";
import { NextPage } from "next";
import { default as NextHead } from "next/head";
import type { TransactionReceipt } from "@ethersproject/providers";

const Create: NextPage = () => {
  const onCreateError = async (error: Error) => {
    console.log("CreateError:", error);
  };
  const onCreateSuccess = async (data: TransactionReceipt) => {
    console.log("CreateError:", data);
  };
  return (
    <Fragment>
      <NextHead>
        <title>Create Event | TronEvents - A Tron powered events app</title>
      </NextHead>
      <CreateHero />
      <CreateForm
        onError={(error: Error) => onCreateError(error)}
        onSuccess={(data: TransactionReceipt) => onCreateSuccess(data)}
      />
    </Fragment>
  );
};

export default Create;
