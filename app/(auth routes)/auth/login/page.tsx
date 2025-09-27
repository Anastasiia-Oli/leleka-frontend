import Image from "next/image";
import styles from "./page.module.css";           
import LoginForm from "@/components/Auth/LoginForm";

export default function SignInPage() {
  return (
    <div className={styles.scene}>
      <div className={styles.regCard}>
        <div className={styles.regLeft}>
          <div className={styles.logoFixed}>
            <img src="/favicon.svg" alt="Лелека" className={styles.logoIcon} />
            <span className={styles.brandText}>Лелека</span>
          </div>

          <div className={styles.leftInner}>
            <h1 className={styles.regTitle}>Вхід</h1>
            <div className={styles.formWrap}>
              <LoginForm />
            </div>
          </div>
        </div>

        <div className={styles.regRight}>
          <Image src="/images/eggs.png" alt="Ілюстрація" fill className={styles.regImg} priority />
        </div>
      </div>
    </div>
  );
}
