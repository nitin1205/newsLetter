'use client'
import { useState } from "react"


function Pricing() {
    const [active, setActive] = useState('Monthly');
  return (
    <div className="w-full bg-[#fec8eb]">
        <div className="w-[95%] m-auto py-5">
            <div className="w-full md:flex justify-between">
                <div>
                    <h3 className="font-clashDisplay text-center lg:text-left uppercase text-cyber-ink
                        text-[2.75rem] md:text-7xl lg:text-[4rem] xl:text-[5.75rem] max-w-4xl "
                    >
                        Pricing
                    </h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pricing