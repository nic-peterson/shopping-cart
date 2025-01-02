import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* The overlay adds a semi-transparent layer over the background image */}
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Buck Clone</h1>
        <p className={styles.subtitle}>
          Modern essentials, inspired by classic silhouettes.
        </p>
        <Link to="/shop">
          <button className={styles.ctaButton}>Shop Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
