import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VitalPulse',
  description: 'Hospital-grade patient monitoring demo UI',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="container-shell py-6">{children}</main>
      </body>
    </html>
  );
}
