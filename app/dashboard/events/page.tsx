"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Users, Shield, Zap, Cpu, Bot, Gamepad2, Mic, Rocket, Magnet, CheckCircle, Clock, Loader2, IndianRupee } from "lucide-react";
import { BiFootball } from "react-icons/bi";
import { useAudio } from "@/app/hooks/useAudio";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface EventData {
    eventId: string;
    title: string;
    category: string;
    description: string;
    teamSize: string;
    prize: string;
    fees: number;
    image?: string;
    rules: string[];
    currentRegistrations: number;
    maxRegistrations?: number;
}

interface RegistrationStatus {
    eventId: string;
    status: "registered" | "paid" | "pending";
}

// --- Icons Mapping ---
const getEventIcon = (category: string, eventId: string) => {
    // Specific overrides based on ID or fallback to category
    if (eventId.includes("soccer")) return BiFootball;
    if (category === "Robotics") {
        if (eventId.includes("war")) return Shield;
        if (eventId.includes("line")) return Zap;
        if (eventId.includes("race")) return Bot;
        if (eventId.includes("pick")) return Magnet;
        return Bot;
    }
    if (category === "Aerial") return Cpu;
    if (category === "Gaming") return Gamepad2;
    if (category === "Innovation") return Users;
    if (category === "Seminar") return Mic;
    if (category === "Exhibition") return Rocket;
    return Trophy;
};

// --- Internal Component: Animated Backgrounds ---
const CardBackground = ({ category, image }: { category: string; image?: string }) => {
    // Priority: Image Background
    if (image) {
        return (
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src={image}
                    alt={category}
                    fill
                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
        );
    }

    // Category-based fallbacks (same as public page)
    if (category === 'Robotics') {
        return (
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F0FF_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-scroll"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            </div>
        );
    }
    if (category === 'Gaming') {
        return (
            <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 animate-noise"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E661FF]/20 to-[#00F0FF]/20 mix-blend-overlay"></div>
            </div>
        );
    }
    // ... other categories can be added similarly

    return <div className="absolute inset-0 z-0 bg-zinc-900/50"></div>;
};

// --- Internal Component: EventCard ---
const EventCard = ({
    event,
    registration,
    onRegister
}: {
    event: EventData;
    registration?: RegistrationStatus;
    onRegister: (eventId: string, cost: number) => void
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'about' | 'rules' | 'register'>('about');

    // Audio hooks - make sure these files exist or handle errors
    const playOpenSound = useAudio('/audio.wav', 0.1);
    const playCloseSound = useAudio('/audio.wav', 0.1);

    const isRegistered = !!registration;
    const isPaid = registration?.status === "paid";
    const Icon = getEventIcon(event.category, event.eventId);

    const handleOpen = () => {
        setActiveTab('about');
        setIsHovered(true);
        setIsLoading(true);
        try { playOpenSound(); } catch (e) { }
        setTimeout(() => {
            setIsLoading(false);
            setShowDetails(true);
        }, 600);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        try { playCloseSound(); } catch (e) { }
        setShowDetails(false);
        setIsHovered(false);
        setIsLoading(false);
    };

    return (
        <>
            <div className="relative group cursor-crosshair h-full min-h-[400px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleOpen}>
                {/* Main Preview Card */}
                <div
                    className="relative p-8 border-l-4 border-t border-[#00F0FF]/30 transition-all duration-500 overflow-hidden h-full flex flex-col justify-between bg-black/80 backdrop-blur-md"
                    style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}
                >
                    <CardBackground category={event.category} image={event.image} />
                    <div className={`absolute inset-0 bg-[#00F0FF]/10 z-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 border border-[#00F0FF]/40 flex items-center justify-center bg-black/50 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-sm">
                                <Icon size={24} />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[#00F0FF] font-mono text-[10px] opacity-70 tracking-widest uppercase bg-black/50 px-2 py-1">
                                    [{event.category}]
                                </span>
                                {isPaid ? (
                                    <span className="text-green-400 font-mono text-[10px] bg-green-900/50 px-2 py-1 flex items-center gap-1 border border-green-500/50">
                                        <CheckCircle size={10} /> REGISTERED
                                    </span>
                                ) : isRegistered ? (
                                    <span className="text-yellow-400 font-mono text-[10px] bg-yellow-900/50 px-2 py-1 flex items-center gap-1 border border-yellow-500/50">
                                        <Clock size={10} /> PENDING
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-3 font-mono tracking-tighter uppercase group-hover:text-[#00F0FF] transition-colors drop-shadow-md">
                            {event.title}
                        </h3>

                        <p className="text-gray-400 font-mono text-xs leading-relaxed uppercase mb-6 line-clamp-2 drop-shadow-sm">
                            {event.description}
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
                            <span className="text-[#00F0FF] font-mono text-xs font-bold drop-shadow-md">{event.prize}</span>
                            <span className="text-white font-mono text-[9px] opacity-60 group-hover:opacity-100 transition-opacity underline">VIEW_SPECS</span>
                        </div>
                    </div>

                    {isHovered && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent h-[20%] w-full animate-scan pointer-events-none z-20" />}
                </div>
            </div>

            {/* FULL SCREEN MISSION BRIEFING DIALOG */}
            {(isLoading || showDetails) && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4 lg:p-12 pointer-events-none">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

                    <div
                        className="relative w-full max-w-sm md:max-w-3xl lg:max-w-5xl bg-[#050505] border border-[#FF003C] p-1 shadow-[0_0_80px_rgba(255,0,60,0.4)] pointer-events-auto overflow-hidden animate-glitch-entry"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Status Bar */}
                        <div className="bg-[#FF003C] text-black px-3 md:px-6 py-2 flex justify-between items-center font-mono text-[9px] md:text-[11px] font-black uppercase tracking-widest">
                            <div className="flex gap-2 md:gap-4">
                                <span className="animate-pulse">● MISSION_INTEL: {event.eventId.toUpperCase()}</span>
                            </div>
                            <button onClick={handleClose} className="hover:bg-black hover:text-[#FF003C] px-2 md:px-4 py-1 transition-all border border-black font-bold text-[8px] md:text-[11px]">
                                [ CLOSE ]
                            </button>
                        </div>

                        <div className="p-4 md:p-8 lg:p-16 max-h-[85vh] overflow-y-auto">
                            {isLoading ? (
                                <div className="h-[450px] flex flex-col items-center justify-center space-y-6">
                                    <div className="w-1 bg-[#FF003C] h-24 animate-pulse" />
                                    <p className="text-[#FF003C] font-mono text-xl animate-pulse tracking-[0.7em] font-black uppercase">Retrieving Data...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-8 h-full">
                                    {/* Left Side: Navigation & Quick Stats */}
                                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                                        <div className="aspect-video bg-zinc-950 border border-[#FF003C]/30 relative flex items-center justify-center p-6 overflow-hidden">
                                            {event.image ? (
                                                <Image src={event.image} alt={event.title} fill className="object-cover opacity-80" />
                                            ) : (
                                                <Icon size={60} className="text-[#FF003C] opacity-80 relative z-10" />
                                            )}
                                            <div className="absolute inset-0 border-[20px] border-transparent border-t-[#FF003C]/5 border-l-[#FF003C]/5 z-20" />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => setActiveTab('about')} className={`px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider border-l-2 transition-all ${activeTab === 'about' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'}`}>// About_Event</button>
                                            <button onClick={() => setActiveTab('rules')} className={`px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider border-l-2 transition-all ${activeTab === 'rules' ? 'border-[#FF003C] bg-[#FF003C]/10 text-[#FF003C]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'}`}>// Rules_&_Regs</button>
                                            <button onClick={() => setActiveTab('register')} className={`px-4 py-3 text-left font-mono text-xs font-bold uppercase tracking-wider border-l-2 transition-all ${activeTab === 'register' ? 'border-[#E661FF] bg-[#E661FF]/10 text-[#E661FF]' : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'}`}>// Register_Combat</button>
                                        </div>
                                    </div>

                                    {/* Right Side: Dynamic Content */}
                                    <div className="w-full md:w-2/3 bg-white/5 border border-white/10 p-6 md:p-8 min-h-[300px] relative overflow-y-auto">
                                        {/* About Tab */}
                                        {activeTab === 'about' && (
                                            <div className="space-y-6 animate-glitch-entry">
                                                <h4 className="text-3xl font-black text-white font-mono uppercase tracking-tighter loading-none">{event.title}</h4>
                                                <div className="h-1 w-20 bg-[#00F0FF]" />
                                                <p className="text-zinc-400 font-mono text-sm leading-relaxed">{event.description}</p>
                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    <div className="p-3 border border-[#00F0FF]/20 bg-[#00F0FF]/5">
                                                        <p className="text-zinc-500 text-[10px] uppercase mb-1">Squad Size</p>
                                                        <p className="text-[#00F0FF] font-bold font-mono text-sm">{event.teamSize}</p>
                                                    </div>
                                                    <div className="p-3 border border-[#00F0FF]/20 bg-[#00F0FF]/5">
                                                        <p className="text-zinc-500 text-[10px] uppercase mb-1">Bounty</p>
                                                        <p className="text-[#00F0FF] font-bold font-mono text-sm">{event.prize}</p>
                                                    </div>
                                                    <div className="p-3 border border-[#00F0FF]/20 bg-[#00F0FF]/5">
                                                        <p className="text-zinc-500 text-[10px] uppercase mb-1">Fee</p>
                                                        <p className="text-[#00F0FF] font-bold font-mono text-sm">{event.fees === 0 ? "FREE" : `₹${event.fees}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Rules Tab */}
                                        {activeTab === 'rules' && (
                                            <div className="space-y-6 animate-glitch-entry">
                                                <h4 className="text-2xl font-black text-[#FF003C] font-mono uppercase tracking-tight flex items-center gap-3"><Shield size={24} /> Engagement_Protocol</h4>
                                                <div className="space-y-3 h-full">
                                                    {event.rules?.map((rule, i) => (
                                                        <div key={i} className="flex gap-4 p-3 bg-black/40 border-l border-[#FF003C]/30 hover:bg-[#FF003C]/5 transition-colors">
                                                            <span className="text-[#FF003C] font-mono font-bold text-xs">0{i + 1}.</span>
                                                            <p className="text-zinc-300 font-mono text-xs leading-relaxed">{rule}</p>
                                                        </div>
                                                    ))}
                                                    {!event.rules?.length && <p className="text-zinc-500 font-mono">No specific rules data available.</p>}
                                                </div>
                                            </div>
                                        )}

                                        {/* Register Tab */}
                                        {activeTab === 'register' && (
                                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-glitch-entry py-8">
                                                <Rocket size={48} className="text-[#E661FF] animate-bounce" />
                                                <div>
                                                    <h4 className="text-2xl font-black text-white font-mono uppercase mb-2">Ready for Deployment?</h4>
                                                    <p className="text-zinc-400 font-mono text-xs max-w-xs mx-auto">Initialize your squad registration sequence. Slots are filling up fast.</p>
                                                </div>

                                                {isPaid ? (
                                                    <button disabled className="w-full max-w-xs py-4 bg-green-600/20 border border-green-500 text-green-500 font-black font-mono tracking-widest transition-colors uppercase text-sm flex items-center justify-center gap-2 cursor-default" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}>
                                                        <Shield size={16} /> ALREADY_REGISTERED
                                                    </button>
                                                ) : isRegistered && event.fees > 0 ? (
                                                    <button
                                                        onClick={() => onRegister(event.eventId, event.fees)}
                                                        className="w-full max-w-xs py-4 bg-yellow-600/20 border border-yellow-500 text-yellow-500 font-black font-mono tracking-widest hover:bg-yellow-600/30 transition-colors uppercase text-sm flex items-center justify-center gap-2"
                                                        style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}
                                                    >
                                                        <IndianRupee size={16} /> PAY ₹{event.fees}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => onRegister(event.eventId, event.fees)}
                                                        className="w-full max-w-xs py-4 bg-[#E661FF] text-black font-black font-mono tracking-widest hover:bg-white transition-colors uppercase text-sm flex items-center justify-center gap-2"
                                                        style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}
                                                    >
                                                        <Zap size={16} /> {event.fees === 0 ? "REGISTER FREE" : "REGISTER_NOW"}
                                                    </button>
                                                )}

                                                <p className="text-[10px] text-zinc-600 font-mono mt-4">
                                                    By registering, you accept all protocols and rules.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default function DashboardEventsPage() {
    const { user } = useUser();
    const [events, setEvents] = useState<EventData[]>([]);
    const [registeredEvents, setRegisteredEvents] = useState<RegistrationStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState<string | null>(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchEvents();
        if (user?.id) {
            fetchRegistrationStatus();
        }
    }, [user?.id]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    async function fetchEvents() {
        try {
            const res = await fetch("/api/events");
            if (res.ok) {
                const data = await res.json();
                setEvents(data.events || []);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchRegistrationStatus() {
        try {
            const res = await fetch("/api/profile/status");
            if (res.ok) {
                const data = await res.json();
                const userEvents = data.registeredEvents || [];
                const paidEvents = data.paidEvents || [];

                const statuses: RegistrationStatus[] = userEvents.map((eventId: string) => ({
                    eventId,
                    status: paidEvents.includes(eventId) ? "paid" : "registered"
                }));
                setRegisteredEvents(statuses);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    function getRegistrationStatus(eventId: string): RegistrationStatus | undefined {
        return registeredEvents.find(r => r.eventId === eventId);
    }

    async function handleRegister(eventId: string, cost: number) {
        if (!user?.id) return;
        setRegistering(eventId);
        setMessage({ type: "", text: "" });

        try {
            const registerRes = await fetch("/api/events/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId }),
            });

            if (!registerRes.ok) {
                const data = await registerRes.json();
                throw new Error(data.error || data.message || "Registration failed");
            }

            if (cost === 0) {
                setMessage({ type: "success", text: "Successfully registered for free event!" });
                await fetchRegistrationStatus();
                // Close modal implicitly via props update or force refresh
                return;
            }

            const orderRes = await fetch("/api/payments/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clerkId: user.id, eventId }),
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                throw new Error(orderData.message || "Failed to create payment order");
            }

            if (orderData.isFree) {
                setMessage({ type: "success", text: "Successfully registered!" });
                await fetchRegistrationStatus();
                return;
            }

            const options = {
                key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency || "INR",
                name: "Robo Rumble",
                description: `Registration for ${orderData.eventTitle || eventId}`,
                order_id: orderData.orderId,
                handler: async function (response: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) {
                    const verifyRes = await fetch("/api/payments/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...response, eventId }),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyRes.ok) {
                        setMessage({ type: "success", text: "Payment successful! You are registered." });
                        await fetchRegistrationStatus();
                    } else {
                        setMessage({ type: "error", text: verifyData.message || "Payment verification failed" });
                    }
                },
                prefill: {
                    name: user.fullName || "",
                    email: user.emailAddresses?.[0]?.emailAddress || "",
                },
                theme: {
                    color: "#06b6d4",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (e) {
            console.error(e);
            setMessage({ type: "error", text: e instanceof Error ? e.message : "Something went wrong" });
        } finally {
            setRegistering(null);
        }
    }

    if (loading) return <div className="text-white flex justify-center items-center h-64"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-7xl mx-auto py-8">
            <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3 font-mono">
                <Trophy className="text-[#00F0FF]" size={40} /> AVAILABLE_MISSIONS
            </h1>
            <p className="text-gray-400 mb-8 max-w-2xl font-mono text-sm border-l-2 border-[#00F0FF] pl-4">
                Select a mission to view details and initialize registration.
            </p>

            {message.text && (
                <div className={`px-4 py-3 rounded-none mb-6 border-l-4 font-mono text-sm ${message.type === "success"
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : "bg-red-500/10 border-red-500 text-red-400"
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Overloading screen if registering */}
            {registering && (
                <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin text-[#00F0FF]" size={48} />
                        <p className="text-[#00F0FF] font-mono mt-4 animate-pulse">TRANSMITTING_DATA...</p>
                    </div>
                </div>
            )}

            {events.length === 0 ? (
                <div className="text-center text-gray-400 py-12 font-mono">
                    NO_ACTIVE_MISSIONS_DETECTED
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div key={event.eventId} className="h-full">
                            <EventCard
                                event={event}
                                registration={getRegistrationStatus(event.eventId)}
                                onRegister={handleRegister}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Global Styles for Animations */}
            <style jsx global>{`
                @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
                .animate-scan { position: absolute; animation: scan 2s linear infinite; }
                
                @keyframes glitch-entry {
                    0% { opacity: 0; transform: scale(0.97) skewX(-4deg); filter: brightness(2); }
                    50% { opacity: 1; transform: scale(1.03) skewX(2deg); filter: brightness(1.2); }
                    100% { transform: scale(1) skewX(0); filter: brightness(1); }
                }
                .animate-glitch-entry { animation: glitch-entry 0.4s ease-out forwards; }
                
                @keyframes grid-scroll {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                }
                .animate-grid-scroll { animation: grid-scroll 2s linear infinite; }
                
                @keyframes wind-flow {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(-20px) rotate(5deg); opacity: 0.2; }
                }
                .animate-wind-flow { animation: wind-flow 10s ease-in-out infinite alternate; }

                @keyframes noise { 0% { transform: translate(0,0); } 100% { transform: translate(5%,0); } }
                .animate-noise { animation: noise 2s steps(10) infinite; }
            `}</style>
        </div>
    );
}
