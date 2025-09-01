import { useRef } from "react";
import { CrossIcon } from "../Icon/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Ui/button";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

     
   
   enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}


export function CreateContentModel({open , onClose}){

      const linkRef = useRef<HTMLInputElement>(null);
      const titleRef = useRef<HTMLInputElement>(null)
      const [type , setType] = useState(ContentType.Youtube)


       async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose();

    }

    return <div >
         
          {open && 
          <div className=" h-screen w-screen bg-slate-500 fixed top-0 left-0 bg-opacity-60 flex justify-center">

                  <div className="flex flex-col justify-center">
                        <span className="bg-white  p-6 rounded">
                              <div className="flex justify-end ">
                                    <div onClick={onClose} className="cursor-pointer" >
                                           <CrossIcon/>
                                    </div>
                              </div>
                              <div >
                                    <Input reference={titleRef} placeholder={"title"}/>
                                    <Input reference={linkRef} placeholder={"link"}/>
                              </div>
                              <div>
                                    <h1>Type</h1>
                                    <div className="flex gap-1 justify-center pb-2">
                                          <Button text="Youtube"  size="md" variant={type == ContentType.Youtube ? "primary" :"secondary"} onClick={() =>{
                                                setType(ContentType.Youtube)
                                          }} ></Button>
                                           <Button text="Twitter" size="md" variant={type == ContentType.Twitter ? "primary" :"secondary"} onClick={() =>{
                                                setType(ContentType.Twitter)
                                          }} ></Button>

                                    </div>
                              </div>
                              <div className="flex justify-center">
                                  <Button onClick={addContent} variant="primary" size="md" text="sumbit"/>
                              </div>
                        </span>
                  </div>
            </div>}

       </div>
      

}