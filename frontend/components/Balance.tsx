import { useWeb3React } from "@web3-react/core";

const Balance = () => {
  const { account } = useWeb3React();

  return <div>Balance</div>;
};

export default Balance;
