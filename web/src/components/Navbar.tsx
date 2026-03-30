'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#1B263B]/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-col leading-none group">
                    <span
                        className="text-white font-serif text-xl tracking-widest font-bold"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        SAIL<span style={{ color: 'var(--gold)' }}>IN</span>MARBELLA
                    </span>
                    <span className="text-[8px] tracking-[0.35em] uppercase text-white/50 mt-0.5">Puerto Banús · Est. 2024</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-10 text-[0.72rem] font-semibold tracking-widest uppercase text-white/80">
                    {[
                        { label: 'Servicios', href: '#services' },
                        { label: 'Reservar', href: '#booking' },
                        { label: 'Flota', href: '#fleet' },
                        { label: 'Contacto', href: '#footer' },
                    ].map(({ label, href }) => (
                        <li key={label}>
                            <a
                                href={href}
                                className="hover:text-[#C5A059] transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[#C5A059] hover:after:w-full after:transition-all"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <a href="#booking" className="btn-gold hidden md:inline-block py-2.5 px-5 text-[0.68rem]">
                    Reservar Ahora
                </a>

                {/* Hamburger - mobile */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#1B263B]/98 backdrop-blur-md px-8 pb-8 pt-2 flex flex-col gap-5">
                    {[
                        { label: 'Servicios', href: '#services' },
                        { label: 'Reservar', href: '#booking' },
                        { label: 'Flota', href: '#fleet' },
                        { label: 'Contacto', href: '#footer' },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="text-white/80 text-sm font-semibold uppercase tracking-widest hover:text-[#C5A059] transition-colors border-b border-white/10 pb-4"
                        >
                            {label}
                        </a>
                    ))}
                    <a href="#booking" className="btn-gold text-center mt-2">
                        Reservar Ahora
                    </a>
                </div>
            )}
        </nav>
    );
}
