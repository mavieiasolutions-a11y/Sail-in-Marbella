import { Toaster } from 'react-hot-toast';
import CalendarPanel from './components/CalendarPanel';
import BoatStatusPanel from './components/BoatStatusPanel';
import MetricsPanel from './components/MetricsPanel';
import ManifestPanel from './components/ManifestPanel';

function App() {
  return (
    <div className="min-h-screen text-[#e0e0e0]" style={{ background: 'var(--dark)' }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(14,22,32,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#1B263B] border border-[#C5A059] flex items-center justify-center font-serif text-[#C5A059] font-bold">
            S
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-wide text-white leading-none">
              SAIL<span style={{ color: 'var(--gold)' }}>IN</span>MARBELLA
            </h1>
            <p className="text-[0.6rem] uppercase tracking-widest text-[#7A8090] mt-1">Dashboard Patrón</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-green-500">Sistema Online</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1B263B] border border-[#7A8090]/30 flex items-center justify-center text-xs font-bold">
            P
          </div>
        </div>
      </nav>

      {/* Main Grid */}
      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (Calendar & Booking Management) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <CalendarPanel />
        </div>

        {/* Right Column (Metrics & Fleet) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <MetricsPanel />
          <BoatStatusPanel />
        </div>

        {/* Bottom Full Row (Manifest) */}
        <div className="xl:col-span-12">
          <ManifestPanel />
        </div>
      </main>

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#141E2C',
            color: '#fff',
            border: '1px solid rgba(197,160,89,0.3)',
            fontSize: '0.85rem',
          },
        }}
      />
    </div>
  );
}

export default App;
