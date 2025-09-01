
import { useRef } from "react";
import { Input } from "../component/Input";
import { Button } from "../component/Ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function Signin(){

  const UsernameRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

     async function signin(){

        const UserName = UsernameRef.current?.value;
        const Password = PasswordRef.current?.value;

        const response = await axios.post(BACKEND_URL + "/api/v1/signin" ,{

          UserName,
          Password
        })

        const jwt = response.data.token;
        localStorage.setItem("token" , jwt);
        navigate("/Dashbord");

     }


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border p-8 min-w-48">
                 <Input reference={UsernameRef} placeholder="UseraName"/>
                  <Input reference={PasswordRef} placeholder="Password"/>

                  <div className="flex justify-center items-center pt-4">
                    <Button onClick={signin} loading={false} variant="primary" size="md" text="Signin" fullWidth={true}/>
                  </div>
        </div>

    </div>
}