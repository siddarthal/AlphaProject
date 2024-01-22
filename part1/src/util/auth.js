import { redirect } from "react-router-dom";
import api from "../Services/service";
export function getAuthToken(){
    const token =localStorage.getItem('accessToken');
    return token;
}

export function checkAuthLoader(){
    const token =getAuthToken();
    if(!token){
        return redirect("/signin")
    }
    return null;
}
