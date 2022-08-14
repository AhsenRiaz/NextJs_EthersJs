import React, { Fragment, ReactNode } from "react";
import Header from "./Header";
import styles from "../styles/Layout.module.css";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/getLibrary";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header />
        <div className={styles.container}>
          <div className={styles.main}>{children}</div>
        </div>
      </Web3ReactProvider>
    </Fragment>
  );
};

export default Layout;
