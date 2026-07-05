import { Avatar } from "@mantine/core";
import { work } from "../../Data/data";

const Working = ()=>{
    return (
    <div className="mt-20 pb-5 justify-center">
        
        <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
            How It <span className="text-bright-sun-400">Works</span> 
        </div>
        <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2">
            Effortlessly navigate through the process and land to your dream job.   
        </div>    

        <div className="flex px-16 justify-between items-center">
            <div className="relative">
                <div className="ml-[70px]">
                    <img className="w-[35rem] ml-30px" src="/Working/Girl.png" alt="Girl" />
                </div>
                
                <div className="w-36 flex top-[10%] -right-5 absolute flex-col items-center gap-1 border border-bright-sun-400 rounded-xl py-3 px-1 backdrop-blur-md bg-white/10">
                    <Avatar 
                        className="!h-16 !w-16" 
                        src="avatar1.png" 
                        alt="it's me" 
                    />
                    
                    <div className="text-center text-sm font-semibold text-mine-shaft-200">
                        Complete your profile
                    </div>
                    
                    <div className="text-xs text-mine-shaft-300">
                        70% Completed
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10 mr-10">
                {
                    work.map((item,index)=>
                    <div className="flex items-center gap-4" key={index}>
                        <div className="p-2.5 bg-bright-sun-300 rounded-full">
                            <img className="h-12 w-12" src={`/Working/${item.name}.png`} alt={item.name} />
                        </div>
                        <div>
                            <div className="text-mine-shaft-100 text-xl font-semibold">
                                {item.name}
                            </div>
                            <div className="text-mine-shaft-200">
                                {item.desc} 
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div>
    );
}

export default Working;