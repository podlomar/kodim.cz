import 'styles/global.scss';
import { cache } from 'react';
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { openGraph } from './open-graph';
import { fetchUser } from '../lib/directus';
import { ClaimsAgent, PublicAgent } from 'kodim-cms/esm/access-control/claim-agent';
import { Session } from 'lib/session';
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

export const session = cache(async (): Promise<Session> => {
  const userId = headers().get('x-user-id');
  if (userId === null) {
    return { user: null, cmsAgent: new PublicAgent() };
  }

  const user = await fetchUser(userId);
  const cmsAgent = new ClaimsAgent(user.accessRules);
  return { user, cmsAgent };
});

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
