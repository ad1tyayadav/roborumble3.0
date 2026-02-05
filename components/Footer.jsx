"use client"

import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
    const exploreLinks = [
        { name: 'HOME', href: '/' },
        { name: 'EVENTS', href: '/events' },
        { name: 'SCHEDULE', href: '/schedule' },
        { name: 'GALLERY', href: '/gallery' },
        { name: 'REGISTER', href: '/register' },
    ]

    const festivalLinks = [
        { name: 'SPONSORS', href: '/sponsors' },
        { name: 'SCHEDULE', href: '/schedule' },
    ]

    const socialLinks = [
        { icon: <FaInstagram size={18} />, href: '#' },
        { icon: <FaLinkedinIn size={18} />, href: '#' },
    ]

    return (
        <footer className="relative w-full bg-[#020617] border-t border-white/5 pt-16 pb-8 px-4 md:px-12 lg:px-24 overflow-hidden">
            {/* Background Grid/Glow Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-[#00FF9E]/50 via-transparent to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-[#00FF9E]/50 via-transparent to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
                
                {/* Brand Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter font-orbitron text-white">
                            ROBO <br />
                            <span className="text-[#00FF9E] drop-shadow-[0_0_10px_rgba(0,255,158,0.5)]">RUMBLE '26</span>
                        </h2>
                        <p className="text-xs tracking-[0.2em] font-orbitron text-white/60 mt-2 uppercase">UIET TECHFEST CSJMU</p>
                    </div>
                    
                    <div className="space-y-2">
                        <p className="text-[#00FF9E] font-orbitron text-sm font-bold tracking-widest uppercase">BUILD COMPLETE</p>
                        <p className="text-[#00FF9E] font-orbitron text-sm font-bold tracking-widest uppercase">DOMINATE</p>
                    </div>

                    <p className="text-sm text-white/40 leading-relaxed max-w-xs italic">
                        "Engineering the future, one circuit at a time. Join us in the ultimate battle of wits and machines where innovation meets destiny."
                    </p>
                </div>

                {/* Explore Links */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-[#00FF9E] rounded-full shadow-[0_0_10px_#00FF9E]"></div>
                        <h3 className="text-lg font-orbitron font-bold tracking-[0.1em] text-white">EXPLORE</h3>
                    </div>
                    <ul className="space-y-4">
                        {exploreLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm font-orbitron text-white/50 hover:text-[#00FF9E] transition-colors duration-300 tracking-wider">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Festival Links */}
                <div>
                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-[#00FF9E] rounded-full shadow-[0_0_10px_#00FF9E]"></div>
                        <h3 className="text-lg font-orbitron font-bold tracking-[0.1em] text-white">FESTIVAL</h3>
                    </div>
                    <ul className="space-y-4">
                        {festivalLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm font-orbitron text-white/50 hover:text-[#00FF9E] transition-colors duration-300 tracking-wider">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-6 bg-[#00FF9E] rounded-full shadow-[0_0_10px_#00FF9E]"></div>
                        <h3 className="text-lg font-orbitron font-bold tracking-[0.1em] text-white">CONTACT</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 group">
                            <FaEnvelope className="text-[#00FF9E] shrink-0" />
                            <a href="mailto:contact@roborumble.com" className="text-sm text-white/50 hover:text-white transition-colors tracking-wide">
                                contact@roborumble.com
                            </a>
                        </div>
                        <div className="flex items-center gap-4 group">
                            <FaPhoneAlt className="text-[#00FF9E] shrink-0" />
                            <span className="text-sm text-white/50 tracking-wide font-orbitron">+91 98765 43210</span>
                        </div>
                        <div className="flex items-start gap-4 group">
                            <FaMapMarkerAlt className="text-[#00FF9E] mt-1 shrink-0" />
                            <span className="text-sm text-white/50 leading-relaxed tracking-wide">
                                UIET, CSJM University,<br />
                                Kanpur, Uttar Pradesh
                            </span>
                        </div>

                        <div className="pt-4">
                            <p className="text-xs font-orbitron font-bold tracking-[0.3em] text-white/40 mb-4">FOLLOW US</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social, i) => (
                                    <Link key={i} href={social.href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00FF9E] hover:border-[#00FF9E] hover:bg-[#00FF9E]/5 transition-all duration-300">
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <p className="text-[10px] tracking-[0.2em] font-orbitron text-white/30 uppercase">
                    © 2026 ROBO RUMBLE. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="text-[10px] tracking-[0.2em] font-orbitron text-white/30 hover:text-white uppercase transition-colors">
                        PRIVACY POLICY
                    </Link>
                    <Link href="/terms" className="text-[10px] tracking-[0.2em] font-orbitron text-white/30 hover:text-white uppercase transition-colors">
                        TERMS & CONDITIONS
                    </Link>
                </div>
            </div>

            {/* Glowing Hexagon in background (based on image) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#00FF9E]/10 rounded-full blur-3xl"></div>
        </footer>
    )
}

export default Footer
