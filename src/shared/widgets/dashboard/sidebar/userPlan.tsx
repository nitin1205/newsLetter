import { Slider } from "@heroui/react";

import { ICONS } from "@/shared/utils/icons";

function UserPlan() {
  return (
    <div className="w-full my-3 p-3 bg-[#FDF1F8] rounded hover:shadow-xl cursor-pointer">
        <div className="w-full flex items-center">
            <h5 className="text-lg font-medium">Launch Plan</h5>
            <div className="w-[95px] shadow ml-2 cursor-pointer h-[32px] flex justify-center
                items-center space-x-1 rounded-lg bg-[#E77CAE]"
            >
                <span className="text-white text-xl">{ICONS.electric}</span>
                <span className="text-white text-sm">Upgrade</span>
            </div>
        </div>
        <h5 className="text-[#831743]">Total subscribers</h5>
        <Slider
            aria-label="Player Progress"
            hideThumb={true}
            defaultValue={0}
            className="max-w-md"
        />
        <h6 className="text-[#831743]">0 of 2500 added</h6>
    </div>
  )
}

export default UserPlan