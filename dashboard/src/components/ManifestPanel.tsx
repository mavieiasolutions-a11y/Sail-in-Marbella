import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Manifest {
    id: string;
    booking_id: string;
    first_name: string;
    last_name: string;
    passport_number: string;
    nationality: string;
    date_of_birth: string;
    bookings?: {
        customer_name: string;
        booking_date: string;
    };
}

export default function ManifestPanel() {
    const [manifests, setManifests] = useState<Manifest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManifests = async () => {
            // Get passengers joined with their booking info
            const { data, error } = await supabase
                .from('passenger_manifests')
                .select('*, bookings(customer_name, booking_date)')
                .order('created_at', { ascending: false })
                .limit(10); // Show recent 10 for dashboard preview

            if (!error && data) {
                setManifests(data as unknown as Manifest[]);
            }
            setLoading(false);
        };

        fetchManifests();
    }, []);

    return (
        <div className="rounded-2xl p-5 h-full" style={{ background: '#141E2C', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="font-serif text-lg text-white mb-1">Manifiesto de Pasajeros</h2>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Normativa portuaria / Últimas 10 altas</p>
                </div>
                <button
                    className="text-[0.65rem] uppercase tracking-wider px-3 py-1.5 rounded-lg border font-bold transition-colors"
                    style={{ borderColor: 'rgba(197,160,89,0.4)', color: 'var(--gold)', background: 'transparent' }}
                >
                    Exportar CSV
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-48">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
                </div>
            ) : manifests.length === 0 ? (
                <p className="text-xs text-center py-8" style={{ color: 'var(--muted)' }}>
                    No hay pasajeros registrados aún.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <th className="py-3 px-2 text-[0.62rem] uppercase tracking-widest text-[#7A8090]">Pasajero</th>
                                <th className="py-3 px-2 text-[0.62rem] uppercase tracking-widest text-[#7A8090]">Pasaporte / DNI</th>
                                <th className="py-3 px-2 text-[0.62rem] uppercase tracking-widest text-[#7A8090]">Nacionalidad</th>
                                <th className="py-3 px-2 text-[0.62rem] uppercase tracking-widest text-[#7A8090]">Reserva</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manifests.map((m) => (
                                <tr
                                    key={m.id}
                                    className="transition-colors hover:bg-white/5"
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                                >
                                    <td className="py-3 px-2">
                                        <p className="text-sm font-semibold text-white">{m.first_name} {m.last_name}</p>
                                        <p className="text-[0.65rem] text-[#7A8090]">Nac: {m.date_of_birth}</p>
                                    </td>
                                    <td className="py-3 px-2 text-xs font-mono text-[#cdd5e0]">{m.passport_number}</td>
                                    <td className="py-3 px-2 text-xs text-[#cdd5e0]">{m.nationality}</td>
                                    <td className="py-3 px-2">
                                        <p className="text-xs text-white">{m.bookings?.customer_name}</p>
                                        <p className="text-[0.65rem] text-[#C5A059]">{m.bookings?.booking_date}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
