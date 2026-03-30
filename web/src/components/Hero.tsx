'use client';
import { useState } from 'react';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-navy"
            aria-label="Hero section"
        >
            {/* Background video/image */}
            <video
                className="absolute inset-0 w-full h-full object-cover brightness-[0.55] transition-opacity duration-[3s]"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/hero-poster.jpg"
                data-admin-field="hero-video"
                aria-hidden="true"
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay for Typography and Bar contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/10" />

            {/* Content Container (Center/Bottom) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-32 lg:pb-40 animate-fade-up">
                
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 mb-6 opacity-90">
                        <div className="h-[1px] w-12 bg-gold" />
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.5em] text-gold">
                            Marbella · Puerto Banús
                        </span>
                        <div className="h-[1px] w-12 bg-gold" />
                    </div>

                    <h1
                        className="font-serif font-bold text-white leading-[1.05] tracking-[-0.02em] mb-8 drop-shadow-2xl"
                        style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
                    >
                        La <span className="italic font-light text-gold text-glow">Esencia</span> del <br />
                        Lujo en el Mar
                    </h1>

                    <p
                        className="text-white/80 max-w-2xl text-center leading-relaxed font-light mb-12 drop-shadow-md"
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                    >
                        Experimenta el Mediterráneo con una exclusividad sin precedentes. 
                        Charter de veleros privados diseñados para los gustos más exigentes.
                    </p>
                </div>
            </div>

            {/* Glass Quick Booking Bar (Floating at bottom) */}
            <div className="absolute bottom-8 lg:bottom-12 left-6 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-max max-w-4xl z-20 animate-fade-up" style={{ animationDelay: '500ms' }}>
                <div className="glass rounded-[2rem] px-2 py-2 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 shadow-[0_8px_30px_rgb(11,22,34,0.8)] border border-white/10 backdrop-blur-xl bg-navy/40">
                    
                    <div className="hidden lg:flex items-center px-8 gap-10">
                        <div className="flex flex-col">
                            <span className="text-[0.5rem] uppercase tracking-widest text-white/50 font-bold mb-0.5">Destino</span>
                            <span className="text-[0.8rem] font-semibold tracking-wider text-white">Puerto Banús</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[0.5rem] uppercase tracking-widest text-white/50 font-bold mb-0.5">Embarcación</span>
                            <span className="text-[0.8rem] font-semibold tracking-wider text-white">Velero Privado</span>
                        </div>
                    </div>

                    <a 
                        href="#booking" 
                        className="w-full lg:w-auto btn-gold !rounded-[1.5rem] !py-4 !px-10 flex items-center justify-center gap-3 lg:ml-6 shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]"
                    >
                        Reservar Viaje
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>

            <style jsx>{`
                .text-glow {
                    text-shadow: 0 0 40px rgba(197, 160, 89, 0.5);
                }
            `}</style>
        </section>
    );
}
