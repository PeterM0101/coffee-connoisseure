import React, { FC } from "react";
import styles from "./renderCoffeeShops.module.scss";
import Card from "./Card";

interface RenderCoffeeShopsProps {
  stores: any[] | null;
  title: string;
}

const RenderCoffeeShops: FC<RenderCoffeeShopsProps> = ({ stores, title }) => {
  if (!stores || stores.length === 0) return null;
  return (
    <>
      <h2 className={styles.heading2}>{title}</h2>
      <div className={styles.cardLayout}>
        {stores &&
          stores.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              href={`/coffee-store/${item.id}`}
              imageURL={
                item.imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              className={styles.card}
            />
          ))}
      </div>
    </>
  );
};

export default RenderCoffeeShops;
