import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { href: '/pourquoi-salsa', label: 'Pourquoi la salsa ?' },
  { href: '/notre-communaute', label: 'Notre Communauté' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-[#121212]/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-[#f6bc7c] text-lg font-bold tracking-wide hover:text-white transition-colors duration-200"
          >
            Salsa <span className="text-white/60 font-normal">Rennes</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#f6bc7c] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-[#f6bc7c] font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inscription"
              className="ml-1 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#f6bc7c]/20 transition-all duration-300 hover:scale-105"
            >
              {"S'inscrire"}
            </Link>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-80 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white/70 hover:text-[#f6bc7c] text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inscription"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:shadow-lg transition-all duration-300"
            >
              {"S'inscrire"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
