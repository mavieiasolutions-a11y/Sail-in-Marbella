'use client';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy selection:bg-gold selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <BookingSection />
      <Footer />
    </main>
  );
}
