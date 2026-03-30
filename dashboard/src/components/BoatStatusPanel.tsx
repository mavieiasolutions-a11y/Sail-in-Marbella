import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type CleaningStatus = 'clean' | 'needs_cleaning' | 'cleaning_in_progress';

interface Boat {
    id: string;
    name: string;
    capacity: number;
    cleaning_status: CleaningStatus;
}

const STATUS_CONFIG: Record<CleaningStatus, { label: string; color: string; bg: string; icon: string }> = {
    clean: { label: 'Limpio', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', icon: '✓' },
    needs_cleaning: { label: 'Necesita Limpieza', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '!' },
    cleaning_in_progress: { label: 'En Limpieza', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', icon: '↻' },
};

export default function BoatStatusPanel() {
    const [boats, setBoats] = useState<Boat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('boats').select('*').then(({ data }) => {
            if (data) setBoats(data as Boat[]);
            setLoading(false);
        });
    }, []);

    const updateStatus = async (id: string, status: CleaningStatus) => {
        setBoats(prev => prev.map(b => b.id === id ? { ...b, cleaning_status: status } : b));
        await supabase.from('boats').update({ cleaning_status: status }).eq('id', id);
    };

    return (
        <div className="rounded-2xl p-5" style={{ background: '#141E2C', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="font-serif text-lg text-white mb-1">Estado de la Flota</h2>
            <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>Gestión de limpieza en tiempo real</p>

            {loading ? (
                <div className="flex items-center justify-center h-24">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
                </div>
            ) : boats.length === 0 ? (
                <p className="text-xs text-center py-8" style={{ color: 'var(--muted)' }}>
                    No hay barcos. Añade veleros en Supabase → tabla <code>boats</code>.
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {boats.map((boat) => {
                        const cfg = STATUS_CONFIG[boat.cleaning_status];
                        return (
                            <div
                                key={boat.id}
                                className="flex items-center justify-between p-4 rounded-xl"
                                style={{ background: 'rgba(27,38,59,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{ background: cfg.bg, color: cfg.color }}
                                    >
                                        {cfg.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{boat.name}</p>
                                        <p className="text-[0.65rem]" style={{ color: 'var(--muted)' }}>Cap. {boat.capacity} pasajeros</p>
                                    </div>
                                </div>

                                {/* Quick status toggle */}
                                <select
                                    value={boat.cleaning_status}
                                    onChange={(e) => updateStatus(boat.id, e.target.value as CleaningStatus)}
                                    className="text-[0.68rem] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg outline-none cursor-pointer"
                                    style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}
                                >
                                    <option value="clean">✓ Limpio</option>
                                    <option value="needs_cleaning">! Necesita Limpieza</option>
                                    <option value="cleaning_in_progress">↻ En Proceso</option>
                                </select>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
