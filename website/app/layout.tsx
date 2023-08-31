import 'styles/global.scss';
import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="cs">
      <head>
        <meta charSet="utf-8" />
        <title>Kódím.cz</title>
        
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,800;1,500&family=Roboto+Mono:wght@400;700&display=swap"
        />

        <meta name="robots" content="index, follow" />
        <meta 
          name="description"
          content="Programování hravě i vážně pro nováčky i pokročilé. Kurzy vývoje webových aplikací, programování v JavaScriptu, Pythonu, Reactu, Next.js, Node.js a dalších technologiích."
        />

        <meta 
          name="keywords"
          content="Kurzy programování, tvorba webových stránek, JavaScript, React, Python, datová analýza."
        />
      </head>
      <body>
        <div className={styles.rootLayout}>  
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout;
