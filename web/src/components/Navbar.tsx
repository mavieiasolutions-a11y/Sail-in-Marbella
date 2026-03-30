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
        { label: 'Experiencias', href: '#services' },
        { label: 'Nosotros', href: '#about' },
        { label: 'Reservas', href: '#booking' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? 'py-4' : 'py-8'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* The pill wrapper */}
                <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-8 border ${
                    scrolled 
                    ? 'glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-xl bg-navy/60' 
                    : 'bg-transparent py-0 border-transparent shadow-none'
                }`}>
                    
                    {/* Logo */}
                    <Link href="/" className="flex flex-col group">
                        <span className="font-serif text-xl md:text-2xl tracking-[0.15em] font-bold text-white transition-opacity duration-300 drop-shadow-md">
                            SAIL<span className="text-gold">IN</span>MARBELLA
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-10">
                        <ul className="flex items-center gap-8 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/80">
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="hover:text-gold transition-colors duration-300 relative py-2"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a 
                            href="#booking" 
                            className="btn-gold !py-2.5 !px-8 !text-[0.6rem] !rounded-full shadow-[0_4px_15px_rgba(197,160,89,0.3)] hover:shadow-[0_4px_25px_rgba(197,160,89,0.5)] transition-all duration-500 hover:scale-105"
                        >
                            Reservar
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden flex flex-col gap-1.5 p-2 group"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2 !bg-gold' : ''}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2 !bg-gold' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-navy/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
                <div className="flex flex-col h-full justify-center items-center p-10 gap-10">
                    {navLinks.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="font-serif text-4xl font-light text-white hover:text-gold transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                    <a 
                        href="#booking" 
                        onClick={() => setMenuOpen(false)}
                        className="btn-gold mt-8 w-full max-w-xs text-center !py-5 !rounded-full !text-xs tracking-widest shadow-xl uppercase"
                    >
                        Reservar Ahora
                    </a>
                </div>
            </div>
        </nav>
    );
}
