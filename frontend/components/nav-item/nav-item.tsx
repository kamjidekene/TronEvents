import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./nav-item.module.scss";

export const NavItem: FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul>
        <Link href="./">
          <li
            className={
              router.asPath === "/" ? styles.nav__homeActive : styles.nav__home
            }
          >
            Home
          </li>
        </Link>
        <Link href="./dashboard">
          <li
            className={
              router.asPath === "/dashboard"
                ? styles.nav__liActive
                : styles.nav__li
            }
          >
            Dashboard
          </li>
        </Link>
        <Link href="/create">
          <li
            className={
              router.asPath === "/create"
                ? styles.nav__liActive
                : styles.nav__li
            }
          >
            Create Event
          </li>
        </Link>
        <Link href="/events">
          <li
            className={
              router.asPath === "/events"
                ? styles.nav__liActive
                : styles.nav__li
            }
          >
            All Events
          </li>
        </Link>
      </ul>
    </nav>
  );
};
