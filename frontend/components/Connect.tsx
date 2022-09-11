import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { injectedConnector } from "../utils/etherjsConnection/connectors";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnBoarding";
import { NFT_Reveal_Address, NFT_Reveal_ABI } from "../ABIs/contracts";
import { ethers } from "ethers";
import { getSigner } from "../utils/etherjsConnection/signer";
import { useAppDispatch } from "../redux/store";
import { loadContract } from "../redux/slices/loadContracts/loadContracts";

const Account = () => {
  const dispatch = useAppDispatch();
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // initialize Contracts
  const initializeContracts = async () => {
    try {
      const signer = await getSigner();
      let nftRevealContract = new ethers.Contract(
        NFT_Reveal_Address,
        NFT_Reveal_ABI,
        signer
      );

      return {
        nftRevealContract,
      };
    } catch (error) {
      console.log("Error in initializing contracts", error);
    }
  };

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (account !== null && account !== undefined) {
      (async function () {
        const contracts = await initializeContracts();
        if (contracts) {
          dispatch(
            loadContract({
              nftRevealContract: contracts.nftRevealContract,
            })
          );
        }
      })();
    }
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
        alert("User rejected request");
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  };

  if (typeof account !== "string") {
    return (
      <>
        {isWeb3Available ? (
          <Button
            color={"gradient"}
            disabled={connecting}
            onClick={activateWallet}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </Button>
        ) : (
          <Button color={"gradient"} onClick={startOnboarding}>
            Install Metamask
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <Button color={"gradient"}>
        {account.slice(0, 5)}...{account.slice(38)}
      </Button>
    </>
  );
};

export default Account;
