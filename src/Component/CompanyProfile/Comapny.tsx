import { Avatar, Button, Divider, Tabs, TabsList } from "@mantine/core"
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
import AboutComp from "./AboutComp"
import CompanyJobs from "./CompanyJobs"
import CompanyEmployees from "./CompanyEmployees"

const  Company = (props:any)=>{
    return (
    <div className="w-3/4">
            <div className="relative">
                <img className="rounded-t-2xl h-60 w-full object-cover" src="/Profile/banner.png" alt="banner" />
                <img 
                    className="w-36 h-36 rounded-3xl p-2 -bottom-1/3 absolute left-5 bg-mine-shaft-900 border-mine-shaft-900 border-8" 
                    src="/Icons/Google.png" 
                    alt="Company Logo" 
                />
            </div>
            <br />
            <div className="px-3 mt-20 flex flex-col gap-1 my-3">
                <div className="text-3xl text-mine-shaft-300 font-semibold flex justify-between items-center">
                    Google
                     <Avatar.Group>
                        <Avatar src="avatar1.png" />
                        <Avatar src="avatar.png" />
                        <Avatar src="avatar2.png" />
                        <Avatar>9k+</Avatar>
                    </Avatar.Group>
                </div>

                <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> 
                    {props.location} New York, USA
                </div>
            </div>

            <Divider size="xs" mx="md" className="mt-2" />
            
            <div className="mx-5">
                <Tabs variant="outline" radius="lg" defaultValue="about" className="[&_button]:!text-lg font-semibold [&_button[data-active='true']]:text-bright-sun-400">
                    <TabsList>
                        <Tabs.Tab value="about">About</Tabs.Tab>
                        <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                        <Tabs.Tab value="employees">Employees</Tabs.Tab>
                    </TabsList>

                    <Tabs.Panel value="about"><AboutComp/></Tabs.Panel>
                    <Tabs.Panel value="jobs"><CompanyJobs /></Tabs.Panel>
                    <Tabs.Panel value="employees"><CompanyEmployees /></Tabs.Panel>
                </Tabs>
            </div>  
    </div>
    )
}

export default Company