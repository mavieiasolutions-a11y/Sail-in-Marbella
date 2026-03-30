'use client';

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero section"
        >
            {/* Background video */}
            <video
                className="hero-video"
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

            {/* Overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <div className="relative z-10 text-center text-white px-5 max-w-4xl mx-auto fade-up">
                <p className="section-label text-white/70 mb-5">Puerto Banús · Marbella</p>
                <h1
                    className="hero-title font-serif font-bold leading-tight mb-6"
                    style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}
                >
                    Navega el&nbsp;
                    <span style={{ color: 'var(--gold)' }}>Mediterráneo</span>
                    <br />en Velero de Lujo
                </h1>
                <p
                    className="text-white/80 mb-10 max-w-xl mx-auto leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
                >
                    Experiencias exclusivas de charter náutico desde Puerto Banús.
                    Puestas de sol, aventuras grupales o charters privados — diseñados a tu medida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <a href="#booking" className="btn-gold w-full sm:w-auto text-center">
                        Reservar Experiencia
                    </a>
                    <a href="#services" className="btn-outline w-full sm:w-auto text-center">
                        Ver Servicios
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60">
                <span className="text-white text-[0.6rem] tracking-[0.3em] uppercase">Explorar</span>
                <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-bounce" />
            </div>
        </section>
    );
}
