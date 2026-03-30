export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            id="footer"
            className="py-24 bg-navy relative border-t border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="flex flex-col gap-6">
                        <p className="text-white font-serif text-2xl tracking-[0.1em] font-bold">
                            SAIL<span className="text-gold">IN</span>MARBELLA
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed font-medium">
                            La referencia absoluta en charters náuticos de lujo en Puerto Banús. 
                            Elevando la experiencia en el Mediterráneo desde 2024.
                        </p>
                        <div className="flex gap-4">
                            {['IG', 'WA', 'TA'].map(s => (
                                <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 hover:border-gold hover:text-gold transition-all duration-500">
                                    {s}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white text-[0.65rem] font-bold uppercase tracking-[0.3em] mb-8">Navegación</h4>
                        <ul className="flex flex-col gap-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40">
                            {['Experiencias', 'La Flota', 'Nosotros', 'Contacto'].map(s => (
                                <li key={s}>
                                    <a href={`#${s.toLowerCase()}`} className="hover:text-gold transition-colors duration-300">{s}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="text-white text-[0.65rem] font-bold uppercase tracking-[0.3em] mb-8">Concierge</h4>
                        <ul className="flex flex-col gap-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40">
                            <li className="flex flex-col">
                                <span className="text-[0.5rem] tracking-[0.3em] text-gold/50 mb-1">Ubicación</span>
                                📍 Puerto Banús, Marbella
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[0.5rem] tracking-[0.3em] text-gold/50 mb-1">Teléfono</span>
                                <a href="tel:+34600000000" className="hover:text-gold transition-colors">+34 600 000 000</a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[0.5rem] tracking-[0.3em] text-gold/50 mb-1">Email</span>
                                <a href="mailto:info@sailinmarbella.com" className="hover:text-gold transition-colors">info@sailinmarbella.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white text-[0.65rem] font-bold uppercase tracking-[0.3em] mb-8">Información</h4>
                        <ul className="flex flex-col gap-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40">
                            {['Aviso Legal', 'Cookies', 'Cancelaciones'].map(l => (
                                <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/20">
                        © {year} Sail In Marbella · Designed for the elite
                    </p>
                    <div className="flex gap-8 text-[0.5rem] font-bold uppercase tracking-[0.3em] text-white/20">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
