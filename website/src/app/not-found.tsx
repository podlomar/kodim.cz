import MainLayout from "./components/MainLayout";
import styles from "./styles.module.scss";

const NotFoundPage = (): JSX.Element => {
  return (
    <MainLayout>
      <div className="container">
        <div className={styles.notFound}>
          <div className={styles.errorCode}>404</div>
          <p>Tato stránka neexistuje nebo k ní nemáte přístup</p>
          <p><a href="/">Zpět na hlavní stránku</a></p>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
