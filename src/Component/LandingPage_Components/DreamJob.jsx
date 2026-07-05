import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = ()=>{
    return (
    <div className="flex items-center px-16 ">
        <div className="flex flex-col w-[45%] gap-3">
            <div className="text-6xl font-bold text-mine-shaft-100 [&>span]:text-bright-sun-500 leading-tight">
                Find Your <br /> <span>Dream </span><span>Job</span> With <br />Us
            </div>
            
            <div className="text-lg text-mine-shaft-200">
                Good life begins with a good company. Start explore thousands of jobs at one place .
            </div>
            
            <div className="flex gap-3 items-end">

                <TextInput
                    className="w-60"
                    label="Job title"
                    placeholder="Software Engineer"
                    classNames={{
                        input: "bg-mine-shaft-900 text-mine-shaft-200 rounded-lg",
                        label: "text-mine-shaft-100"
                    }}
                />
                
                <TextInput
                    className="w-60"
                    label="Job Type"
                    placeholder="full time"
                    classNames={{
                        input: "bg-mine-shaft-900 text-mine-shaft-200 rounded-lg",
                        label: "text-mine-shaft-100"
                    }}
                />
                
                <div className="flex items-center justify-center h-[36px] w-16 bg-bright-sun-400 text-mine-shaft-100 rounded-lg hover:bg-bright-sun-500 cursor-pointer">
                    <IconSearch stroke={2} />
                </div>   

            </div>

        </div>

        <div className="w-[55%] flex items-center justify-center">
            
            <div className="w-[30rem] relative">
    
                <img src="/Boy.png" alt="boy" />

            <div className="absolute -right-10 w-fit top-[50%] border border-bright-sun-400 rounded-lg p-2 backdrop-blur-md">
                                <div className="text-mine-shaft-100">
                                    9k+ get jobs 
                                </div>    
                                <Avatar.Group>
                                    <Avatar src="avatar1.png" />
                                    <Avatar src="avatar2.png" />
                                    <Avatar src="avatar.png" />
                                    <Avatar>9k+</Avatar>
                                </Avatar.Group>
            </div>

             <div className='absolute -left-10 w-fit top-[32%] border   border-bright-sun-400 rounded-md p-1 backdrop-blur-md'>
                <div className='flex gap-2 items-center'>
                    <div className='w-12 h-12 p-1'>
                        <img src="g1.webp" alt="google" />
                    </div>
                    <div className='text-sm text-mine-shaft-100'>
                        <div>Software Engineer</div>
                        <div className='text-xs'>New york</div>
                    </div>
                </div>
                <div className='flex gap-2 text-xs justify-between text-mine-shaft-100'>
                    <span>1 day ago</span><span>120 applicants</span>
                </div>
                
            </div>

            </div>
</div>
        
    </div> );
}

export default DreamJob;











