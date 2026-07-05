import { Text,Divider, Button } from "@mantine/core"
import { IconBookmark, IconBookmarkFilled, IconCalendarMonth, IconClockHour3 } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities"
import { changeProfile } from "../../Slice/ProfileSlice"
import { useDispatch, useSelector } from "react-redux"

const Card = (props:any)=>{

     
    const profile = useSelector((state:any) => state.profile) 
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

    return (
        <div className="bg-mine-shaft-800 p-4 w-80 rounded-xl flex flex-col gap-5 rounded-xl my-5 hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 justify-center ">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-700 rounded-md">
                        <img className="h-7" src={`/Icons/${props.company}.png`} alt="Microsoft" />
                    </div>
                    <div>
                        <div className="font-semibold">
                            {props.jobTitle}
                        </div>
                        <div className="text-xs text-mine-shaft-400">
                            {props.company} &#x2022; {props?.applicants!=null ? props.applicants.length : "0" } Applicantes
                        </div>
                    </div>
                </div>
                {
                        profile.savedJobs?.includes(props.id)?<IconBookmarkFilled onClick={handleSaveJob} className="text-bright-sun-400 cursor-pointer hover:text-bright-sun-400" />: <IconBookmark onClick={handleSaveJob} className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400" />
                }
            </div>
            <div className="py-2 flex font-semibold gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-700 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
                <div>{props.experience}</div>
                <div>{props.jobType}</div>
                <div>{props.location}</div>
            </div>
            
            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
               {props.about}
            </Text>

            <Divider size="xs" color="mineShaft.7" />

            <div className="flex justify-between items-center">
                <div className="font-semibold text-mine-shaft-200"> 
                    &#8377;{props.packageOffered}
                </div>
                <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                    <IconClockHour3 className="h-5 w-5" stroke={1.5} /> 
                    {
                        (props.applied|| props.interviewing) ? "Applied ": props.offered ? "Interviewd " : "Posted "
                    }
                    {timeAgo(props.postTime)}
                </div>
            </div>

            {props. offered &&<Divider color="mineShaft.7" size="xs"/>}
            {
                props.offered &&
                <div className="flex gap-2">
                    <Button color="brightSun.4" variant="outline" fullWidth>Accept</Button>
                    <Button color="brightSun.4" variant="light" fullWidth>Reject</Button>
                </div>
            }
            {props.interviewing &&<Divider color="mineShaft.7" size="xs"/>}
            {
                props.interviewing && (
                    <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                        <IconCalendarMonth stroke={1.5} className="w-5- h-5 text-bright-sun-400"/>
                        Sunday, 27 November 
                        <span className="text-mine-shaft-400">&bull; 10:00 AM</span>
                    </div>
                )
            }
        <Link to={`/jobs/${props.id}`} >
            <Button fullWidth color="brightSun.4"  variant="light" >View job</Button>
        </Link>
    </div>)
}

export default Card