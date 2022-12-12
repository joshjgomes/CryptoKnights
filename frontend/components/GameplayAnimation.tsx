import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "../styles/Gameplay.module.css";

const GoldGem = (
  <div className={styles.slide}>
    <img src="./blue-gem.png" height="48" width="48" alt="gold-gem" />
  </div>
);

type Props = {
  weapon: NFT | undefined;
};

export default function GameplayAnimation({ weapon }: Props) {
  if (!weapon) {
    return <div style={{ marginLeft: 8 }}>I need a weapon!</div>;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
      </div>
    </div>
  );
}