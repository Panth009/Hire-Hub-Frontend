import { Text, Divider, Avatar, Button, Modal } from "@mantine/core"
import { DateInput, DateValue, TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconBookmark, IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react"
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";
import { changeAppStatus } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../../Services/Utilities";
import dayjs from "dayjs";

const TalentCard = (props: any) => {
    
    const { id } = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false)
   
    const ref= useRef<HTMLInputElement>(null);
    const [date, setDate] = useState<DateValue | null>(null);
    const [time, setTime] = useState<any>(null)
    
    const [profile, setProfile] = useState<any>({})

    useEffect(() => {
        if (props.applicantId) getProfile(props.applicantId).then((res) => {
            setProfile(res)
        }).catch((err) => {
            console.log(err)
        })
        else setProfile(props)
    }, [props])
    
    const handleOffer = (status: string) => {
        let interview: any = { id, applicantId: profile?.id, applicationStatus: status }
        if (status === "INTERVIEWING" && date) {
            const [hours, minutes] = time.split(":").map(Number);
        
            const interviewDate = new Date(date);
            interviewDate.setHours(hours, minutes, 0, 0);
        
            interview = {
                ...interview,
                interviewTime: dayjs(interviewDate).format("YYYY-MM-DDTHH:mm:ss")
            };
        }
        // console.log(interview);
        // console.log(JSON.stringify(interview));
        changeAppStatus(interview).then((res) => {
            if (status == "INTERVIEWING")
                successNotification("Interview Scheduled", "Interview scheduled successfully 👍")
            else if (status == "OFFERED")
                successNotification("Offered", "offer sent successfully 👏")
            else successNotification("Rejected", "Application Rejected 🙏")
            window.location.reload();
        }).catch((err) => {
            console.log(err)
            errorNotification("Error", err.response.data.errorMessage)
        })
    }

    return (
        <div className="bg-mine-shaft-800 p-4 w-96 rounded-xl flex flex-col gap-3 my-5 hover:shadow-[0_0_5px_1px_rgba(250,204,21,1)] transition-shadow shadow-bright-sun-400">
            
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Avatar src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : '/Avatar.png'} size="lg" radius="md" />
                    <div>
                        <div className="font-semibold text-md text-mine-shaft-100 leading-tight">
                            {profile.name}
                        </div>
                        <div className="text-xs text-mine-shaft-400">
                            {profile.jobTitle} &#x2022; {profile.company}
                        </div>
                    </div>
                </div>
                <IconHeart className="text-mine-shaft-300 cursor-pointer hover:text-bright-sun-400 transition-colors" />
            </div>

            <div className="items-center justify-center py-2 flex flex-wrap font-semibold gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-700 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
                {
                    profile.skills?.map((skill: string, index: number) => (
                        index<5 ? <div key={index}>{skill}</div> : null
                    ))
                }
            </div>

            <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
                {profile.about}
            </Text>

            <Divider size="xs" color="mineShaft.5" />

            {
                props.invited ?
                <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
                    <IconCalendarMonth stroke={1.5}/> {formatInterviewTime(props.interviewTime)}
                </div> :  
                <div className="flex justify-between items-center">
                    <div className="text-mine-shaft-200">
                        Exp : {!profile.totalExp ? "Fresher" : `${profile.totalExp} Years`}
                    </div>
                    <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
                        <IconMapPin className="h-5 w-5" stroke={1.5} />
                        {profile?.location}
                    </div>
                </div>
            }

            <Divider color="mineShaft.5" size="xs" />

            {
                props.invited ? 
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Button onClick={() => handleOffer("OFFERED")} color="brightSun.4" variant="outline" fullWidth>
                            Accept
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button
    onClick={() => {
        console.log("Reject Clicked");
        handleOffer("REJECTED");
    }}
    color="brightSun.4"
    variant="light"
    fullWidth
>
    Reject
</Button>
                    </div>
                </div>
                :
                <div className="flex gap-2">
                    <Link to={`/talent-profile/${profile?.id}`} className="flex-1">
                        <Button color="brightSun.4" variant="outline" fullWidth>
                            Profile
                        </Button>
                    </Link>
                    <div className="flex-1">
                        {
                            props.posted ? (
                                <Button 
                                    rightSection={<IconCalendarMonth className="w-5 h-5" />} 
                                    color="brightSun.4" 
                                    variant="light" 
                                    fullWidth
                                    onClick={open}
                                >
                                    Schedule
                                </Button>
                            ) : (
                                <Button 
                                    color="brightSun.4" 
                                    variant="light" 
                                    fullWidth
                                >
                                    Message
                                </Button>
                            )
                        }
                    </div>
                </div>
            }

            {
                    (props.invited || props.posted) && <Button onClick={openApp} variant="filled" fullWidth>View Application</Button>
            }
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered> 
                <div className="flex flex-col gap-3">
                     <DateInput
                            value={date}
                            minDate={new Date()}
                            onChange={setDate}
                            label="Date"
                            placeholder="Enter Date"
                        />
                        <TimeInput label="Time" value={time} onChange={(event) => setTime(event.currentTarget.value)} ref={ref} onClick={() => ref.current?.showPicker()} />
                        <Button 
                        rightSection={<IconCalendarMonth className="w-5 h-5" />} 
                        color="brightSun.4" 
                        variant="light" 
                        fullWidth
                        onClick={() => handleOffer("INTERVIEWING")} 
                    >
                        Schedule
                    </Button>
                </div>
            </Modal>

            <Modal opened={app} onClose={closeApp} title="Application" centered>
                    <div className="flex flex-col gap-4">
                        <div>
                            Email: &emsp; <a className="hover:underline cursor-pointer text-center" href={`mailto:${props.email}`}>{props.email} </a>
                        </div>
                        <div>
                            Website: &emsp; <a target="_blank" className="hover:underline cursor-pointer text-center" href={props.website}>{props.website} </a>
                        </div>
                        <div>
                            Resume: &emsp; <span className="hover:underline cursor-pointer text-center" onClick={() => openBase64PDF(props.resume)}>{props.name} </span>
                        </div>
                        <div>
                            Cover Letter: &emsp; <div >{props.coverLetter} </div>
                        </div>

                    </div>
            </Modal>

        </div>
    )
}

export default TalentCard;