import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import Stripe from 'stripe';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2026-03-25.dahlia',
});

const PRICES: Record<string, { deposit: number; total: number; name: string }> = {
    sunset: { deposit: 135, total: 450, name: 'Sunset Cruise (2h)' },
    grupal: { deposit: 240, total: 800, name: 'Experiencia Grupal (4h)' },
    privado: { deposit: 450, total: 1500, name: 'Charter Privado (8h)' },
};

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { service, date, time, customerName, customerEmail, paymentType = 'deposit' } = body;

    if (!service || !date || !customerEmail) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const priceInfo = PRICES[service] ?? PRICES.grupal;
    const amountCents =
        paymentType === 'full'
            ? priceInfo.total * 100
            : priceInfo.deposit * 100;

    const label = paymentType === 'full' ? 'Pago Total' : 'Depósito (30%)';

    try {
        const session = await getStripe().checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: customerEmail,
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `${priceInfo.name} — ${label}`,
                            description: `Reserva para ${customerName} · ${date} a las ${time}`,
                            images: ['https://sailinmarbella.com/images/og-image.jpg'],
                        },
                        unit_amount: amountCents,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                service,
                date,
                time,
                customerName,
                paymentType,
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/reserva/confirmada?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#booking`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('[Stripe error]', err);
        return NextResponse.json({ error: 'Stripe checkout session failed' }, { status: 500 });
    }
}
