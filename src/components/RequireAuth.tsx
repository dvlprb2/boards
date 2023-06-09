import React from "react";
import {useAuth} from "@/contexts/AuthContext";
import {Navigate} from "react-router-dom";

export default function RequireAuth({children}: { children: JSX.Element }) {
    const {currentUser} = useAuth();

    if (!currentUser) {
        return <Navigate to="/login"/>;
    }

    return children;
}