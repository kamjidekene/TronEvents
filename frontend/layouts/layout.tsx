import { FC, Fragment, ReactNode } from "react";
import { Footer, Header } from "@components";

export const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

interface LayoutProps {
  children: ReactNode;
}
