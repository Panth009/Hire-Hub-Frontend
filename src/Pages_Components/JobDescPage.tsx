import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useParams } from "react-router-dom"
import JobDesc from "../Component/JobDesc/JobDesc"
import RecommendJobs from "../Component/JobDesc/Recomanded"
import { useEffect, useState } from "react"
import { getJob } from "../Services/JobService"

const JobDescPage = ()=>{
    
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
            
            <Link className="m-5 inline-block" to="/find-jobs">
                <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">
                     Back
                </Button>
            </Link>

            <div className="flex mx-5">
                <JobDesc {...job}/>
                <div className="ml-10 items-center">
                    <RecommendJobs />
                </div>
            </div>
        </div>   
    )

}

export default JobDescPage