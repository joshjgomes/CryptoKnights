import React from "react";
import {
  useAddress,
  useClaimNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { CHARACTERS_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Home.module.css";

export default function MintContainer() {
  const address = useAddress();

  return (
    <div className={styles.collectionContainer}>
      <h1>CryptoKnights</h1>

      <p>Get your free NFT Knight to start playing!</p>

      <div className={`${styles.nftBox} ${styles.spacerBottom}`}>
        <img src="./mine.gif" style={{ height: 200 }} />
      </div>

      <div className={styles.smallMargin}>
        <Web3Button
          colorMode="dark"
          contractAddress={CHARACTERS_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
          accentColor="#f5f"
        >
          Claim NFT
        </Web3Button>
      </div>
    </div>
  );
}