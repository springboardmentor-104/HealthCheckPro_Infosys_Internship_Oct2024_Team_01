import axios from 'axios'
import { useState } from 'react'

import useGlobalState from '../hooks/useGlobalState'


const useLeaderBoard = () => {
    const { user:{token} } = useGlobalState()
    const [loadingL, setLoadingL] = useState(false)


    const axiosInstance = axios.create({

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const getLeaderBoard = async (cid) => {
        try {
            setLoadingL(true);
            const response = await axiosInstance.get(`/api/leaderboard/${cid}`);
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingL(false);
        }
    }

    const getOverallLeaderBoard = async () => {
        try {
            setLoadingL(true);
            const response = await axiosInstance.get(`/api/leaderboard/`);
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingL(false);
        }
    }

    return { getLeaderBoard,getOverallLeaderBoard,loadingL }

}
export default useLeaderBoard
