import Image from "next/image";
import styles from "./page.module.css";           
import RegistrationForm from "@/components/Auth/RegistrationForm";

export default function SignUpPage() {
  return (
    <div className={styles.scene}>
      <div className={styles.regCard}>
        <div className={styles.regLeft}>
          <div className={styles.logoFixed}>
            <img src="/favicon.svg" alt="Лелека" className={styles.logoIcon} />
            <span className={styles.brandText}>Лелека</span>
          </div>
          <div className={styles.leftInner}>
            <h1 className={styles.regTitle}>Реєстрація</h1>
            <div className={styles.formWrap}>
              <RegistrationForm />
            </div>
          </div>
        </div>
        <div className={styles.regRight}>
          <Image src="/images/leleka.png" alt="Ілюстрація" fill className={styles.regImg} priority />
        </div>
      </div>
    </div>
  );
}
