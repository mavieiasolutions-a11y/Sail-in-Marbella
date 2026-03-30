'use client';
import BookingWidget from './booking/BookingWidget';

export default function BookingSection() {
    return (
        <section
            id="booking"
            className="py-32 px-5 md:px-12 relative overflow-hidden bg-navy"
            style={{ 
                backgroundImage: 'radial-gradient(ellipse at bottom left, rgba(197, 160, 89, 0.08) 0%, transparent 60%)' 
            }}
        >
            <div className="max-w-7xl mx-auto relative z-10 border-t border-white/5 pt-32">
                <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
                    
                    {/* Left Typography */}
                    <div className="lg:w-5/12 text-white/90 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                            <div className="w-8 h-[1px] bg-gold" />
                            <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-gold">Reserva Online</span>
                        </div>
                        
                        <h2 className="font-serif text-5xl md:text-6xl font-bold leading-[1.1] mb-8">
                            Planifica tu <br />
                            <span className="italic font-light text-gold text-glow-subtle">Aventura</span>
                        </h2>
                        
                        <p className="text-white/60 text-sm leading-relaxed mb-16 font-light max-w-md mx-auto lg:mx-0">
                            Asegure su travesía en minutos. Seleccione la fecha, embarcación y modalidad preferida. Nuestro sistema verifica su disponibilidad de forma inmediata para garantizar una experiencia excepcional.
                        </p>

                        {/* Trust badges */}
                        <ul className="flex flex-col gap-8 max-w-sm mx-auto lg:mx-0">
                            {[
                                { icon: 'lock', title: 'Pago Seguro', text: 'Con Stripe y seguridad de grado bancario' },
                                { icon: 'calendar', title: 'Agendamiento', text: 'Reserva confirmada instantáneamente' },
                                { icon: 'shield', title: 'Garantía', text: 'Cancelación gratuita hasta 48h antes' },
                            ].map(({ icon, title, text }) => (
                                <li key={title} className="flex items-center lg:items-start gap-6 text-left">
                                    <div className="w-12 h-12 rounded-full border border-gold/20 flex flex-col items-center justify-center shrink-0 bg-gold/5">
                                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1.5">{title}</h4>
                                        <p className="text-white/50 text-[0.7rem] font-light leading-relaxed">{text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: BookingWidget Form */}
                    <div className="lg:w-7/12 w-full flex justify-center lg:justify-end">
                        <div className="w-full max-w-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <BookingWidget />
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .text-glow-subtle {
                    text-shadow: 0 0 20px rgba(197, 160, 89, 0.4);
                }
            `}</style>
        </section>
    );
}
