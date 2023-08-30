import React, { useState } from "react"
import { LoginPage } from "./Login"
import { RegisterPage } from "./Register"

export const AuthPage: React.FC = () => {
    const [page, setPage] = useState<"login" | "register">("login")

    return (
        <>
        {page === "login" ? <LoginPage setPage={setPage} /> : <RegisterPage setPage={setPage} />}
        </>
    )
}
