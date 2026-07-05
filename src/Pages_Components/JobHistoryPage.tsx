import { Divider } from "@mantine/core"
import JobHistory from "../Component/JobHistory/JobHistory"

const JobHistoryPage = ()=>{
    return (
        <div className="bg-mine-shaft-900 font-['poppins'] px-4 ">
        <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            <JobHistory />
    </div>
    )
}

export default JobHistoryPage