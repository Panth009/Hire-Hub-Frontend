import { useEffect } from "react";
import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalents/TalentCards";

const RecommendTalent = (props:any) => {

    
    return (
        <div className="ml-7">
            <div className="text-2xl font-semibold mb-5 text-mine-shaft-200">Recommended Talent</div>
            <div className="flex flex-col flex-wrap gap-5 items-center">
                {
                    props?.talents?.map((talent: any, index: number) => (
                    index < 4 && <TalentCard key={index} {...talent} />
                    ))
                }
            </div>
        </div>
    );
};

export default RecommendTalent;