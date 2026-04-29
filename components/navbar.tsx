import Link from 'next/link';
import { Activity } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/alerts', label: 'Alerts' },
  { href: '/records', label: 'Records' },
  { href: '/admin', label: 'Admin Demo' },
  { href: '/ai', label: 'AI Help' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-navy/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Activity className="h-5 w-5 text-teal" /> VitalPulse
        </Link>
        <nav className="hidden gap-6 text-sm text-soft md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
