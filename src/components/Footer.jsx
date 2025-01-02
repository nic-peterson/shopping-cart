import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Buck Clone.{" "}
        <a href="https://www.buckmason.com/" target="_blank" rel="noreferrer">
          Original Inspiration
        </a>
      </p>
    </footer>
  );
}

export default Footer;
