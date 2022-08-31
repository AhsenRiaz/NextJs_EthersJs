import { useEffect, useState, useRef } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import type MetaMaskOnboarding from "@metamask/onboarding";

export default function useMetaMaskOnboarding() {
  const onboarding = useRef<MetaMaskOnboarding>();

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>();
  const [isWeb3Available, setIsWeb3Available] = useState<boolean>();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (typeof window.ethereum !== "undefined") {
      setIsWeb3Available(true);
    }

    async function checkForMetaMask() {
      const provider = await detectEthereumProvider({
        timeout: 1000,
        mustBeMetaMask: true,
      });

      if (provider) {
        setIsMetaMaskInstalled(true);
      } else {
        setIsMetaMaskInstalled(false);
      }
    }

    checkForMetaMask();
  }, []);

  async function startOnboarding() {
    const MetaMaskOnboarding = await import("@metamask/onboarding").then(
      (m) => m.default
    );
    onboarding.current = new MetaMaskOnboarding();
    onboarding.current.startOnboarding();
  }

  function stopOnboarding() {
    if (onboarding?.current) {
      onboarding.current.stopOnboarding();
    }
  }

  return {
    startOnboarding,
    stopOnboarding,
    isMetaMaskInstalled,
    isWeb3Available,
  };
}
