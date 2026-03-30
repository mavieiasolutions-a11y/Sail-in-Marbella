-- schema.sql
-- Estructura Base de Datos para SailInMarbella en Supabase
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 1. Tabla de Veleros (Inventario)
CREATE TABLE IF NOT EXISTS boats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    cleaning_status TEXT DEFAULT 'clean' CHECK (
        cleaning_status IN (
            'clean',
            'needs_cleaning',
            'cleaning_in_progress'
        )
    ),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 2. Tabla de Servicios Disponibles (Sunset, Grupal, Privado)
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2) NOT NULL,
    duration_hours INT NOT NULL
);
-- 3. Tabla de Reservas 
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    boat_id UUID REFERENCES boats(id),
    service_id UUID REFERENCES services(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (
        status IN ('pending', 'confirmed', 'cancelled', 'completed')
    ),
    google_calendar_event_id TEXT,
    -- FK hacia Google Calendar API
    stripe_payment_intent_id TEXT,
    -- FK hacia Stripe Payment Intent
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 4. Manifiesto de Pasajeros por Reserva (Para normativa portuaria)
CREATE TABLE IF NOT EXISTS passenger_manifests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    nationality TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- (Las políticas de Row Level Security (RLS) pueden configurarse después de integrar Auth)