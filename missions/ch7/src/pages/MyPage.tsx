import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { get } from "react-hook-form"
import { ResponseMyInfoDto } from "../types/auth"
import { useAuth } from "../week5/context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null)
    useEffect(()=> {
        const getData = async () => {
            const response = await getMyInfo()
            console.log(response)

            setData(response)
        }

        getData()
    },[])


    return (
        <div className="mt-12">{data?.data?.name}더키
         </div>
    )

}

export default MyPage;