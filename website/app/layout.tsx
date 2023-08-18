import clsx from 'clsx';
import { version } from '../package.json';
import styles from './styles.module.scss';
import '../styles/global.scss';

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Kódím.cz</title>
        
        {/* <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,800;1,500&family=Roboto+Mono:wght@400;700&display=swap"
        />

        <meta name="robots" content="index, follow" />
        {/* <meta 
          name="description"
          content="Svérázné zprávy z domova i obskurních zemí, na které se v tuzemských médiích zapomnělo. Shrnutí a komentáře s jasným názorem a dávkou sarkasmu, jež vás postaví na nohy lépe než ranní kafe."
        /> */}

        {/* <meta name="keywords" content="Cynické hyeny, ironické zprávy, sarkastické komentáře, blog, newsletter" /> */}
      </head>
      <body>
        <main>
          {children}
        </main>
        <footer>
          <div className={clsx('container', styles.footerContent)}>
            <p className={styles.footerTitle}>Kódím.cz</p>
            <p className={styles.version}>Verze {version}</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout;
