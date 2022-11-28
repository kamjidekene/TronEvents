import { FC } from "react";
import { ConnectButton, NavItem } from "@components";
import Link from "next/link";
import styles from "./header.module.scss";

export const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {} = props;
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Link href="./">
          <h2 className={styles.head}>TronEvents</h2>
        </Link>
        <NavItem />
        <ConnectButton />
      </div>
    </div>
  );
};

interface HeaderProps {}
