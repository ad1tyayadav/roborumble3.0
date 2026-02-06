"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Users, UserPlus, Search, Check, X } from "lucide-react";

interface Member {
    _id: string;
    username: string;
    email: string;
    avatarUrl?: string;
}

interface TeamData {
    _id: string;
    name: string;
    leaderId: Member;
    members: Member[];
    isLocked: boolean;
}

interface Invitation {
    _id: string;
    name: string;
    leaderId: { username: string; email: string };
}

interface JoinRequest {
    _id: string;
    username: string;
    email: string;
    college?: string;
}

export default function TeamPage() {
    const { user } = useUser();
    const [team, setTeam] = useState<TeamData | null>(null);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
    const [profileId, setProfileId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [teamName, setTeamName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<TeamData[]>([]);
    const [message, setMessage] = useState("");

    const isLeader = team?.leaderId?._id === profileId;

    useEffect(() => {
        fetchTeamData();
    }, [user?.id]);

    async function fetchTeamData() {
        if (!user?.id) return;
        try {
            const res = await fetch(`/api/teams?clerkId=${user.id}`);
            const data = await res.json();
            setTeam(data.team);
            setInvitations(data.invitations || []);
            setProfileId(data.profileId);

            if (data.team && data.team.leaderId._id === data.profileId) {
                const reqRes = await fetch(`/api/teams/join?clerkId=${user.id}`);
                const reqData = await reqRes.json();
                setJoinRequests(reqData.joinRequests || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    async function createTeam() {
        if (!teamName.trim()) return;
        try {
            const res = await fetch("/api/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clerkId: user?.id, teamName }),
            });
            const data = await res.json();
            setMessage(data.message);
            if (res.ok) {
                setTeamName("");
                fetchTeamData();
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function inviteMember() {
        if (!inviteEmail.trim()) return;
        try {
            const res = await fetch("/api/teams/invite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clerkId: user?.id, inviteEmail }),
            });
            const data = await res.json();
            setMessage(data.message);
            if (res.ok) setInviteEmail("");
        } catch (e) {
            console.error(e);
        }
    }

    async function searchTeams() {
        if (!searchQuery.trim()) return;
        try {
            const res = await fetch(`/api/teams?search=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            setSearchResults(data.teams || []);
        } catch (e) {
            console.error(e);
        }
    }

    async function requestJoin(teamId: string) {
        try {
            const res = await fetch("/api/teams/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clerkId: user?.id, teamId }),
            });
            const data = await res.json();
            setMessage(data.message);
        } catch (e) {
            console.error(e);
        }
    }

    async function respondToInvitation(teamId: string, accept: boolean) {
        try {
            const res = await fetch("/api/teams/respond", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkId: user?.id,
                    action: accept ? "accept_invitation" : "reject_invitation",
                    teamId,
                }),
            });
            const data = await res.json();
            setMessage(data.message);
            fetchTeamData();
        } catch (e) {
            console.error(e);
        }
    }

    async function respondToRequest(userId: string, accept: boolean) {
        try {
            const res = await fetch("/api/teams/respond", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkId: user?.id,
                    action: accept ? "accept_request" : "reject_request",
                    userId,
                }),
            });
            const data = await res.json();
            setMessage(data.message);
            fetchTeamData();
        } catch (e) {
            console.error(e);
        }
    }

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-white mb-8">Team Management</h1>

            {message && (
                <div className="bg-cyan-500/10 border border-cyan-500 text-cyan-400 px-4 py-3 rounded-lg mb-6">
                    {message}
                </div>
            )}

            {team ? (
                <>
                    {/* Current Team */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{team.name}</h2>
                                <p className="text-gray-400">
                                    {team.isLocked ? "🔒 Team Locked" : "🔓 Open for Members"}
                                </p>
                            </div>
                            {isLeader && (
                                <span className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-sm">
                                    Leader
                                </span>
                            )}
                        </div>

                        <h3 className="text-white font-bold mb-4">Members</h3>
                        <div className="space-y-3">
                            {team.members.map((member) => (
                                <div
                                    key={member._id}
                                    className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg"
                                >
                                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {member.username?.[0]?.toUpperCase() || "?"}
                                    </div>
                                    <div>
                                        <p className="text-white">{member.username}</p>
                                        <p className="text-gray-400 text-sm">{member.email}</p>
                                    </div>
                                    {member._id === team.leaderId._id && (
                                        <span className="ml-auto text-yellow-400 text-xs">Leader</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Invite Members (Leader Only) */}
                    {isLeader && !team.isLocked && (
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <UserPlus size={20} /> Invite Members
                            </h3>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                                />
                                <button
                                    onClick={inviteMember}
                                    className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Join Requests (Leader Only) */}
                    {isLeader && joinRequests.length > 0 && (
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                            <h3 className="text-white font-bold mb-4">Pending Join Requests</h3>
                            <div className="space-y-3">
                                {joinRequests.map((req) => (
                                    <div
                                        key={req._id}
                                        className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-white">{req.username}</p>
                                            <p className="text-gray-400 text-sm">{req.email}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => respondToRequest(req._id, true)}
                                                className="p-2 bg-green-500/10 text-green-400 rounded hover:bg-green-500/20"
                                            >
                                                <Check size={20} />
                                            </button>
                                            <button
                                                onClick={() => respondToRequest(req._id, false)}
                                                className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Create Team */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Users size={24} /> Create a Team
                        </h2>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Enter team name"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                            <button
                                onClick={createTeam}
                                className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                            >
                                Create Team
                            </button>
                        </div>
                    </div>

                    {/* Pending Invitations */}
                    {invitations.length > 0 && (
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-8">
                            <h3 className="text-white font-bold mb-4">Pending Invitations</h3>
                            <div className="space-y-3">
                                {invitations.map((inv) => (
                                    <div
                                        key={inv._id}
                                        className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-white">{inv.name}</p>
                                            <p className="text-gray-400 text-sm">
                                                From: {inv.leaderId.username}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => respondToInvitation(inv._id, true)}
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => respondToInvitation(inv._id, false)}
                                                className="px-4 py-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search Teams */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Search size={24} /> Find a Team
                        </h2>
                        <div className="flex gap-3 mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by team name"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            />
                            <button
                                onClick={searchTeams}
                                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                            >
                                Search
                            </button>
                        </div>

                        {searchResults.length > 0 && (
                            <div className="space-y-3">
                                {searchResults.map((t) => (
                                    <div
                                        key={t._id}
                                        className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-white">{t.name}</p>
                                            <p className="text-gray-400 text-sm">
                                                {t.members?.length || 0} members
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => requestJoin(t._id)}
                                            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded hover:bg-cyan-500/20"
                                        >
                                            Request to Join
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
