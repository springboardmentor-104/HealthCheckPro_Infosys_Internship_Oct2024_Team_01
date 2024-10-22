
import DashLayout from '../components/DashLayout';
import { Outlet } from 'react-router-dom';


const Dashboard = () => {
    return (
        <DashLayout>
            <Outlet/>
        </DashLayout>
    )
}

export default Dashboard;