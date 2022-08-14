import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injectedConnector } from "../utils/connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnBoarding";

const Account = () => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (error) {
    return null;
  }

  const activateWallet = async () => {
    setConnecting(true);

    activate(injectedConnector, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  };

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <button disabled={connecting} onClick={activateWallet}>
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    );
  }

  return (
    <h4>
      {account.slice(0, 5)}...{account.slice(38)}{" "}
    </h4>
  );
};

export default Account;
