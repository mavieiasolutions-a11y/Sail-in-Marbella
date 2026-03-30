'use client';

const SERVICES = [
    {
        id: '01',
        serviceId: 'sunset',
        label: 'Amanecer / Atardecer en Marbella',
        duration: '2 Horas',
        price: 'Desde 450€',
        capacity: '10 Invitados',
        description:
            'Hay momentos que merecen ser vividos en el mar. Una travesía mágica bajo el cielo encendido de Marbella. Desde pedidas de mano al atardecer hasta celebraciones privadas, privacidad absoluta, selección de tapas premium y el mejor vino frente a Puerto Banús.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
    },
    {
        id: '02',
        serviceId: 'grupal',
        label: 'Navegación y Baño en la Costa',
        duration: '4 Horas',
        price: 'Desde 800€',
        capacity: '20 Invitados',
        description:
            'Navegación costera exclusiva para grupos selectos. Música a bordo, fondeo en calas para disfrutar de un baño en aguas cristalinas y un ambiente sofisticado bajo el sol mediterráneo. Ideal para cumpleaños y eventos corporativos.',
        image: 'https://images.unsplash.com/photo-1505041042733-6490696700c0?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: '03',
        serviceId: 'privado',
        label: 'Día Completo de Navegación',
        duration: '8 Horas',
        price: 'Desde 1.500€',
        capacity: '12 Invitados',
        description:
            'El epítome del lujo náutico. Siente la libertad del mar a bordo de un velero privado explorando la Costa del Sol. Un día completo a su medida con un servicio discreto y personalizado de primer nivel.',
        image: 'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2073&auto=format&fit=crop',
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#FAF9F7]">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6 leading-tight">
                        Nuestras salidas más <span className="text-gold italic">destacadas</span>
                    </h2>
                    <p className="text-navy/70 text-base leading-relaxed">
                        Estas son las travesías que hemos creado con más cariño y también las que más enamoran a quienes navegan con nosotros. Disfruta de un viaje verdaderamente único por la Costa del Sol.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {SERVICES.map((s, i) => (
                        <div 
                            key={s.id}
                            className="flex flex-col md:flex-row bg-white rounded-sm shadow-sm hover:shadow-xl overflow-hidden border border-navy/5 group transition-all duration-500 animate-fade-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Image side */}
                            <div className="w-full md:w-[45%] lg:w-[40%] aspect-[4/3] md:aspect-auto md:min-h-[340px] relative overflow-hidden shrink-0">
                                <img 
                                    src={s.image} 
                                    alt={s.label}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 glass py-1.5 px-3">
                                    <span className="text-gold font-bold text-xs">{s.id}.</span>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-[55%] lg:w-[60%] p-8 lg:p-12 flex flex-col justify-center">
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-navy mb-5 group-hover:text-gold transition-colors duration-300">
                                    {s.label}
                                </h3>
                                
                                <p className="text-navy/70 text-sm md:text-base leading-relaxed mb-8">
                                    {s.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8 mt-auto pt-6 border-t border-navy/5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-navy/40">Duración</span>
                                        <span className="font-serif font-bold text-navy text-lg">{s.duration}</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-8 bg-navy/10" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-navy/40">Capacidad</span>
                                        <span className="font-serif font-bold text-navy text-lg">{s.capacity}</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-8 bg-navy/10" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[0.6rem] uppercase tracking-widest font-bold text-navy/40">Tarifa</span>
                                        <span className="font-serif font-bold text-navy text-xl">{s.price}</span>
                                    </div>
                                </div>

                                <div>
                                    <a 
                                        href={`#booking-hero?service=${s.serviceId}`} 
                                        className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] font-bold text-gold hover:text-navy transition-colors pb-1 border-b border-gold/40 hover:border-navy"
                                    >
                                        Reservar esta experiencia
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
