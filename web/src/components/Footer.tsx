export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            id="footer"
            className="py-16 px-5 md:px-12"
            style={{ background: '#0E1620', color: 'rgba(255,255,255,0.6)' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <p
                            className="text-white font-serif text-xl tracking-widest mb-3"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            SAIL<span style={{ color: 'var(--gold)' }}>IN</span>MARBELLA
                        </p>
                        <p className="text-xs leading-relaxed">
                            Charters náuticos de lujo desde Puerto Banús, Marbella.
                            Vivir el Mediterráneo como nunca antes.
                        </p>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Servicios</h4>
                        <ul className="flex flex-col gap-2 text-xs">
                            {['Sunset Cruise (2h)', 'Experiencia Grupal (4h)', 'Charter Privado (8h)', 'Eventos & Celebraciones'].map(s => (
                                <li key={s}><a href="#services" className="hover:text-[#C5A059] transition-colors">{s}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Contacto</h4>
                        <ul className="flex flex-col gap-2 text-xs">
                            <li>📍 Puerto Banús, Marbella, España</li>
                            <li>
                                <a href="tel:+34600000000" className="hover:text-[#C5A059] transition-colors">
                                    📞 +34 600 000 000
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@sailinmarbella.com" className="hover:text-[#C5A059] transition-colors">
                                    ✉️ info@sailinmarbella.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Legal</h4>
                        <ul className="flex flex-col gap-2 text-xs">
                            {['Términos y Condiciones', 'Política de Privacidad', 'Política de Cancelación'].map(l => (
                                <li key={l}><a href="#" className="hover:text-[#C5A059] transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <p className="text-xs">
                        © {year} SailInMarbella · Todos los derechos reservados
                    </p>
                    <div className="flex gap-5">
                        {['Instagram', 'WhatsApp', 'TripAdvisor'].map(s => (
                            <a
                                key={s}
                                href="#"
                                className="text-[0.7rem] uppercase tracking-wider hover:text-[#C5A059] transition-colors"
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
