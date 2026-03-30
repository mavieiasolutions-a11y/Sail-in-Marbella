'use client';

import { useState } from 'react';

type ServiceType = 'sunset' | 'grupal' | 'privado';

const SERVICES = [
    { id: 'sunset' as ServiceType, name: 'Sunset Cruise', price: 'Desde 450€', duration: '2h', deposit: '135€' },
    { id: 'grupal' as ServiceType, name: 'Experiencia Grupal', price: 'Desde 800€', duration: '4h', deposit: '240€' },
    { id: 'privado' as ServiceType, name: 'Charter Privado', price: 'Desde 1.500€', duration: '8h', deposit: '450€' },
];

type Step = 'form' | 'checking' | 'unavailable' | 'payment';

export default function BookingWidget() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState<ServiceType>('privado');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<Step>('form');
    const [payType, setPayType] = useState<'deposit' | 'full'>('deposit');
    const [adminMode, setAdminMode] = useState(false);
    const [adminPw, setAdminPw] = useState('');

    const today = new Date().toISOString().split('T')[0];

    // ── Check availability then redirect to Stripe ──────────────────────────────
    const handleSubmit = async () => {
        if (!date || !time || !name || !email) return;
        setStep('checking');

        try {
            // 1. Check Google Calendar availability
            const avRes = await fetch(`/api/calendar/check?date=${date}&service=${service}`);
            const avData = await avRes.json();

            if (!avData.available) {
                setStep('unavailable');
                return;
            }

            // 2. Create Stripe Checkout session
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
        <div
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: '#F9F9F4', border: '1px solid rgba(197,160,89,0.2)' }}
        >
            {/* Gold top bar */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #1B263B, #C5A059, #1B263B)' }} />

            <div className="p-7">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="font-serif text-2xl" style={{ color: 'var(--navy)' }}>Tu Reserva</h2>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Puerto Banús · Marbella</p>
                    </div>
                    <div className="w-8 h-px mt-4" style={{ background: 'var(--gold)' }} />
                </div>

                {/* ── STEP: form ─────────────────────────────────────── */}
                {(step === 'form' || step === 'unavailable') && (
                    <div className="flex flex-col gap-5">
                        {step === 'unavailable' && (
                            <div
                                className="text-sm px-4 py-3 rounded-lg border"
                                style={{ background: 'rgba(197,160,89,0.1)', borderColor: 'var(--gold)', color: 'var(--navy)' }}
                            >
                                ⚓ Fecha no disponible. Por favor elige otra fecha.
                                <button className="block mt-2 text-xs underline" onClick={() => setStep('form')}>
                                    Volver a intentarlo
                                </button>
                            </div>
                        )}

                        {/* Date & Time */}
                        <div
                            className="grid grid-cols-2 rounded-xl overflow-hidden"
                            style={{ border: '1px solid rgba(27,38,59,0.12)', background: '#fff' }}
                        >
                            <div className="p-3" style={{ borderRight: '1px solid rgba(27,38,59,0.12)' }}>
                                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--muted)' }}>
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full text-sm font-medium bg-transparent outline-none cursor-pointer"
                                    style={{ color: 'var(--navy)' }}
                                />
                            </div>
                            <div className="p-3">
                                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--muted)' }}>
                                    Hora
                                </label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className="w-full text-sm font-medium bg-transparent outline-none cursor-pointer"
                                    style={{ color: 'var(--navy)' }}
                                />
                            </div>
                        </div>

                        {/* Service selector */}
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{ border: '1px solid rgba(27,38,59,0.12)', background: '#fff' }}
                        >
                            <div className="px-4 pt-4 pb-3">
                                <label className="block text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
                                    Tipo de Experiencia
                                </label>
                                <div className="flex flex-col gap-2">
                                    {SERVICES.map(s => (
                                        <label
                                            key={s.id}
                                            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all border ${service === s.id
                                                    ? 'border-[#C5A059] bg-[#1B263B]/5'
                                                    : 'border-transparent hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="service"
                                                    value={s.id}
                                                    checked={service === s.id}
                                                    onChange={() => setService(s.id)}
                                                    className="w-4 h-4 cursor-pointer accent-[#C5A059]"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{s.name}</p>
                                                    <p className="text-[10px]" style={{ color: 'var(--muted)' }}>{s.duration}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>{s.price}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact fields */}
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{ border: '1px solid rgba(27,38,59,0.12)', background: '#fff' }}
                        >
                            <div className="p-4 flex flex-col gap-3">
                                <label className="block text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                                    Tus Datos
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full text-sm p-2 rounded-md outline-none"
                                    style={{ border: '1px solid rgba(27,38,59,0.15)', color: 'var(--navy)' }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full text-sm p-2 rounded-md outline-none"
                                    style={{ border: '1px solid rgba(27,38,59,0.15)', color: 'var(--navy)' }}
                                />
                            </div>
                        </div>

                        {/* Payment type */}
                        <div className="flex gap-3">
                            {([
                                { v: 'deposit', label: `Depósito · ${selectedService.deposit}` },
                                { v: 'full', label: `Total · ${selectedService.price}` },
                            ] as const).map(({ v, label }) => (
                                <button
                                    key={v}
                                    onClick={() => setPayType(v)}
                                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all`}
                                    style={{
                                        background: payType === v ? 'var(--navy)' : 'transparent',
                                        color: payType === v ? '#fff' : 'var(--navy)',
                                        border: `1.5px solid ${payType === v ? 'var(--navy)' : 'rgba(27,38,59,0.2)'}`,
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleSubmit}
                            disabled={!date || !time || !name || !email}
                            className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ background: 'var(--navy)', color: '#fff' }}
                        >
                            Verificar y Pagar →
                        </button>
                    </div>
                )}

                {/* ── STEP: checking ─────────────────────────────────── */}
                {step === 'checking' && (
                    <div className="flex flex-col items-center justify-center py-12 gap-5">
                        <div
                            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                            style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }}
                        />
                        <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>
                            Verificando disponibilidad…
                        </p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                            Consultando Google Calendar
                        </p>
                    </div>
                )}

                {/* ── Admin Mode toggle (hidden) ──────────────────────── */}
                {!adminMode ? (
                    <div className="mt-8 text-center">
                        <details>
                            <summary className="text-[10px] uppercase tracking-widest cursor-pointer outline-none" style={{ color: 'rgba(0,0,0,0.15)' }}>
                                Configuración Web
                            </summary>
                            <div className="mt-3 flex gap-2">
                                <input
                                    type="password"
                                    placeholder="Contraseña admin"
                                    value={adminPw}
                                    onChange={e => setAdminPw(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && attemptAdmin()}
                                    className="flex-1 text-xs px-3 py-2 rounded-md outline-none"
                                    style={{ border: '1px solid rgba(197,160,89,0.4)' }}
                                />
                                <button
                                    onClick={attemptAdmin}
                                    className="text-xs px-4 rounded-md font-bold text-white"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    OK
                                </button>
                            </div>
                        </details>
                    </div>
                ) : (
                    <div
                        className="mt-6 p-4 rounded-xl relative"
                        style={{ background: '#fff', border: '1px solid var(--gold)' }}
                    >
                        <button
                            onClick={() => setAdminMode(false)}
                            className="absolute top-3 right-3 text-xs"
                            style={{ color: 'var(--muted)' }}
                        >
                            ✕
                        </button>
                        <h3
                            className="text-xs font-bold uppercase tracking-widest mb-3"
                            style={{ color: 'var(--navy)' }}
                        >
                            ✦ Modo Edición Activo
                        </h3>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: '🎬 Cambiar Video de Fondo', field: 'hero-video' },
                                { label: '🖼️ Actualizar Galería Servicios', field: 'gallery' },
                                { label: '📸 Imagen Sunset Cruise', field: 'service-image-sunset' },
                                { label: '📸 Imagen Experiencia Grupal', field: 'service-image-grupal' },
                                { label: '📸 Imagen Charter Privado', field: 'service-image-privado' },
                            ].map(({ label, field }) => (
                                <button
                                    key={field}
                                    className="w-full text-xs py-2 px-3 rounded text-left font-medium transition-colors"
                                    style={{
                                        background: 'var(--cream)',
                                        color: 'var(--navy)',
                                        border: '1px solid rgba(197,160,89,0.2)',
                                    }}
                                    onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.accept = field === 'hero-video' ? 'video/*' : 'image/*';
                                        input.onchange = (e) => {
                                            const file = (e.target as HTMLInputElement).files?.[0];
                                            if (!file) return;
                                            // Update the corresponding element's src/poster
                                            const el = document.querySelector(`[data-admin-field="${field}"]`) as HTMLElement;
                                            if (el) {
                                                const url = URL.createObjectURL(file);
                                                if (el instanceof HTMLVideoElement) el.poster = url;
                                                else if (el instanceof HTMLImageElement) el.src = url;
                                                // Also update video source
                                                if (field === 'hero-video') {
                                                    const vid = el as HTMLVideoElement;
                                                    vid.src = url;
                                                    vid.load();
                                                    vid.play();
                                                }
                                            }
                                        };
                                        input.click();
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
