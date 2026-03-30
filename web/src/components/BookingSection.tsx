'use client';
import BookingWidget from './booking/BookingWidget';

export default function BookingSection() {
    return (
        <section
            id="booking"
            className="py-24 px-5 md:px-12 relative overflow-hidden"
            style={{ background: 'var(--navy)' }}
        >
            {/* Decorative circles */}
            <div
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10"
                style={{ background: 'var(--gold)' }}
            />
            <div
                className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-10"
                style={{ background: 'var(--gold)' }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left copy */}
                    <div className="text-white">
                        <p className="section-label mb-4">Reserva Online</p>
                        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--gold)' }} />
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                            Tu Próxima<br />
                            <span style={{ color: 'var(--gold)' }}>Aventura</span> te Espera
                        </h2>
                        <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-md">
                            Selecciona fecha, horario y tipo de experiencia. Validamos disponibilidad en tiempo real
                            y gestionamos tu pago de forma segura con Stripe. Recibirás confirmación en minutos.
                        </p>

                        {/* Trust badges */}
                        <ul className="flex flex-col gap-4">
                            {[
                                { icon: '🔒', text: 'Pago seguro con Stripe · Depósito del 30%' },
                                { icon: '📅', text: 'Confirmación instantánea · Evento en Google Calendar' },
                                { icon: '⚓', text: 'Cancelación gratuita 48h antes de la salida' },
                            ].map(({ icon, text }) => (
                                <li key={text} className="flex items-start gap-3 text-white/80 text-sm">
                                    <span className="text-lg leading-tight">{icon}</span>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: BookingWidget */}
                    <div className="w-full">
                        <BookingWidget />
                    </div>
                </div>
            </div>
        </section>
    );
}
