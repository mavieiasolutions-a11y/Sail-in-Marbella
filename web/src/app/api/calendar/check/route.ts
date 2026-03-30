import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/calendar/check?date=2024-07-15&service=privado
 *
 * Checks Google Calendar for existing bookings on the requested date.
 * Returns { available: boolean, slots: string[] }
 *
 * To fully activate: set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY
 * in your .env.local file, and replace CALENDAR_ID with your calendar's ID.
 */

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const service = searchParams.get('service');

    if (!date) {
        return NextResponse.json({ error: 'date parameter is required' }, { status: 400 });
    }

    // ── If Google API credentials are configured, perform a real check ──
    if (process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
        try {
            const { google } = await import('googleapis');

            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
            });

            const calendar = google.calendar({ version: 'v3', auth });

            const timeMin = new Date(`${date}T00:00:00`).toISOString();
            const timeMax = new Date(`${date}T23:59:59`).toISOString();

            const events = await calendar.events.list({
                calendarId: CALENDAR_ID,
                timeMin,
                timeMax,
                singleEvents: true,
                orderBy: 'startTime',
            });

            const bookedSlots: string[] = (events.data.items ?? [])
                .filter((e) => e.status !== 'cancelled')
                .map((e) => e.start?.dateTime ?? e.start?.date ?? '');

            // Determine if the full day is blocked (e.g., a charter is 8h)
            const available = bookedSlots.length === 0;

            return NextResponse.json({ available, bookedSlots, source: 'google' });
        } catch (err) {
            console.error('[Calendar API Error]', err);
            // Fall through to mock response on error so the form still works
        }
    }

    // ── Mock response when credentials are not configured yet ──
    // You can customize this to block specific test dates
    const testBlockedDates = ['2024-07-20', '2024-07-25'];
    const available = !testBlockedDates.includes(date);

    return NextResponse.json({
        available,
        bookedSlots: available ? [] : [`${date}T10:00:00`, `${date}T16:00:00`],
        source: 'mock',
        note: 'Configure GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local to use live data',
    });
}

/**
 * POST /api/calendar/check
 * Creates a Google Calendar event after a booking is confirmed.
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { date, startTime, service, customerName, customerEmail } = body;

    if (!date || !startTime || !customerName) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
        try {
            const { google } = await import('googleapis');

            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/calendar'],
            });

            const calendar = google.calendar({ version: 'v3', auth });

            const SERVICE_DURATIONS: Record<string, number> = {
                sunset: 2,
                grupal: 4,
                privado: 8,
            };
            const durationHours = SERVICE_DURATIONS[service] ?? 4;

            const startDateTime = new Date(`${date}T${startTime}`);
            const endDateTime = new Date(startDateTime.getTime() + durationHours * 60 * 60 * 1000);

            const event = await calendar.events.insert({
                calendarId: CALENDAR_ID,
                requestBody: {
                    summary: `⛵ ${service.toUpperCase()} — ${customerName}`,
                    description: `Reserva SailInMarbella\nCliente: ${customerName}\nEmail: ${customerEmail}\nServicio: ${service}`,
                    start: { dateTime: startDateTime.toISOString(), timeZone: 'Europe/Madrid' },
                    end: { dateTime: endDateTime.toISOString(), timeZone: 'Europe/Madrid' },
                    colorId: '9', // Teal / Cyan in Google Calendar
                },
            });

            return NextResponse.json({ success: true, eventId: event.data.id, source: 'google' });
        } catch (err) {
            console.error('[Calendar Create Error]', err);
            return NextResponse.json({ success: false, error: 'Google Calendar error' }, { status: 500 });
        }
    }

    // Mock response
    return NextResponse.json({
        success: true,
        eventId: `mock_event_${Date.now()}`,
        source: 'mock',
    });
}
