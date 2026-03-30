'use client';

const SERVICES = [
    {
        id: 'sunset',
        label: 'Sunset Cruise',
        tag: 'Atardecer',
        duration: '2 Horas',
        price: 'Desde 450€',
        capacity: 'Hasta 10 personas',
        description:
            'Una experiencia mágica navegando hacia el horizonte mientras el sol se funde con el Mediterráneo. Vino, tapas y privacidad absoluta.',
        image: '/images/service-sunset.jpg',
        features: ['Vino & Tapas incluidos', 'Capitán experto', 'Salida al atardecer', 'Equipo de snorkel'],
    },
    {
        id: 'grupal',
        label: 'Experiencia Grupal',
        tag: 'Grupal',
        duration: '4 Horas',
        price: 'Desde 800€',
        capacity: 'Hasta 20 personas',
        description:
            'La opción perfecta para celebraciones, team buildings o grupos de amigos. Ruta por la costa de Marbella con paradas en calas exclusivas.',
        image: '/images/service-grupal.jpg',
        features: ['Catering personalizable', 'DJ / Música a bordo', 'Paradas en calas', 'Fotos incluidas'],
    },
    {
        id: 'privado',
        label: 'Charter Privado',
        tag: 'Premium',
        duration: '8 Horas',
        price: 'Desde 1.500€',
        capacity: 'Hasta 12 personas',
        description:
            'El máximo lujo náutico. Diseña tu itinerario perfecto: Gibraltar, Cabo Pino, Fuengirola. Servicio white-glove de principio a fin.',
        image: '/images/service-privado.jpg',
        features: ['Itinerario personalizado', 'Chef a bordo', 'Equipo de buceo', 'Traslado incluido'],
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 px-5 md:px-12" style={{ background: 'var(--cream)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="section-label mb-3">Nuestros Servicios</p>
                    <div className="gold-line" />
                    <h2 className="text-4xl md:text-5xl font-serif mt-4" style={{ color: 'var(--navy)' }}>
                        Elige Tu Experiencia
                    </h2>
                    <p className="text-[var(--muted)] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
                        Cada travesía es diseñada para ser única, íntima y verdaderamente memorable en las aguas del Mediterráneo.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SERVICES.map((s, i) => (
                        <article
                            key={s.id}
                            className="rounded-xl overflow-hidden shadow-lg group transition-transform duration-300 hover:-translate-y-2"
                            style={{ background: '#fff', border: '1px solid rgba(197,160,89,0.15)' }}
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={s.image}
                                    alt={s.label}
                                    data-admin-field={`service-image-${s.id}`}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        // Fallback gradient if image not uploaded yet
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {/* Fallback gradient background */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: i === 0
                                            ? 'linear-gradient(135deg,#1B263B 0%,#C5A059 100%)'
                                            : i === 1
                                                ? 'linear-gradient(135deg,#0E1620 0%,#1B263B 100%)'
                                                : 'linear-gradient(135deg,#C5A059 0%,#1B263B 100%)',
                                        zIndex: -1
                                    }}
                                />
                                {/* Tag */}
                                <span
                                    className="absolute top-4 left-4 text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                                    style={{ background: 'var(--gold)', color: '#fff' }}
                                >
                                    {s.tag}
                                </span>
                                {/* Duration */}
                                <span
                                    className="absolute top-4 right-4 text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                                    style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
                                >
                                    {s.duration}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <h3 className="font-serif text-xl mb-1" style={{ color: 'var(--navy)' }}>{s.label}</h3>
                                <p className="text-xs text-[var(--muted)] mb-1">{s.capacity}</p>
                                <div className="w-8 h-px my-3" style={{ background: 'var(--gold)' }} />
                                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{s.description}</p>

                                {/* Features */}
                                <ul className="flex flex-col gap-1.5 mb-6">
                                    {s.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--navy)' }}>
                                            <span style={{ color: 'var(--gold)' }}>✦</span> {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg" style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif' }}>
                                        {s.price}
                                    </span>
                                    <a
                                        href={`#booking?service=${s.id}`}
                                        className="btn-gold py-2 px-5 text-[0.65rem]"
                                    >
                                        Reservar
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
