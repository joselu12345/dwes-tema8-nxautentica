import { auth } from '@/auth'
import { redirect } from 'next/navigation';

async function PaginaDashboard() {

    const sesion = await auth()
    if (!sesion) redirect('/')

    return (
        <div>
            <h1 className="text-3xl font-bold">
                DASHBOARD
            </h1>
            {JSON.stringify(sesion)}

        </div>
    );
}

export default PaginaDashboard;