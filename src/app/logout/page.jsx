import {logout} from "@/lib/actions";


function PaginaLogout() {
    return ( 
        <div>
            <form action={logout}>
                <button>LOGOUT</button>
            </form>
        </div>


     );
}

export default PaginaLogout;