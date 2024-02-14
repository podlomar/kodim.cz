import 'styles/global.scss';
import { Metadata } from 'next';
import { openGraph } from './open-graph';
import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL('https://kodim.cz'),
  title: {
    template: `%s | ${openGraph.siteName}`,
    default: openGraph.title,
  },
  applicationName: openGraph.siteName,
  description: openGraph.description,
  robots: 'index, follow',
  keywords: [
    'kurzy programování',
    'tvorba webových stránek',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'datová analýza',
  ],
  openGraph,
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="cs">
      <head>
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

        <script defer data-domain="kodim.cz" src="https://plausible.io/js/script.js"></script>
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
