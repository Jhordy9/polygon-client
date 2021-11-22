import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';
import Network from '@maticnetwork/meta/network';
import WalletConnectProvider from '@maticnetwork/walletconnect-provider';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import config from './config';

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

function App() {
  const [networkId, setNetworkId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState('');
  const [inputValue, setInputValue] = useState(0);
  const [amount, setAmount] = useState('');
  const [burnHash, setBurnHash] = useState('');
  const [maticProvider, setMaticProvider] = useState<any>();
  const [ethereumProvider, setEthereumProvider] = useState<any>();
  const [bridgeOptions] = useState([
    {
      label: 'Proof of Stake',
      value: 'Proof of Stake',
    },
    {
      label: 'Plasma',
      value: 'Plasma',
    },
  ]);
  const [tokenTypes, setTokenTypes] = useState([
    {
      label: 'Ether',
      value: 'Ether',
    },
    {
      label: 'ERC20',
      value: 'ERC20',
    },
    {
      label: 'ERC721',
      value: 'ERC721',
    },
    {
      label: 'ERC1155',
      value: 'ERC1155',
    },
  ]);
  const [selectedBridgeOption, setSelectedBridgeOption] = useState({
    label: 'Proof of Stake',
  });
  const [selectedToken, setSelectedToken] = useState({
    label: 'Ether',
  });

  // const getWeb3 = () =>
  //   new Promise((resolve) => {
  //     window.addEventListener('load', () => {
  //       let currentWeb3;

  //       if (window.ethereum) {
  //         currentWeb3 = new Web3(window.ethereum);
  //         try {
  //           window.web3 = new Web3(window.ethereum);
  //           // Request account access if needed
  //           window.ethereum.enable();
  //           // Acccounts now exposed
  //           resolve(currentWeb3);
  //         } catch (error) {
  //           // User denied account access...
  //           alert('Please allow access for the app to work');
  //         }
  //       } else if (window.web3) {
  //         window.web3 = new Web3(window.web3.currentProvider);
  //         // Acccounts always exposed
  //         resolve(currentWeb3);
  //       } else {
  //         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //       }
  //     });
  //   });

  const loadWeb3 = useCallback(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum;
      window.ethereum;

      window.ethereum;
    }

    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }

    console.log(account);
  }, [account]);

  const loadBlockchainData = useCallback(async () => {
    setLoading(true);
    const maticProvider = new WalletConnectProvider({
      host: config.maticRpc,
      callbacks: {
        onConnect: console.log('Matic connected'),
        onDisconnect: console.log('Matic disconnected'),
      },
    });

    const ethereumProvider = new WalletConnectProvider({
      host: config.ethereumRpc,
      callbacks: {
        onConnect: console.log('Mainchain connected'),
        onDisconnect: console.log('Mainchain disconnected'),
      },
    });

    setMaticProvider(maticProvider);
    setEthereumProvider(ethereumProvider);

    const web3 = window.web3;

    console.log(web3);

    const accounts = await web3?.eth?.getAccounts();
    const networkId = await web3?.eth?.net?.getId();
    setAccount(accounts?.[0]);

    setNetworkId(networkId);

    if (networkId === config.maticChainId || networkId === config.ethereumChainId) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [loadBlockchainData, loadWeb3]);

  const network = config.network;
  const version = config.version;

  const posClientParent = useCallback(() => {
    const maticPosClient = new MaticPOSClient({
      network,
      version,
      maticProvider: maticProvider,
      parentProvider: window.web3,
      parentDefaultOptions: { from: account },
      maticDefaultOptions: { from: account },
    });

    return maticPosClient;
  }, [account, maticProvider, network, version]);

  const posClientChild = useCallback(() => {
    const maticPoSClient = new MaticPOSClient({
      network,
      version,
      maticProvider: window.web3,
      parentProvider: ethereumProvider,
      parentDefaultOptions: { from: account },
      maticDefaultOptions: { from: account },
    });

    return maticPoSClient;
  }, [account, network, ethereumProvider, version]);

  const getMaticPlasmaParent = async () => {
    const maticNetwork = new Network(network, version);

    const maticPlasmaParent = new MaticPlasmaClient({
      network,
      version,
      parentProvider: window.web3,
      maticProvider: maticProvider,
      parentDefaultOptions: { from: account },
      maticDefaultOptions: { from: account },
    });

    await maticPlasmaParent.initialize();

    return { maticPlasmaParent, network };
  };

  const getMaticPlasmaChild = async () => {
    const maticPlasmaChild = new MaticPlasmaClient({
      network,
      version,
      parentProvider: ethereumProvider,
      maticProvider: window.web3,
      parentDefaultOptions: { from: account },
      maticDefaultOptions: { from: account },
    });

    await maticPlasmaChild.initialize();

    return maticPlasmaChild;
  };

  const x1 = useMemo(() => {
    const decimals = 1000000000000000000;

    return (inputValue * decimals).toString();
  }, [inputValue]);

  // {
  //   label: 'Ether',
  //   value: 'Ether',
  // },
  // {
  //   label: 'ERC20',
  //   value: 'ERC20',
  // },
  // {
  //   label: 'ERC721',
  //   value: 'ERC721',
  // },
  // {
  //   label: 'ERC1155',
  //   value: 'ERC1155',
  // },

  const deposit = useCallback(async () => {
    const maticPoSClientParent = posClientParent();

    if (selectedToken.label === 'Ether') {
      console.log(account, x1);
      try {
        const tx = await maticPoSClientParent.depositEtherForUser(account, x1, {
          from: account,
          gasPrice: '10000000000',
        });

        console.log(x1);

        console.log(tx);
      } catch (err) {
        console.error(err);
      }
    }

    // if (selectedToken.label === 'ERC20') {
    //   await maticPoSClientParent.approveERC20ForDeposit(config.PoSContracts.tokens.DummyERC20, x1, {
    //     from: account,
    //   });
    //   await maticPoSClientParent.depositERC20ForUser(config.PoSContracts.tokens.DummyERC20, account, x1, {
    //     from: account,
    //   });
    // }

    // if (selectedToken.label === 'ERC721') {
    //   await maticPoSClientParent.approveERC721ForDeposit(config.PoSContracts.tokens.DummyERC721, String(inputValue), {
    //     from: account,
    //   });

    //   await maticPoSClientParent.depositERC721ForUser(config.PoSContracts.tokens.DummyERC721, account, x1, {
    //     from: account,
    //   });
    // }

    // if (selectedToken.label === 'ERC1155') {
    //   await maticPoSClientParent.approveERC1155ForDeposit(config.PoSContracts.tokens.DummyERC1155, {
    //     from: account,
    //   });

    //   await maticPoSClientParent.depositSingleERC1155ForUser(
    //     config.PoSContracts.tokens.DummyERC1155,
    //     account,
    //     String(inputValue),
    //     amount,
    //   );
    // }
  }, [account, posClientParent, selectedToken.label, x1]);

  const burn = useCallback(async () => {
    const maticPoSClientChild = posClientChild();

    if (selectedToken.label === 'Ether') {
      try {
        const tx = await maticPoSClientChild.burnERC20(config.PoSContracts.child.MaticWETH, x1);

        console.log(tx.transactionHash);
      } catch (err) {
        console.error(err);
      }
    }

    // if (selectedToken.label === 'ERC20') {
    //   await maticPoSClientChild
    //     .burnERC20(config.PoSContracts.tokens.DummyERC20, x1, {
    //       from: account,
    //     })
    //     .then((res) => {
    //       console.log(res.transactionHash);
    //       setBurnHash(res.transactionHash);
    //     });
    // }

    // if (selectedToken.label === 'ERC721') {
    //   await maticPoSClientChild
    //     .burnERC721(config.PoSContracts.tokens.DummyERC721, x1, {
    //       from: account,
    //     })
    //     .then((res) => {
    //       console.log(res.transactionHash);
    //       setBurnHash(res.transactionHash);
    //     });
    // }

    // if (selectedToken.label === 'ERC1155') {
    //   await maticPoSClientChild
    //     .burnSingleERC1155(config.PoSContracts.tokens.DummyERC1155, String(inputValue), amount, {
    //       from: account,
    //     })
    //     .then((res) => {
    //       console.log(res.transactionHash);
    //       setBurnHash(res.transactionHash);
    //     });
    // }
  }, [posClientChild, selectedToken.label, x1]);

  const exit = useCallback(async () => {
    const maticPoSClientParent = posClientParent();

    if (selectedToken.label === 'Ether') {
      try {
        const tx = await maticPoSClientParent.exitERC20(String(inputValue), {
          from: account,
        });

        console.log(tx.transactionHash);
      } catch (err) {
        console.error(err);
      }
    }

    // if (selectedToken.label === 'ERC20') {
    //   await maticPoSClientParent
    //     .exitERC20(String(inputValue), { from: account })
    //     .then((res) => console.log('exit p/o', res));
    // }

    // if (selectedToken.label === 'ERC721') {
    //   await maticPoSClientParent
    //     .exitERC721(String(inputValue), { from: account })
    //     .then((res) => console.log('exit p/o', res));
    // }

    // if (selectedToken.label === 'ERC1155') {
    //   await maticPoSClientParent
    //     .exitSingleERC1155(String(inputValue), { from: account })
    //     .then((res) => console.log('exit p/o', res));
    // }
  }, [account, inputValue, selectedToken.label, posClientParent]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(Number(e.target.value));

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value);

  return (
    <div className="App" style={{ backgroundColor: '#171717', height: '100vh', width: '100%' }}>
      <h1 style={{ margin: 0, color: 'white' }}>Ethereum - Matic Bridge</h1>
      <h1>{account}</h1>
      <div>
        <select onChange={(e) => setSelectedBridgeOption({ label: e.currentTarget.value })}>
          {bridgeOptions.map((option, index) => (
            <option key={index} value={option.value} selected={selectedBridgeOption.label === option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedToken({ label: e.currentTarget.value })}>
          {tokenTypes.map((token, index) => (
            <option key={index} value={token.value} selected={selectedToken.label === token.label}>
              {token.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={deposit}>{`Deposit ${selectedToken.label}`}</button>
      <button
        onClick={burn}
        disabled={networkId !== 0 && networkId === config.ethereumChainId}
      >{`Burn ${selectedToken.label}`}</button>
      <input type="text" placeholder="value" name="amount" value={amount} onChange={onAmountChange} required></input>
    </div>
  );
}

// disabled={selectedToken.label === 'Ether' && selectedBridgeOption.label === 'Proof of Stake' ? false : true}

export default App;
