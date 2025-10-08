import { useRouter } from 'next/navigation';

// AgentCard component for displaying information and action options of individual agent
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
    <div className="bg-handgray rounded p-2 m-2">

        {/* Display agent info */}
        <h3 className="text-lg font-bold mb-2">{agent.keywords}</h3>
        <p className="mb-2">Min price: {agent.minPrice}</p>
        <p className="mb-2">Max price: {agent.maxPrice}</p>

        {/* Edit agent button */}
        <button className="mr-2 px-4 py-2 rounded-md bg-discount text-white hover:bg-discount-dark"
            onClick={() => router.push(`/update-agent/${id}`)}>
            Edit
        </button>

        {/* Delete agent button */}
        <button className="mr-2 px-4 py-2 rounded-md bg-discount text-white hover:bg-discount-dark"
            onClick={() => props.deleteAgent(id)}>
            Delete
        </button>

    </div>
    );
}