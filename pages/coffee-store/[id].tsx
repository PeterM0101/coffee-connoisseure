import React, { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.scss";
import Image from "next/image";
import { fetchCoffeeStores, fetchPlacePhoto } from "../../lib/coffee-stores";
import { CoffeeStoresContext } from "../../context";
import { isEmpty } from "../../utils";
import useSWR from "swr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface CoffeeStoreProps {
  coffeeStore: any;
}

const CoffeeStore: FC<CoffeeStoreProps> = ({ coffeeStore }) => {
  const [store, setStore] = useState(coffeeStore);
  const router = useRouter();
  const { id } = router.query;
  const { coffeeStores } = useContext(CoffeeStoresContext);
  const [voting, setVoting] = useState<number>(
    (coffeeStore?.voting as number) ? (coffeeStore?.voting as number) : 1
  );
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setStore(data[0]);
      setVoting(data[0]?.voting);
    }
  }, [data]);

  if (error) toast.error("It's a problem to retrieve data");

  const handleCreateCoffeeStore = async (coffeeStore: any) => {
    try {
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        body: JSON.stringify({
          id: `${id}`,
          name: coffeeStore.name,
          address: coffeeStore.address || "",
          neighborhood: coffeeStore.neighborhood || "",
          imgUrl: coffeeStore.imgUrl,
          voting: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dbCoffeeStore = await response.json();
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  useEffect(() => {
    (async () => {
      if (isEmpty(coffeeStore) && coffeeStores.length > 0) {
        const storeFromContext = coffeeStores.find(
          (item: any) => item.id === id
        );

        if (storeFromContext) {
          handleCreateCoffeeStore(storeFromContext);
          setStore(storeFromContext);
        }
      } else {
        handleCreateCoffeeStore(coffeeStore);
      }
    })();
  }, [id, coffeeStore]);

  const handleUpvoteButton = async () => {
    try {
      const response = await fetch("/api/favouriteCoffeeStoreById", {
        method: "PUT",
        body: JSON.stringify({
          id: `${id}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dbCoffeeStore = await response.json();

      if (dbCoffeeStore && dbCoffeeStore.length > 0)
        setVoting((prevState) => prevState + 1);
    } catch (e) {
      console.error(`Error upvoting a Coffee Store ${(e as Error).message}`);
    }
  };

  if (router.isFallback) return <p>loading ...</p>;

  return (
    <div className={styles.layout}>
      <ToastContainer />
      <Head>
        <title>{store?.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{store?.name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={
              store?.imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            alt={store?.name}
          />
        </div>

        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image src="/icons/places.svg" width={24} height={24} />
            <p className={styles.text}>{store?.address}</p>
          </div>
          {store && store.neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/icons/nearMe.svg"
                width={24}
                height={24}
                alt={"Hello"}
              />
              <p className={styles.text}>{store?.neighborhood}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image src="/icons/star.svg" width={24} height={24} />
            <p className={styles.text}>{voting}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const coffeeStores = await fetchCoffeeStores();
  const store = coffeeStores.find((item: any) => item.id === id);

  return {
    props: { coffeeStore: store ? store : {} },
  };
};

export const getStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((item: any) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export default CoffeeStore;
