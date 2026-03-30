'use client';
import BookingWidget from './booking/BookingWidget';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-navy pt-24 pb-12"
            aria-label="Hero section"
        >
            {/* Background video */}
            <video
                className="hero-video brightness-[0.7]"
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

            {/* Cinematic Overlay */}
            <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(11,22,34,0.9) 0%, rgba(11,22,34,0.4) 50%, rgba(11,22,34,0.1) 100%)' }} />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 animate-fade-up mt-8">
                
                {/* Left Text Content */}
                <div className="text-white flex-1 text-center lg:text-left pt-12 lg:pt-0">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <div className="h-[2px] w-8 bg-gold" />
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-gold/90">
                            Marbella · Puerto Banús
                        </span>
                    </div>

                    <h1
                        className="font-serif font-bold leading-[1.1] mb-6"
                        style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}
                    >
                        Vive la <span className="italic text-gold">experiencia</span> <br />
                        de navegar
                    </h1>

                    <p
                        className="text-white/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
                        style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
                    >
                        Sube a bordo y acompáñanos hoy mismo. Charter de veleros privados diseñados para contemplar la costa mediterránea con exclusividad absoluta.
                    </p>

                    <div className="hidden md:flex flex-col gap-4 justify-center lg:justify-start">
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-3 text-sm tracking-wider font-bold text-white/90">
                                <span className="text-gold text-lg">✓</span> Crucero 100% Privado
                            </li>
                            <li className="flex items-center gap-3 text-sm tracking-wider font-bold text-white/90">
                                <span className="text-gold text-lg">✓</span> Capitán Experto a Bordo
                            </li>
                            <li className="flex items-center gap-3 text-sm tracking-wider font-bold text-white/90">
                                <span className="text-gold text-lg">✓</span> Confirmación Inmediata
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Booking Widget */}
                <div id="booking-hero" className="w-full lg:w-[480px] shrink-0 pb-12 lg:pb-0 relative z-20">
                    <BookingWidget />
                </div>
            </div>
        </section>
    );
}
