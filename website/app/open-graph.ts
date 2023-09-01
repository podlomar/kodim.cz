import { Metadata} from "next";

export const openGraph: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  siteName: 'Kódím.cz',
  title: 'Kódím.cz - kurzy programování',
  description: 'Programování hravě i vážně pro nováčky i pokročilé. Kurzy vývoje webových aplikací, kurzy programování v JavaScriptu, Pythonu, Reactu, Next.js, Node.js a dalších technologiích.',
  locale: 'cs_CZ',
  images: [
    {
      url: '/og-63ae7b.png',
      width: 1200,
      height: 630,
      alt: 'Kódím.cz - kurzy programování',
    }
  ],
};
