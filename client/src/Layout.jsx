import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout (lang){
    return (
        <div className="min-h-screen">
            <Header/>
            <Outlet />
        </div>
    )
}