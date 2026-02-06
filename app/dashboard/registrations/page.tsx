"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";

interface RegistrationData {
    _id: string;
    eventId: {
        title: string;
        fees: number;
    };
    teamId: {
        name: string;
    };
    paymentStatus: string;
    amountPaid?: number;
    createdAt: string;
}

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
    paid: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
    manual_verified: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
    initiated: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
    refunded: { icon: XCircle, color: "text-gray-400", bg: "bg-gray-500/10" },
};

export default function RegistrationsPage() {
    const { user } = useUser();
    const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Would fetch user's registrations
        setLoading(false);
    }, [user?.id]);

    if (loading) return <div className="text-white">Loading registrations...</div>;

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <FileText className="text-cyan-400" /> My Registrations
            </h1>

            {registrations.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <FileText size={64} className="mx-auto text-gray-600 mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">No Registrations Yet</h2>
                    <p className="text-gray-400">
                        Register for events to see them here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {registrations.map((reg) => {
                        const status = statusConfig[reg.paymentStatus] || statusConfig.pending;
                        const StatusIcon = status.icon;

                        return (
                            <div
                                key={reg._id}
                                className="bg-gray-800/50 rounded-xl border border-gray-700 p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {reg.eventId?.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Team: {reg.teamId?.name}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {new Date(reg.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}
                                        >
                                            <StatusIcon size={14} />
                                            {reg.paymentStatus.replace("_", " ").toUpperCase()}
                                        </span>
                                        {reg.amountPaid !== undefined && (
                                            <p className="text-gray-400 text-sm mt-2">
                                                ₹{reg.amountPaid}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
