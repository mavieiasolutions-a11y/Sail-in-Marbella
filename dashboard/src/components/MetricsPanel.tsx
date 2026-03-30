import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '../lib/supabase';

interface MonthMetric {
    month: string;
    revenue: number;
    bookings: number;
}

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function MetricsPanel() {
    const [data, setData] = useState<MonthMetric[]>([]);
    const [totals, setTotals] = useState({ revenue: 0, bookings: 0, avg: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            const year = new Date().getFullYear();
            const { data: bookings, error } = await supabase
                .from('bookings')
                .select('booking_date, total_amount, status')
                .gte('booking_date', `${year}-01-01`)
                .lte('booking_date', `${year}-12-31`)
                .in('status', ['confirmed', 'completed']);

            if (!error && bookings) {
                const grouped: Record<number, MonthMetric> = {};
                bookings.forEach((b) => {
                    const m = new Date(b.booking_date).getMonth();
                    if (!grouped[m]) grouped[m] = { month: MONTHS_ES[m], revenue: 0, bookings: 0 };
                    grouped[m].revenue += b.total_amount ?? 0;
                    grouped[m].bookings += 1;
                });

                const chartData = Array.from({ length: 12 }, (_, i) =>
                    grouped[i] ?? { month: MONTHS_ES[i], revenue: 0, bookings: 0 }
                );
                setData(chartData);

                const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_amount ?? 0), 0);
                const count = bookings.length;
                setTotals({ revenue: totalRevenue, bookings: count, avg: count > 0 ? Math.round(totalRevenue / count) : 0 });
            }
            setLoading(false);
        };

        fetchMetrics();
    }, []);

    const KPICard = ({ label, value }: { label: string; value: string }) => (
        <div
            className="rounded-xl p-4 flex flex-col gap-1"
            style={{ background: 'rgba(27,38,59,0.5)', border: '1px solid rgba(197,160,89,0.15)' }}
        >
            <p className="text-[0.62rem] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{label}</p>
            <p className="text-xl font-serif font-bold text-white">{value}</p>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg px-3 py-2 text-xs" style={{ background: '#1B263B', border: '1px solid rgba(197,160,89,0.3)' }}>
                    <p className="font-bold text-white mb-1">{label}</p>
                    <p style={{ color: 'var(--gold)' }}>{payload[0].value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-2xl p-5" style={{ background: '#141E2C', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="font-serif text-lg text-white mb-1">Métricas de Ingresos</h2>
            <p className="text-xs mb-5" style={{ color: 'var(--muted)' }}>{new Date().getFullYear()} · Solo reservas confirmadas</p>

            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
                </div>
            ) : (
                <>
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        <KPICard label="Ingresos Totales" value={`${totals.revenue.toLocaleString('es-ES')}€`} />
                        <KPICard label="Reservas Activas" value={String(totals.bookings)} />
                        <KPICard label="Ticket Medio" value={`${totals.avg.toLocaleString('es-ES')}€`} />
                    </div>

                    {/* Bar chart */}
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={data} barSize={18}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: '#7A8090', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#7A8090', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}€`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(197,160,89,0.05)' }} />
                            <Bar dataKey="revenue" fill="var(--gold)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
}
