import {
    ThirdwebNftMedia,
    useAddress,
    useOwnedNFTs,
    Web3Button,
  } from "@thirdweb-dev/react";
  import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
  import React from "react";
  import LoadingSection from "./LoadingSection";
  import styles from "../styles/Home.module.css";
  import { MINING_ADDRESS } from "../const/contractAddresses";
  
  type Props = {
    weaponContract: EditionDrop;
    miningContract: SmartContract<any>;
  };
  
  /**
   * This component shows the:
   * - Weapons the connected wallet has
   * - A stake button underneath each of them to equip it
   */
  export default function OwnedGear({ weaponContract, miningContract }: Props) {
    const address = useAddress();
    const { data: ownedWeapon, isLoading } = useOwnedNFTs(
      weaponContract,
      address
    );
  
    if (isLoading) {
      return <LoadingSection />;
    }
  
    async function equip(id: string) {
      if (!address) return;
  
      // The contract requires approval to be able to transfer the waepon
      const hasApproval = await weaponContract.isApproved(
        address,
        MINING_ADDRESS
      );
  
      if (!hasApproval) {
        await weaponContract.setApprovalForAll(MINING_ADDRESS, true);
      }
  
      await miningContract.call("stake", id);
  
      // Refresh the page
      window.location.reload();
    }
  
    return (
      <>
        <div className={styles.nftBoxGrid}>
          {ownedWeapon?.map((p) => (
            <div className={styles.nftBox} key={p.metadata.id.toString()}>
              <ThirdwebNftMedia
                metadata={p.metadata}
                className={`${styles.nftMedia} ${styles.spacerTop}`}
                height={"64"}
              />
              <h3>{p.metadata.name}</h3>
  
              <div className={styles.smallMargin}>
                <Web3Button
                  colorMode="dark"
                  contractAddress={MINING_ADDRESS}
                  action={() => equip(p.metadata.id)}
                >
                  Equip
                </Web3Button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }