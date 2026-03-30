'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const navLinks = [
        { label: 'Paseos en Barco', href: '#services' },
        { label: 'Reservas', href: '#booking-hero' },
        { label: 'Quiénes somos', href: '#about' },
        { label: 'Contáctenos', href: '#footer' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                scrolled ? 'bg-white shadow-sm py-4 border-navy/5' : 'bg-transparent py-6 border-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col group">
                        <span className={`font-serif text-2xl tracking-[0.1em] font-bold transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}>
                            SAIL<span className="text-gold">IN</span>MARBELLA
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-10">
                        <ul className={`flex items-center gap-8 text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? 'text-navy/80 hover:text-navy' : 'text-white/90 hover:text-white'}`}>
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className={`transition-colors duration-300 relative py-2 ${scrolled ? 'hover:text-gold' : 'hover:text-gold'}`}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a href="#booking-hero" className="btn-gold !py-3 !px-8 text-[0.65rem] uppercase tracking-widest hover:scale-105">
                            Reservar Ahora
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden flex flex-col gap-1.5 p-2 group"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-navy' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2 !bg-gold' : ''}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-navy' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-navy' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2 !bg-gold' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-white transition-all duration-500 ease-in-out ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`} style={{ top: scrolled ? '73px' : '89px' }}>
                <div className="flex flex-col h-full justify-start items-start p-10 gap-8">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="font-serif text-2xl font-bold text-navy hover:text-gold transition-colors pb-4 border-b border-navy/10 w-full"
                        >
                            {label}
                        </a>
                    ))}
                    <div className="w-full pt-8">
                        <a 
                            href="#booking-hero" 
                            onClick={() => setMenuOpen(false)}
                            className="btn-gold w-full text-center py-5 text-sm block"
                        >
                            Reservar Ahora
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
