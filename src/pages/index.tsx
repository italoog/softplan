import styles from "@/styles/Home.module.css";
import LoginCard from "@/pages/components/LoginCard";

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.decoration} />
      <LoginCard />
    </main>
  );
};

export default Home;
