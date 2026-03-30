import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SailInMarbella – Alquiler de Veleros de Lujo en Puerto Banús',
  description:
    'Descubre el Mediterráneo en velero de lujo. Charters privados, experiencias grupales y cruceros al atardecer desde Puerto Banús, Marbella. Reserva tu aventura hoy.',
  keywords: [
    'sailing marbella',
    'boat rental puerto banús',
    'alquiler velero marbella',
    'charter náutico marbella',
    'velero lujo puerto banús',
  ],
  openGraph: {
    title: 'SailInMarbella – Veleros de Lujo en Puerto Banús',
    description: 'Charters exclusivos en velero desde Puerto Banús. Vive el Mediterráneo como nunca antes.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'SailInMarbella',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SailInMarbella – Veleros de Lujo en Puerto Banús',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
