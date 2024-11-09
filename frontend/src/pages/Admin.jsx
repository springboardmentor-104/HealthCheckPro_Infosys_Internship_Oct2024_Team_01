
import AdminLayout from '../components/AdminLayout';
import { Outlet } from 'react-router-dom';


const Admin = () => {
    return (
        <AdminLayout>
            <Outlet/>
        </AdminLayout>
    )
}

export default Admin;