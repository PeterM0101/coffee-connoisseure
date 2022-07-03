import React, { FC, HTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.scss";
import classNames from "classnames";

interface CardProps extends HTMLAttributes<HTMLAnchorElement> {
  name: string;
  imageURL: string;
  href: string;
  className: string;
}

const Card: FC<CardProps> = ({ name, imageURL, href, className }) => {
  return (
    <Link href={href}>
      <a className={classNames(styles.cardLink, className)}>
        <div className={classNames(styles.cardContainer, "glass")}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <Image
            src={imageURL}
            alt="Coffee store"
            width={260}
            height={160}
            className={styles.cardImage}
          />
        </div>
      </a>
    </Link>
  );
};

export default Card;
