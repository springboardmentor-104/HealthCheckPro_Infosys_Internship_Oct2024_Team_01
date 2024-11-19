import axios from 'axios'
import { useEffect, useState } from 'react'


const useLeaderBoard = (token) => {

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

    return { getLeaderBoard,loadingL }

}
export default useLeaderBoard
