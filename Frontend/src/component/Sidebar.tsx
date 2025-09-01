import { Logo } from "../Icon/Logo";
import { TwitterIcon } from "../Icon/TwitterIcon";
import { YouTubeIcon } from "../Icon/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";



export function Sidebar(){
    return(
        <div className="h-screen bg-sky-100 w-72 border-r fixed left-0 top-0 pl-6">
            <div className=" flex text-2lx pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Logo/>
                </div>
                 Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarItem text="twitter" icon={<TwitterIcon/>}/>
                <SidebarItem text="youtube" icon={<YouTubeIcon/>}/>

            </div>

        </div>
    )
}