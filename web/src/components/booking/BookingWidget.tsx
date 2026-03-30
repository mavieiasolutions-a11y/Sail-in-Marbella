'use client';

import { useState } from 'react';

type ServiceType = 'sunset' | 'grupal' | 'privado';

const SERVICES = [
    { id: 'sunset' as ServiceType, name: 'Sunset Cruise', price: '450€', duration: '2h', deposit: '135€' },
    { id: 'grupal' as ServiceType, name: 'Experiencia Grupal', price: '800€', duration: '4h', deposit: '240€' },
    { id: 'privado' as ServiceType, name: 'Charter Privado', price: '1.500€', duration: '8h', deposit: '450€' },
];

type Step = 'form' | 'checking' | 'unavailable' | 'payment';

export default function BookingWidget() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState<ServiceType>('sunset');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<Step>('form');
    const [payType, setPayType] = useState<'deposit' | 'full'>('deposit');
    const [adminMode, setAdminMode] = useState(false);
    const [adminPw, setAdminPw] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async () => {
        if (!date || !time || !name || !email) return;
        setStep('checking');

        try {
            const avRes = await fetch(`/api/calendar/check?date=${date}&service=${service}`);
            const avData = await avRes.json();

            if (!avData.available) {
                setStep('unavailable');
                return;
            }

            const checkoutRes = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service, date, time, customerName: name, customerEmail: email, paymentType: payType }),
            });
            const checkoutData = await checkoutRes.json();

            if (checkoutData.url) {
                window.location.href = checkoutData.url;
            } else {
                setStep('form');
                alert('Error al iniciar el pago. Inténtalo de nuevo.');
            }
        } catch {
            setStep('form');
            alert('Error de conexión. Por favor, inténtalo de nuevo.');
        }
    };

    const attemptAdmin = () => {
        if (adminPw === 'Flaviño2026*') {
            setAdminMode(true);
        } else {
            alert('Contraseña incorrecta');
        }
        setAdminPw('');
    };

    const selectedService = SERVICES.find(s => s.id === service)!;

    return (
        <div id="booking" className="w-full max-w-lg mx-auto glass-light rounded-sm shadow-2xl p-8 lg:p-12 animate-fade-up">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-[1px] bg-gold" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-gold">Concierge Service</span>
                    <div className="w-8 h-[1px] bg-gold" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-navy mb-4">Reserve su Experiencia</h2>
                <p className="text-navy/60 text-sm font-medium">Asignación inmediata y gestión premium de su reserva.</p>
            </div>

            {step === 'checking' ? (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                    <div className="w-12 h-12 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                    <p className="font-serif text-lg text-navy italic">Verificando su travesía...</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {step === 'unavailable' && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-sm text-center">
                            <p className="text-red-800 text-xs font-bold uppercase tracking-wider mb-2">⚓ Fecha no disponible</p>
                            <button onClick={() => setStep('form')} className="text-[10px] underline text-red-600 uppercase tracking-widest font-bold">
                                Intentar otra fecha
                            </button>
                        </div>
                    )}

                    {/* Service Selection */}
                    <div className="space-y-4">
                        <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy/40 ml-1">
                            Selección de Experiencia
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {SERVICES.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setService(s.id)}
                                    className={`flex items-center justify-between p-4 rounded-sm border transition-all duration-500 ${
                                        service === s.id 
                                        ? 'bg-navy text-white border-navy shadow-lg scale-[1.02]' 
                                        : 'bg-white/50 text-navy border-navy/5 hover:border-gold/30'
                                    }`}
                                >
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-sm font-bold uppercase tracking-widest">{s.name}</span>
                                        <span className={`text-[10px] uppercase tracking-wider ${service === s.id ? 'text-gold' : 'text-navy/40'}`}>
                                            Duración: {s.duration}
                                        </span>
                                    </div>
                                    <span className={`font-serif text-lg ${service === s.id ? 'text-gold' : 'text-navy/80'}`}>
                                        {s.price}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy/40 ml-1">Fecha</label>
                            <input
                                type="date"
                                min={today}
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full bg-white/50 border border-navy/5 rounded-sm p-4 text-sm font-bold text-navy outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy/40 ml-1">Hora</label>
                            <input
                                type="time"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                className="w-full bg-white/50 border border-navy/5 rounded-sm p-4 text-sm font-bold text-navy outline-none focus:border-gold transition-colors"
                            />
                        </div>
                    </div>

                    {/* Personal Data */}
                    <div className="space-y-4 pt-4 border-t border-navy/5">
                        <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy/40 ml-1">Nombre Completo</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="P. ej: Alejandro Valente"
                                className="w-full bg-white/50 border border-navy/5 rounded-sm p-4 text-sm font-bold text-navy outline-none focus:border-gold transition-colors placeholder:text-navy/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy/40 ml-1">Correo Electrónico</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="email@marbella.com"
                                className="w-full bg-white/50 border border-navy/5 rounded-sm p-4 text-sm font-bold text-navy outline-none focus:border-gold transition-colors placeholder:text-navy/20"
                            />
                        </div>
                    </div>

                    {/* Payment Mode */}
                    <div className="space-y-4">
                        <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-navy/40 ml-1">Modalidad de Reserva</label>
                        <div className="flex gap-4">
                            {[
                                { v: 'deposit', label: 'Depósito (Garantía)', amount: selectedService.deposit },
                                { v: 'full', label: 'Total del Charter', amount: selectedService.price },
                            ].map(({v, label, amount}) => (
                                <button
                                    key={v}
                                    onClick={() => setPayType(v as any)}
                                    className={`flex-1 p-4 rounded-sm border transition-all duration-300 ${
                                        payType === v 
                                        ? 'bg-gold text-white border-gold shadow-lg' 
                                        : 'bg-white/50 text-navy border-navy/5 hover:border-gold/30'
                                    }`}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
                                    <p className="font-serif text-lg">{amount}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={!date || !time || !name || !email}
                        className="btn-gold w-full !py-6 !text-sm group flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        <span>Confirmar Reserva Premium</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Admin Trigger */}
                    <div className="pt-12 text-center opacity-20 hover:opacity-100 transition-opacity">
                        {!adminMode ? (
                            <details className="inline-block">
                                <summary className="text-[8px] uppercase tracking-[0.5em] cursor-pointer outline-none text-navy">Admin Access</summary>
                                <div className="mt-4 flex gap-2">
                                    <input
                                        type="password"
                                        placeholder="Key"
                                        value={adminPw}
                                        onChange={e => setAdminPw(e.target.value)}
                                        className="bg-white border border-navy/10 rounded-sm px-3 py-1 text-[10px] outline-none"
                                    />
                                    <button onClick={attemptAdmin} className="bg-gold text-white px-3 py-1 text-[10px] font-bold hover:bg-gold-lt transition-colors rounded-sm uppercase tracking-widest">In</button>
                                </div>
                            </details>
                        ) : (
                            <div className="p-6 bg-white border border-gold rounded-sm shadow-xl">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-navy/5">
                                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-gold">✦ Admin Edit Mode</span>
                                    <button onClick={() => setAdminMode(false)} className="text-navy/40 hover:text-navy text-xs">✕</button>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { label: '🎬 Change Hero Video', field: 'hero-video' },
                                        { label: '📸 Update Services Gallery', field: 'gallery' },
                                        { label: '⛵ Fleet Images', field: 'fleet' },
                                    ].map(({ label, field }) => (
                                        <button
                                            key={field}
                                            className="w-full text-left p-3 bg-cream hover:bg-gold hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider rounded-sm text-navy/60"
                                            onClick={() => alert(`Funcionalidad de carga de archivos lista para ${field}`)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
