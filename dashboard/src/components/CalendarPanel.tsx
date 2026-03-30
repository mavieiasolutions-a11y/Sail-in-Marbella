import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface BookingEvent {
    id: string;
    title: string;
    start: string;
    end: string;
    color?: string;
    extendedProps?: { status: string; customerEmail: string };
}

const STATUS_COLORS: Record<string, string> = {
    pending: '#C5A059',
    confirmed: '#22c55e',
    cancelled: '#ef4444',
    completed: '#3b82f6',
};

export default function CalendarPanel() {
    const [events, setEvents] = useState<BookingEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bookings')
            .select('id, customer_name, booking_date, start_time, status, service_id')
            .neq('status', 'cancelled');

        if (!error && data) {
            const mapped: BookingEvent[] = data.map((b) => {
                const start = `${b.booking_date}T${b.start_time}`;
                return {
                    id: b.id,
                    title: `⛵ ${b.customer_name}`,
                    start,
                    end: start, // end time can be calculated once duration is joined
                    color: STATUS_COLORS[b.status] ?? '#C5A059',
                    extendedProps: { status: b.status, customerEmail: '' },
                };
            });
            setEvents(mapped);
        }
        setLoading(false);
    };

    useEffect(() => { fetchBookings(); }, []);

    const handleEventClick = ({ event }: { event: { id: string; title: string; extendedProps: Record<string, string> } }) => {
        const status = event.extendedProps.status;
        alert(`Reserva: ${event.title}\nEstado: ${status.toUpperCase()}`);
    };

    return (
        <div
            className="rounded-2xl p-5 h-full"
            style={{ background: '#141E2C', border: '1px solid rgba(255,255,255,0.06)' }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="font-serif text-lg text-white">Calendario de Reservas</h2>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Conectado a Google Calendar</p>
                </div>
                <button
                    onClick={fetchBookings}
                    className="text-[0.65rem] uppercase tracking-wider px-3 py-1.5 rounded-lg font-bold transition-colors"
                    style={{ background: 'var(--gold)', color: '#0E1620' }}
                >
                    Actualizar
                </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4">
                {Object.entries(STATUS_COLORS).map(([status, color]) => (
                    <div key={status} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        <span className="text-[0.65rem] uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{status}</span>
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
                </div>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek',
                    }}
                    locale="es"
                    events={events}
                    eventClick={handleEventClick}
                    height="auto"
                    dayMaxEvents={3}
                />
            )}
        </div>
    );
}
