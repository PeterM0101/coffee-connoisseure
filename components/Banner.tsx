import styles from "./banner.module.scss";
import {FC} from "react";

interface BannerProps {
    buttonText: string,
    handleOnClick: () => void
}

const Banner: FC<BannerProps> = ({buttonText, handleOnClick}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Coffee</span>
                <span className={styles.title2}>Connoisseur</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee stores!</p>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={handleOnClick}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Banner;
