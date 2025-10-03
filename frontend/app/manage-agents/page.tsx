"use client"

import AgentCard from "@/app/components/AgentCard";
import { useState } from "react";

// Get all agent IDs from localstorage
function getAgentIdList() {
    const raw = localStorage.getItem("agents"); // Raw string data
    return raw ? JSON.parse(raw) : []; // Check if there are any agents in the raw data
}

export default function ManageAgentsPage() {

    const [agentIdList, setAgentIdList] = useState(getAgentIdList());

    // Deletes the agent itself, the id from the array and also updates the state
    function deleteAgent(id: string) {
        localStorage.removeItem(`agent:${id}`);
        const updatedList = agentIdList.filter((entryId: string) => entryId != id)
        localStorage.setItem("agents", JSON.stringify(updatedList))
        setAgentIdList(updatedList);
    };

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-gray-900">
            <h2 className="text-2xl font-bold mb-6">Manage agents</h2>
            {agentIdList.map((agentId: string) => {
                return <AgentCard id={agentId} deleteAgent={deleteAgent}></AgentCard>
            })}
        </main>
    );
}