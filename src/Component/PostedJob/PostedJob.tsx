import { Tabs } from "@mantine/core"
import PostedJobCard from "./PostedJobCard"
import { useEffect, useState } from "react"

const PostedJob = (props:any)=>{
    const [activeTab, setActiveTab] = useState<string | null>('ACTIVE')
    
    useEffect(()=>{
        setActiveTab(props.job?.jobStatus || 'ACTIVE')
    },[props.job])
    
    return (
        <div className="mt-5 ml-5 w-1/5.5">
            <div className="text-2xl font-semibold mb-5">
               Jobs
            </div>
            <div className="disply:float">
                <Tabs autoContrast variant="pills" value={activeTab} onChange={setActiveTab}>
                <Tabs.List className="[&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
                    <Tabs.Tab value="ACTIVE">Active [{props.jobList?.filter((job:any)=> job?.jobStatus == "ACTIVE" ).length}]</Tabs.Tab>
                    <Tabs.Tab value="DRAFT">Drafts [{props.jobList?.filter((job:any)=> job?.jobStatus == "DRAFT" ).length}]</Tabs.Tab>
                    <Tabs.Tab value="CLOSED">Close [{props.jobList?.filter((job:any)=> job?.jobStatus == "CLOSED" ).length}]</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={activeTab || ""}>
                    <div className="flex flex-col mt-5 gap-5">
                        {
                            props.jobList?.filter((job:any)=> job?.jobStatus == activeTab ).map((item:any, index:any) => (
                                <PostedJobCard key={index} {...item} />
                            ))
                        }
                    </div>
                </Tabs.Panel>

                </Tabs>
            </div>
        </div>
    )
}

export default PostedJob