import { useEffect, useState } from "react";
import { jobList } from "../../Data/JobsData"
import { getAllJobs } from "../../Services/JobService";
import JobCard from "./JobCard"
import Sort from "./Sort"
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slice/FilterSlice";
import { resetSort } from "../../Slice/SortingSlice";

const Jobs = ()=>{
    const dispatch = useDispatch()
    const [jobList, setJobList] = useState([{}]);
    const filter = useSelector((state: any) => state.filter)
    const sort = useSelector((state:any)=> state.sort)
    const [filteredJobs, setFilteredJobs] = useState<any>([])


    useEffect(()=>{
        dispatch(resetFilter())
        dispatch(resetSort())
        getAllJobs().then((res:any)=>{
        setJobList(res.filter((job:any)=>job.jobStatus==="ACTIVE"));
        }).catch((err:any)=>{
        console. log(err); })
    },[])

    useEffect(()=>{
        if(sort == "Most Recent"){
            setJobList([...jobList].sort((a:any, b:any)=> new Date(b.postTime).getTime() - new Date(a.postTime).getTime()))
        }
        else if(sort == "Salary (Low-High)"){
            setJobList([...jobList].sort((a:any, b:any)=> a.packageOffered - b.packageOffered ))
        }
        else if(sort == "Salary (High-Low)"){
            setJobList([...jobList].sort((a:any, b:any)=> b.packageOffered - a.packageOffered ))
        }
    },[sort])

    useEffect(() => {
       
       let filtered = jobList;
        
       if (filter["Job Title"] && filter["Job Title"].length > 0) {    
           filtered = filtered.filter((job: any) => filter["Job Title"]?.some((x: any) => job.jobTitle.toLowerCase().includes(x.toLowerCase()))) 
       }
       if (filter.Location && filter.Location.length >0){
           filtered = filtered.filter((job: any) => filter.Location?.some((x: any) => job.location.toLowerCase().includes(x.toLowerCase())))       
       }
       if(filter.Experience && filter.Experience.length > 0 ){
           filtered = filtered.filter((job:any)=>filter.Experience?.some((x:any)=>job.experience?.toLowerCase().includes(x.toLowerCase())));        
       }
       if (filter["Job Type"] && filter["Job Type"].length > 0) {    
           filtered = filtered.filter((job: any) => filter["Job Type"]?.some((x: any) => job.jobType.toLowerCase().includes(x.toLowerCase()))) 
       }
       if(filter.salary && filter.salary.length > 0){
           filtered = filtered.filter((jobs:any)=> filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <= filter.salary[1]);
       }           
       // console.log(filter)
       setFilteredJobs(filtered); }
    , [filter, jobList])
    
    return (
        <div className="p-5 ">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold text-mine-shaft-300">Recommanded Jobs </div>
                <Sort />
            </div>
            
            <div className="mt-5 flex flex-wrap gap-9 justify-center">
                {
                    filteredJobs.map((job:any, index:any) => <JobCard key={index} { ... job} />)
                }
            </div>
        </div>)
}

export default Jobs