'use client';

import React, { useState } from 'react';

// Tipos de Servicios permitidos
type ServiceType = 'Sunset' | 'Grupal' | 'Privado';

export default function BookingWidget() {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [service, setService] = useState<ServiceType>('Privado');
  const [loading, setLoading] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Estética Old Money: Blanco crema #F9F9F9, Azul Marino #1B263B, Dorado #C5A059 (Gold mate)
  const services = [
    { id: 'Sunset', name: 'Sunset Cruise', price: 'Desde 450€', duration: '2h' },
    { id: 'Grupal', name: 'Experiencia Grupal', price: 'Desde 800€', duration: '4h' },
    { id: 'Privado', name: 'Charter Privado', price: 'Desde 1500€', duration: '8h' }
  ];

  const handleValidation = async () => {
    setLoading(true);
    // Simulación de validación contra Google Calendar API en el servidor Next.js (/api/calendar/check)
    setTimeout(() => {
      setLoading(false);
      alert('Disponibilidad confirmada en Calendar ✅. Redirigiendo a pago seguro (Stripe)...');
    }, 1500);
  };

  const attemptAdminUnlock = () => {
    if (adminPassword === 'Flaviño2026*') {
      setAdminMode(true);
      alert('Modo Admin Activado: Ahora puedes gestionar las imágenes del sitio.');
    } else {
      alert('Contraseña incorrecta');
    }
    setAdminPassword('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#F9F9F9] rounded-2xl shadow-2xl p-6 border border-[#E5E5E5] font-sans text-[#1B263B] relative overflow-hidden">
      {/* Fondo con leve textura elegante */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1B263B] via-[#C5A059] to-[#1B263B]"></div>
      
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-8 mt-2">
        <h2 className="text-2xl font-bold font-serif tracking-tight"> {/* Estilo Playfair Display aplicable en tailwind.config */}
          Tu Travesía
        </h2>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-widest">Reserva</p>
          <div className="w-8 h-[1px] bg-[#C5A059] ml-auto my-1"></div>
        </div>
      </div>

      {/* Selector Airbnb-Style */}
      <div className="flex flex-col gap-5">
        
        {/* Date & Time Row */}
        <div className="grid grid-cols-2 shadow-sm border border-[#1B263B]/10 rounded-xl overflow-hidden bg-white">
          <div className="p-3 border-r border-[#1B263B]/10 hover:bg-gray-50 transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-gray-500">
              Fecha de Embarque
            </label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm font-medium bg-transparent outline-none cursor-pointer" 
            />
          </div>
          <div className="p-3 hover:bg-gray-50 transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-gray-500">
              Hora
            </label>
            <input 
              type="time" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-sm font-medium bg-transparent outline-none cursor-pointer" 
            />
          </div>
        </div>

        {/* Service Selector */}
        <div className="border border-[#1B263B]/10 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="p-4">
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-3 text-gray-500">
              Nuestros Servicios
            </label>
            <div className="flex flex-col gap-2">
              {services.map((s) => (
                <label 
                  key={s.id} 
                  className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                    service === s.id 
                    ? 'bg-[#1B263B]/5 border-[#C5A059]' 
                    : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="service" 
                      value={s.id} 
                      checked={service === s.id}
                      onChange={() => setService(s.id as ServiceType)}
                      className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-semibold">{s.name}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-xs text-gray-500 font-medium">{s.duration}</span>
                    <span className="text-xs font-bold text-[#C5A059]">{s.price}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Button Checkout */}
      <button 
        onClick={handleValidation}
        disabled={loading || !date || !time}
        className="w-full mt-8 bg-[#1B263B] hover:bg-[#151D2C] text-white py-4 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-md hover:shadow-lg"
      >
        {loading ? (
          <span className="animate-pulse flex items-center gap-2">
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Validando en Calendar...
          </span>
        ) : (
          'Reservar Ahora'
        )}
      </button>

      {/* ADMIN MODE - Hidden utility */}
      {!adminMode && (
        <div className="mt-8 pt-4 flex flex-col items-center">
          <details className="text-center group cursor-pointer marker:content-['']">
            <summary className="text-[10px] text-gray-300 opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest outline-none">
              Configuración Web
            </summary>
            <div className="mt-3 flex gap-2 w-full animate-fade-in">
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && attemptAdminUnlock()}
                className="flex-1 text-xs px-3 py-2 border rounded-md outline-none focus:border-[#C5A059] text-center"
              />
              <button 
                onClick={attemptAdminUnlock} 
                className="bg-[#C5A059] text-white text-xs px-4 rounded-md font-bold hover:bg-[#b5924f] transition-colors"
              >
                Acceder
              </button>
            </div>
          </details>
        </div>
      )}

      {/* Admin Panel Activo */}
      {adminMode && (
        <div className="mt-6 p-4 bg-white border border-[#C5A059] rounded-xl shadow-inner animate-fade-in relative">
          <button 
            onClick={() => setAdminMode(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-black"
          >
            ✕
          </button>
          <h3 className="text-[#1B263B] font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
             <span className="text-[#C5A059]">✦</span> Modo Edición Activo
          </h3>
          <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
            Has desbloqueado el panel de configuración local. Puedes modificar el hero de fondo y las imágenes de galería.
          </p>
          <div className="flex flex-col gap-2">
            <button className="w-full text-xs bg-gray-50 border border-gray-200 text-[#1B263B] py-2 rounded font-medium hover:border-[#C5A059] transition-colors">
              Cambiar Video de Fondo
            </button>
            <button className="w-full text-xs bg-gray-50 border border-gray-200 text-[#1B263B] py-2 rounded font-medium hover:border-[#C5A059] transition-colors">
              Actualizar Galería
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
