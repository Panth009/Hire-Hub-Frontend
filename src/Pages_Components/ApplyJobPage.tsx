import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ApplyJob from "../Component/ApplyJob/ApplyJob"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const ApplyJobPage = ()=>{

    const navigate = useNavigate()
    
    const {id} = useParams();
    
    const [job, setJob] = useState<any>(null);
    
    useEffect(()=>{
        window.scrollTo(0,0)

        getJob(id).then((res:any)=>{
            setJob(res)
        }).catch((res:any)=>{
            console.log(res);
        })
    },[id])

    return (
        <div className="min-h-[100vh] bg-mine-shaft-900 font-['poppins']">
            
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            
            <div className="m-5 inline-block" >
                <Button onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">
                    Back
                </Button>
            </div>
            
            
            <ApplyJob {...job}/>

        </div>
    )
}

export default ApplyJobPage