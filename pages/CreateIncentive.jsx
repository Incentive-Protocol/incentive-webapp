/* eslint-disable valid-typeof */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TransitionElement } from '../components/TransitionElement';
import LayoutBusiness from '../components/LayoutBusiness';
import Button from '../elements/Button';

import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const contractConfig = require('../config/config.json');
const contractAddress = contractConfig.contractAddress;
const contractABI = contractConfig.contractABI;

import { fromString } from 'uint8arrays/from-string';
import { NFTStorage, File, Blob } from 'nft.storage';

export default function CreateIncentive() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Button state
  const [feedback, setFeedback] = useState('');

  // Operation results
  const [result, setResult] = useState('');

  const [userChainId, setUserChainId] = useState('');

  const getSigner = async ethereum => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const { chainId } = await provider.getNetwork('any');
    setUserChainId(chainId.toString());
    // Goerli ora
    if (chainId != 5) {
      setResult('Need Testnet');
    }
    const signer = provider.getSigner();
    return signer;
  };

  const connectWallet = async () => {
    setLoading(true);
    const ethereum = await detectEthereumProvider();
    if (ethereum) {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await getSigner(ethereum);
          setWalletConnected(true);
          setResult('Successful');
          setTimeout(() => {
            setResult('');
          }, 3200);
        })
        .catch(err => {
          if (err.code === 4001) {
            setLoading(false);
            setResult('Request rejected');
            setTimeout(() => {
              setResult('');
            }, 3200);
          } else if (err.code === -32002) {
            setResult('MetaMask already running');
            setTimeout(() => {
              setResult('');
            }, 3200);
          } else {
            // fallback generico
            setLoading(false);
            setResult('Error');
            setTimeout(() => {
              setResult('');
            }, 3200);
          }
        });
    } else {
      // mancanza di MetaMask
      setLoading(false);
      setResult('Please install MetaMask');
      setTimeout(() => {
        setResult('');
      }, 3200);
    }
  };

  // Normal Incentive
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [imageData, setImageData] = useState();

  const removeImage = () => {
    const fileInput = document.querySelector('#file-input');
    fileInput.value = '';
    setImageData(null);
  };

  const handleImageChange = async event => {
    const image = await event.target.files[0];
    convertToPngBase64(image);
  };

  function convertToPngBase64(image) {
    // Check se l'immagine è un file type valido
    if (!image.type.match('image.*')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngImageData = canvas.toDataURL('image/png');
        setImageData(pngImageData);
      };
    };
    reader.readAsDataURL(image);
  }

  const NFT_STORAGE_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcyOTU1MzQ4MTQ4YjVCMTgyQzUwN0E1N0FjNjFFY2ZjYTRjYUVFYjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzM0NDE1Mjg1OCwibmFtZSI6IkNMRVNTSU8ifQ.W_PlVWKNvyGsKCvASjnJJeQ9bzVOnQaAM31MJdVYPME';
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  async function uploadImage() {
    // Verificare se dura meno del previsto
    setResult('Creating Incentive...');
    setTimeout(() => {
      setResult('');
    }, 3200);

    const imageDataSplit = imageData.split(';base64,')[1];
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    // impostare error handling

    if (base64Regex.test(imageDataSplit)) {
      const data = fromString(imageDataSplit, 'base64');
      console.log(imageDataSplit);
      setImageBlob(data);
    }

    async function setImageBlob(data) {
      const content = new Blob([data]);
      if (typeof content !== '[object Promise]') {
        storeImageBlob(content);
      }
    }

    async function storeImageBlob(content) {
      const cid = await client.storeBlob(content);
      if (cid.toString().length == 59) {
        let cidImage = 'ipfs://' + cid.toString();
        if (cidImage.length == 66) {
          createMetadata(cidImage);
        }
      }
    }
  }

  // impostare error handling
  async function createMetadata(cidImage) {
    const metadata = new File(
      [
        JSON.stringify({
          name: name,
          description: description,
          image: cidImage,
          compiler: 'Incentive'
        })
      ],
      'metadata.json'
    );

    const cid = await client.storeBlob(metadata);
    if (cid.toString().length == 59) {
      let cidMetadata = 'ipfs://' + cid.toString();
      if (cidMetadata.length == 66) {
        createIncentive(cidMetadata);
      }
    }
  }

  const [price, setPrice] = useState(0);

  const createIncentive = async cidMetadata => {
    const ethereum = await detectEthereumProvider();
    const signer = await getSigner(ethereum);
    const address = await signer.getAddress();

    // Normal Incentive
    const incentiveContract = new ethers.Contract(contractAddress, contractABI, signer);

    const parsedPrice = ethers.utils.parseEther(price);

    try {
      const tx = await incentiveContract.createIncentive(cidMetadata, parsedPrice._hex, address);
      setResult('Wait for confirmation...');
      setTimeout(() => {
        setResult('');
      }, 3200);

      await tx.wait();
      setResult('Successfully created!');
      setTimeout(() => {
        setResult('');
      }, 3200);
    } catch (error) {
      setResult('An error occured.');
      setTimeout(() => {
        setResult('');
      }, 3200);
    }
  };

  useEffect(() => {
    if (walletConnected) {
      setLoading(false);
      setFeedback('Connected');
      checkNetwork();
    } else if (loading) {
      setFeedback('Loading...');
    } else {
      setFeedback('Connect');
    }
  });

  const checkNetwork = async () => {
    const { ethereum } = window;
    if (ethereum != undefined) {
      ethereum.on('chainChanged', () => {
        setResult('Chain changed. Reloading');
        setTimeout(() => {
          window.location.reload();
        }, 3200);
      });
      ethereum.on('accountsChanged', () => {
        if (userChainId.length > 0) {
          setResult('Account changed. Reloading');
          setTimeout(() => {
            window.location.reload();
          }, 3200);
        }
      });
    }
  };

  return (
    <>
      <div className="Full Flex Center Column" style={{ padding: '3rem 3rem', gap: '1.5rem' }}>
        <div className="Full Flex Center Column" style={{ gap: '1rem' }}>
          <div className="Full Flex Center" style={{ justifyContent: 'space-between' }}>
            <div onClick={() => connectWallet()}>
              <Button obj={feedback} />
            </div>

            {walletConnected ? (
              <div onClick={() => uploadImage()}>
                <Button obj="Post" />
              </div>
            ) : (
              <div style={{ opacity: 0.5 }}>
                <Button obj="Post" />
              </div>
            )}
          </div>

          <div className="Flex Center" style={{ height: '2rem' }}>
            {result.length > 0 ? (
              <motion.div animate={{ y: 10, opacity: 0 }} transition={{ duration: 0.2, delay: 3 }}>
                <TransitionElement>
                  <p className="Mid"> {result} </p>
                </TransitionElement>
              </motion.div>
            ) : (
              // <p className="Mid"> feed </p>
              <></>
            )}
          </div>
        </div>

        <div className="Full Flex Center Column" style={{ gap: '3rem' }}>
          <div className="Flex" style={{ width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div className="Flex Column Small" style={{ width: '70%', alignItems: 'flex-start' }}>
              <p className="LabelTag"> Title </p>
              <div className="Flex InputWithLabel">
                <input
                  className="IncentiveInput"
                  placeholder="Name incentive"
                  onChange={e => {
                    setName(e.target.value);
                  }}></input>
              </div>
            </div>

            <div
              className="Flex Center"
              style={{
                width: '4rem',
                height: '4rem',
                background: 'var(--orange)',
                borderRadius: '50%',
                marginBottom: '0.25rem'
              }}>
              <img className="Icon" style={{ width: '2rem', height: '2rem' }} src="/Idea.svg"></img>
            </div>
          </div>

          <div className="Flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="Flex Column Small" style={{ width: '50%', alignItems: 'flex-start' }}>
              <p className="LabelTag"> Category </p>
              <div className="Flex InputWithLabel">
                <input className="IncentiveInput" placeholder="Select"></input>
              </div>
            </div>

            <div className="Flex Column Small" style={{ width: '40%', alignItems: 'flex-start' }}>
              <p className="LabelTag"> Price </p>
              <div className="Flex InputWithLabel">
                <input
                  className="IncentiveInput"
                  placeholder="0.00"
                  onChange={e => {
                    setPrice(e.target.value);
                  }}></input>
              </div>
            </div>
          </div>

          <div className="Flex Column Small" style={{ width: '100%', alignItems: 'flex-start' }}>
            <p className="LabelTag"> Description </p>
            <div className="Flex Center InputWithLabel" style={{ width: '100%', height: '10rem' }}>
              <textarea
                className="IncentiveInput"
                style={{ width: '100%', height: '8rem', resize: 'none' }}
                placeholder=""
                onChange={e => {
                  setDescription(e.target.value);
                }}></textarea>
            </div>
          </div>

          <label className="Full Flex Center ContentInput">
            <input id="file-input" type="file" onChange={handleImageChange}></input>
            <div className="Flex Center" style={{ alignItems: 'center', gap: '0.4rem' }}>
              <img src="/Upload.svg" style={{ height: '1.5rem' }}></img>
              <p className="Mid"> Upload content </p>
            </div>
          </label>

          {imageData && (
            <TransitionElement>
              <div className="Full Flex Center Column" style={{ gap: '1rem' }}>
                <img
                  id="IncentiveImage"
                  style={{ width: '100%', aspectRatio: 1 / 1, borderRadius: '2rem', objectFit: 'cover' }}
                  src={imageData}
                  alt="Uploaded image"
                />
                <button id="file-remove-button" onClick={removeImage}>
                  <div className="Flex Center" style={{ alignItems: 'center', gap: '0.4rem' }}>
                    <img src="/Remove.svg" style={{ height: '1.5rem' }}></img>
                    <p className="Mid"> Remove </p>
                  </div>
                </button>
              </div>
            </TransitionElement>
          )}
        </div>
      </div>
    </>
  );
}

CreateIncentive.getLayout = function getLayout(page) {
  return <LayoutBusiness>{page}</LayoutBusiness>;
};
