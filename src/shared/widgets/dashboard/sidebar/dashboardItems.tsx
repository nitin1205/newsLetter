import { useClerk } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

import useRouteChange from "@/shared/hooks/useRouteChange"
import { sideBarBottomItems, sideBarItems } from "@/app/configs/constants";
import { ICONS } from "@/shared/utils/icons";
import SidebarFooterLogo from "@/shared/widgets/dashboard/sidebar/sidebarFooterLogo";
import { useEffect } from "react";

function DashboardItems({bottomContent}: {bottomContent?: boolean}) {
    const { activeRoute, setActiveRoute } = useRouteChange();
    const { signOut, user } = useClerk();
    const pathname = usePathname();

    const logOutHandler = () => {
        signOut()
        redirect("/sign-in");
    }

    useEffect(() => {
        setActiveRoute(pathname);
    }, [pathname, setActiveRoute])

  return (
    <>
    {
        !bottomContent ? (
            <>
            {
                sideBarItems.map((item: DashboardSideBarTypes, index: number) => (
                    <Link key={index} href={item.url} className="p-2 py-5 flex items-center">
                        <span className={`text-3xl mr-2 ${item.url === activeRoute && 'text-[#463bbd]'}`}>
                            {item.icon}
                        </span>
                        <span className={`text-xl mr-2 ${item.url === activeRoute && 'text-[#463bbd]'}`}>
                            {item.title}
                        </span>
                    </Link>
                ))
            }
            </>
        ) : (
            <>
                {
                    sideBarBottomItems.map((item: DashboardSideBarTypes, index: number) => (
                        <Link key={index} className="p-2 py-5 flex items-center"
                            href={item.url === "/" ? `/subscribe?username=${user?.username}`: item.url}
                        >
                            <span className={`text-3xl mr-2 ${item.url === activeRoute && 'text-[#463bbd]'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-xl mr-2 ${item.url === activeRoute && 'text-[#463bbd]'}`}>
                                {item.title}
                            </span>
                        </Link>
                    ))
                }
                
                {/* sign-out */}
                <div className="p-2 py-5 flex items-center cursor-pointer border-b"
                    onClick={logOutHandler}
                >
                    <span className="text-3xl mr-2">{ICONS.logOut}</span>
                    <span className="text-xl">Sign Out</span>
                </div>

                {/* footer */}
                <br />
                <br />
                <div className="w-full flex justify-center cursor-pointer">
                    <SidebarFooterLogo/>
                </div>
                <p className="text-sm text-center pt-5 pb-10">
                    © 2024 ShadyMedia, Inc. All rights reserved.
                </p> 
            </>
        )
    }
    </>
  )
}

export default DashboardItems