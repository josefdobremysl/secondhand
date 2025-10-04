"use client"

import AgentCard from "@/app/components/AgentCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Manage Agents Page for seeing all agents and editing them
// -----------------------------------------------------------------------------

// Helper function for getting all agent IDs from localstorage
function getAgentIdList() {
    const raw = localStorage.getItem("agents"); // Raw string data
    return raw ? JSON.parse(raw) : []; // Check if there are any agents in the raw data
}

export default function ManageAgentsPage() {

    const router = useRouter();
    const [agentIdList, setAgentIdList] = useState(getAgentIdList()); // keep state abouit agent ID list 

    // Helper function for deleting the given ID agent from localstorage. Deletes the agent object itself, the id from the array of agents and also updates the state
    function deleteAgent(id: string) {
        // Delete the agent object
        localStorage.removeItem(`agent:${id}`);
        // Delete the agent ID from the list
        const updatedList = agentIdList.filter((entryId: string) => entryId != id)
        localStorage.setItem("agents", JSON.stringify(updatedList))
        // Update state
        setAgentIdList(updatedList);
    };

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 pt-20 bg-white text-gray-900">

            {/* Page title */}
            <h2 className="text-2xl font-bold mb-6">Manage agents</h2>

            {/* List out all the agent cards */}
            {agentIdList.map((agentId: string) => {
                return <AgentCard id={agentId} deleteAgent={deleteAgent}></AgentCard>
            })}

            {/* Add new agent button, works, but placehodler so far since not sure if this will be located here */}
            <button className="mr-auto px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => router.push("/agent")}>
                Add agent
            </button>

        </main>
    );
}