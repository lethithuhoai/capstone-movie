/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

//  /** 
//  * @param error - `any`
//  * @param message `string`
//  * @description Show toast message or error
//  * /


export const handleError = (error?:any, message?: string) => {
    if (isAxiosError<{content:string}>(error)){
        toast.error(message || error.response.data.content)
    }
}