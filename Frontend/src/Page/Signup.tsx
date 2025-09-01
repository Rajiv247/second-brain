

import { useRef } from "react";
import { Input } from "../component/Input";
import { Button } from "../component/Ui/button";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



export function Signup(){

          const usernameRef = useRef<HTMLInputElement>(null);
          const passwordRef = useRef<HTMLInputElement>(null);
          const navigate = useNavigate();
        

          async function signup(){
            const UserName = usernameRef.current?.value
            console.log(usernameRef.current)
            const Password = passwordRef.current?.value

             await axios.post(BACKEND_URL + "/api/v1/signup" , {
              UserName,
              Password
             });
                 navigate("/Signin")
             alert("you have signed up")
          }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border p-8 min-w-48">
                 <Input reference={usernameRef} placeholder="UseraName"/>
                  <Input reference={passwordRef} placeholder="Password"/>

                  <div className="flex justify-center items-center pt-4">
                    <Button onClick={signup} loading={false} variant="primary" size="md" text="Signup" fullWidth={true}/>
                  </div>
        </div>

    </div>
}