import type { ReactElement } from "react";


type variant = "primary" | "secondary"
interface ButtonProps {
    variant : variant;
    size : "sm"|"md"| "lg";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyle = {
    "primary" : "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}
    //object
const sizeStyle = {
    "sm": "py-1 px-2",
    "md" : "py-2 px-4",
     "lg" : "py-4 px-6"
}

const defaultStyle = "rounded-md flex items-center font-light flex justify-center m-2"

export const Button = (props: ButtonProps) => {

     return <button  onClick={props.onClick}  className={ `${variantStyle[props.variant]} ${defaultStyle} ${sizeStyle[props.size]} 
      ${props.fullWidth ? " w-full flex justify-center items-center": ""}  ${props.loading ? "opacity-45" : ""}`}> 

     {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text}
     </button>

}

{/* <Button variant="primary" size="md" onClick={() => {}} text={"asd"}  /> */}