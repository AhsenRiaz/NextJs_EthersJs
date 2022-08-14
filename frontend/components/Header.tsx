import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import styles from "../styles/Header.module.css";
import { injectedConnector } from "../utils/connectors";
import Connect from "./Connect";

const Header = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized: any) => {
        if (isAuthorized) {
          activate(injectedConnector);
        }
      })
      .catch(() => {});
  }, [activate]);

  return (
    <div className={styles.container}>
      <div>NextJs-EtherJs</div>
      <div>
        <Connect />
      </div>
    </div>
  );
};

export default Header;
