import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'VitalPulse', description: 'Healthcare monitoring demo' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang='en'><body><main className='container-shell'>{children}</main></body></html>;
}
