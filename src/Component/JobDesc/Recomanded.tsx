import { useParams } from "react-router-dom";
import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";

const RecommendJobs = () => {
    const {id} = useParams();
    
    const [jobList, setJobList] = useState([{}]);
    useEffect(()=>{
    getAllJobs().then((res:any)=>{
    setJobList(res);
    }).catch((err:any)=>{
    console. log(err); })
    },[])

    return (
        <div className="ml-7">
            <div className="text-2xl font-semibold mb-5 text-mine-shaft-200">Recommended Jobs</div>
            <div className="flex flex-col flex-wrap gap-1 items-center">
                {
                    jobList.map((job: any, index: number) => (
                    index < 5 && id!=job.id && <JobCard key={index} {...job} />
                    ))
                }
            </div>
        </div>
    );
};

export default RecommendJobs;

