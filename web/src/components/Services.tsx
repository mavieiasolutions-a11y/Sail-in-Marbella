'use client';

const SERVICES = [
    {
        id: '01',
        serviceId: 'sunset',
        label: 'Amanecer / Atardecer en Marbella',
        duration: '2 Horas',
        price: '450€',
        capacity: '10 Invitados',
        description:
            'Una travesía mágica bajo el cielo encendido de Marbella. Privacidad absoluta, selección de tapas premium y el mejor vino frente a Puerto Banús.',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
    },
    {
        id: '02',
        serviceId: 'grupal',
        label: 'Navegación y Baño en la Costa',
        duration: '4 Horas',
        price: '800€',
        capacity: '20 Invitados',
        description:
            'Navegación costera exclusiva para grupos selectos. Música a bordo, fondeo en calas para disfrutar de un baño en aguas cristalinas y un ambiente sofisticado bajo el sol mediterráneo.',
        image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2044&auto=format&fit=crop',
    },
    {
        id: '03',
        serviceId: 'privado',
        label: 'Charter Privado Día Completo',
        duration: '8 Horas',
        price: '1.500€',
        capacity: '12 Invitados',
        description:
            'El epítome del lujo náutico. Siente la libertad del mar a bordo de un velero privado explorando la Costa del Sol. Un día completo a su medida con un servicio discreto y personalizado.',
        image: 'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2073&auto=format&fit=crop',
    },
];

export default function Services() {
    return (
        <section id="services" className="py-32 bg-navy relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, var(--gold) 0%, transparent 60%)' }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-white/10 pb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-gold" />
                            <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-gold">
                                Colección Exclusiva
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1]">
                            Travesías de <br />
                            <span className="italic text-gold font-light">Distinción</span>
                        </h2>
                    </div>
                    <div className="max-w-sm">
                        <p className="text-white/60 text-sm leading-relaxed font-light">
                            Seleccionamos los itinerarios más espectaculares de la Costa del Sol. Cada experiencia naval está diseñada para superar las expectativas del navegante más exigente.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {SERVICES.map((s, i) => (
                        <div 
                            key={s.id}
                            className="group relative overflow-hidden aspect-[3/4] rounded-sm bg-navy cursor-pointer animate-fade-up shadow-[0_4px_25px_rgba(0,0,0,0.5)] border border-white/5"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            {/* Background Image */}
                            <img 
                                src={s.image} 
                                alt={s.label}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                            />
                            
                            {/* Gradient Overlay for legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent transition-opacity duration-500 group-hover:from-navy/90" />

                            {/* Number floating top */}
                            <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                <span className="text-white/90 font-serif text-3xl font-light italic">{s.id}.</span>
                            </div>

                            {/* Content Block (Bottom) */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">{s.duration}</span>
                                    <div className="w-1 h-1 rounded-full bg-white/30" />
                                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50">{s.capacity}</span>
                                </div>
                                
                                <h3 className="text-2xl font-serif font-bold text-white mb-4 drop-shadow-md pb-4 group-hover:pb-0 transition-all duration-500">
                                    {s.label}
                                </h3>

                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                    <div className="overflow-hidden">
                                        <p className="text-white/60 text-sm leading-relaxed mb-6 pt-2 font-light line-clamp-3">
                                            {s.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                            <div className="flex flex-col">
                                                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 mb-1">Inversión Desde</span>
                                                <span className="text-xl font-serif text-gold font-bold">{s.price}</span>
                                            </div>
                                            
                                            <a 
                                                href={`#booking?service=${s.serviceId}`} 
                                                className="btn-outline !py-2.5 !px-6 !text-[0.6rem] !border-white/20 hover:!border-gold hover:!bg-gold hover:text-white"
                                            >
                                                Reservar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
