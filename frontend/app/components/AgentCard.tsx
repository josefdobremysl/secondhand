import { useRouter } from 'next/navigation';

// Component for displaying information and action options of individual agent
// -----------------------------------------------------------------------------

interface Props {
    id: string;
    deleteAgent: (id: string) => void;
}

export default function AgentCard(props: Props) {

    const router = useRouter();
    const id = props.id;

    // Get agent data from localStorage by using ID
    const raw = localStorage.getItem(`agent:${id}`);
    const agent = raw ? JSON.parse(raw) : undefined;

    return (
    <div className="agentCard">

        {/* Display agent info */}
        <p>{agent.keywords}</p>
        <p>Min price: {agent.minPrice}</p>
        <p>Max price: {agent.maxPrice}</p>

        {/* Edit agent button */}
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => router.push('/agent')}>Edit</button>

        {/* Delete agent button */}
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => props.deleteAgent(id)}>Delete</button>

    </div>
    );
}