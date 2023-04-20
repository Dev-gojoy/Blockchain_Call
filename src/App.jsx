import { useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./web3.config";

const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

function App() {
  const [account, setAccount] = useState("");
  const [myBalance, setMyBalance] = useState();
  const [totalSupply, setTotalSupply] = useState();

  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogout = () => {
    setAccount("");
  };

  const onClickBalance = async () => {
    try {
      if (!account || !contract) return;

      const balance = await contract.methods.balanceOf(account).call();

      setMyBalance(web3.utils.fromWei(balance));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      {account ? (
        <div>
          <div className="text-main font-semibold">
            {account.substring(0, 4)}...{account.substring(account.length - 4)}
            {/* 앞 4글자 뒤에 4글자 보여주게 하는 서브스트링 구문 */}
            <button className="ml-4 btn-style" onClick={onClickLogout}>
              Logout
            </button>
          </div>
          <div className="flex items-center mt-4">
            {myBalance && <div>{myBalance} tMatic</div>}
            <button className="btn-style ml-4" onClick={onClickBalance}>
              Balance Of
            </button>
          </div>
        </div>
      ) : (
        <button className="btn-style" onClick={onClickAccount}>
          <img
            className="w-12"
            src={`${process.env.PUBLIC_URL}/images/metamask.png`}
          />
        </button>
      )}
    </div>
  );
}

export default App;
