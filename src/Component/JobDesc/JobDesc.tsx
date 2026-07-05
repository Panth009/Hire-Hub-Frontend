import { ActionIcon, Badge, Button, Divider } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconMapPin } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { card} from "../../Data/JobDescData"
//@ts-ignore
import DOMPurify from 'dompurify' ;
import RecommendJobs from "./Recomanded";
import { timeAgo } from "../../Services/Utilities";
import { changeProfile } from "../../Slice/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

const JobDesc = (props:any) => {

    const [applied, setApplied] = useState(false)
    const profile = useSelector((state: any) => state.profile)
    const user = useSelector((state:any) => state.user)
    const dispatch = useDispatch();

    const handleSaveJob =() =>{
        let savedJobs:any = [...( profile.savedJobs || [] ) ];
        if (savedJobs?.includes(props.id)){
            savedJobs = savedJobs?.filter((id:any)=> id !== props.id)
        }
        else{
            savedJobs = [...savedJobs, props.id]
        }

        let updatedProfile = {...profile, savedJobs:savedJobs}
        dispatch(changeProfile(updatedProfile))
    }

    const handleCloseJob = ()=>{
        postJob({...props, jobStatus:"CLOSED"}).then((res:any) => {
            successNotification("Closed", "Job closed Successfully")
            window.location.reload();
        }).catch((err:any) => {
            errorNotification("Error", err.response.data.errorMessage)
        })
    }

    const handleReopenJob = ()=>{
        postJob({...props, jobStatus:"ACTIVE"}).then((res:any) => {
            successNotification("OPEND", "Job Reopend Successfully")
            window.location.reload();
        }).catch((err:any) => {
            errorNotification("Error", err.response.data.errorMessage)
        })
    }

    const data =DOMPurify. sanitize(props.description);

    useEffect(()=>{
        if(props.applicants?.filter((applicant:any)=> applicant.applicantId == user.id).length > 0){
            setApplied(true)
        }
        else{
            setApplied(false)
        }
    }, [props])

    return (
    <div className="w-2/3 mx-5 pr-5">
        <div className="my-5 flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="p-3 bg-mine-shaft-800 rounded-xl">
                    <img className="h-14" src={`/Icons/${props.company}.png`} alt={props.company} />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-semibold text-2xl">
                        {props.jobTitle}
                    </div>
                    <div className="text-lg text-mine-shaft-300">
                        {props.company} &bull; {timeAgo(props.postTime)} &bull; {props.applicants? props.applicants.length : "0"} Applicants
                    </div>
                </div>
            </div>
            
            {props.jobStatus == "CLOSED" ? 
                <div className="flex items-center mr-5">
                    <Button onClick={handleReopenJob} color="green.9" size="sm" variant="filled">Re-Open</Button>
                </div>
                : 
                <div className="flex flex-col gap-2 items-center mr-5">

                    {
                        (props.edit || !applied) && 
                        <Link to={props.edit? `/post-job/${props.id}` :`/apply-job/${props.id}`}>
                            <Button color="brightSun.4" variant="filled" size="sm" >{props.closed?'Reopen':props.edit ? 'Edit' : 'Apply'}</Button>
                        </Link> 
                    }
                    {
                       !props.edit  && applied && <Button variant="filled" color="green.9" size="sm" >Applied</Button>
                    }
                    {
                        props.edit ? 
                        <Button onClick={handleCloseJob} color="red.9" size="sm" variant="filled">Close</Button>
                        :    profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer hover:text-bright-sun-400" />: <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />

                    }
                </div>
            }

        </div>

        <Divider size="sm" color="mineShaft.9" className="my-5" />
        
        <div className="m-3tflex ">
            <div className="flex justify-between">
            {
                card.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                        <ActionIcon color="brightSun.5" className="!h-12 !w-12" variant="light" radius="xl" aria-label="Settings">
                            <item.icon className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                        <div className="text-sm text-mine-shaft-300">{item.name}</div>
                        <div className="font-semibold">{props?props[item.id]:"NA"} {item.name==="Salary" ? "LPA" : ""}</div>
                    </div>
                ))
            }
            </div>
        </div>
        
        <Divider size="sm" color="mineShaft.9" className="my-5" />

        <div>
            <div className="text-xl font-semibold mb-5">Required Skills</div>
            <div className="flex flex-wrap gap-2">
                {
                    props?.skillsRequired?.map((skill: string, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                                {skill}
                            </div>
                        ))
                }
            </div>
        </div>
        
        <Divider size="sm" color="mineShaft.9" className="my-5" />
 
        <div>
                <div className="text-xl font-semibold mb-5">
                    About Job
                </div>
                <div className="[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify"
                    dangerouslySetInnerHTML={{__html:data}}>
                </div>
        
        </div>
        
        <Divider size="sm" color="mineShaft.9" className="my-5" />

        <div>
            <div className="text-xl font-semibold mb-5">
                About Company
            </div>

            <div className="my-5 flex justify-between">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-mine-shaft-800 rounded-xl">
                        <img className="h-8" src={`/Icons/${props.company}.png`} alt="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold text-xl">
                            {props.company}
                        </div>
                        <div className="text-md text-mine-shaft-300">
                            90k+ Employees
                        </div>
                    </div>
                </div>
                <Link to={`/company/${props.company}`}>
                    <Button color="brightSun.4" size="sm" variant="light" >Comapny Page</Button>
                </Link>
            </div>
            
            <div className="text-mine-shaft-300 text-justify">
                Google is a globally recognized technology company that specializes in internet-related services and products. 
                It is best known for its powerful search engine, which helps billions of users find information quickly and efficiently.
                Over the years, Google has expanded its offerings to include cloud computing, online advertising, software solutions,
                 and mobile operating systems. With a strong focus on innovation, user experience, and cutting-edge technology, 
                Google continues to shape the digital world and improve how people connect, learn, and work across the globe.
            </div>

        </div>
    </div>)
}
export default JobDesc