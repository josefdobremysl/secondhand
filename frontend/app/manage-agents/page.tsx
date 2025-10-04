"use client";

import AgentCard from "@/app/components/AgentCard";
import { useState } from "react";

// Get all agent IDs from localstorage
function getAgentIdList() {
    const raw = localStorage.getItem("agents");
    return raw ? JSON.parse(raw) : [];
}

export default function ManageAgentsPage() {
    const [agentIdList, setAgentIdList] = useState(getAgentIdList());

    function deleteAgent(id: string) {
        localStorage.removeItem(`agent:${id}`);
        const updatedList = agentIdList.filter((entryId: string) => entryId !== id);
        localStorage.setItem("agents", JSON.stringify(updatedList));
        setAgentIdList(updatedList);
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-gray-900">
            <h2 className="text-2xl font-bold mb-6">Manage agents</h2>
            {agentIdList.map((agentId: string) => (
                <AgentCard key={agentId} id={agentId} deleteAgent={deleteAgent} />
            ))}
        </main>
    );
}
