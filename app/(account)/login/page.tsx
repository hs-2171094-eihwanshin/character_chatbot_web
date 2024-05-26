"use client";

import ForgotForm from 'components/login/forgotform';
import LoginForm from 'components/login/loginform';
import SignupForm from 'components/login/signupform';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
    const [isForgot, setIsForgot] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const session = useSession();

    // Already Logged in
    if (session.data) {
        if (typeof window !== 'undefined') {
            window.location.href = "/";
        }
        return null; // While redirecting, don't render anything
    }

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent
                isForgot={isForgot}
                setIsForgot={setIsForgot}
                isSignup={isSignup}
                setIsSignup={setIsSignup}
                style={style}
            />
        </Suspense>
    );
}

function LoginContent({ isForgot, setIsForgot, isSignup, setIsSignup, style }) {
    const errorMsg = useSearchParams().get("error");

    return (
        <div style={{ ...style, flexDirection: "column" }}>
            {!isForgot && !isSignup && <>
                <LoginForm errorMsg={errorMsg} />
                <hr />
                <div>
                    <button style={{backgroundColor:"#94beb8",border: "1px solid #000", marginTop:"15px", width:"180px", height:"40px", borderRadius:"14px", marginRight:"10px"}} onClick={() => setIsForgot(true)}>Forgot Password?</button>
                    <button style={{backgroundColor:"#94beb8",border: "1px solid #000", marginTop:"15px", width:"180px", height:"40px", borderRadius:"14px"}} onClick={() => setIsSignup(true)}>Sign Up</button>
                </div>
                <button style={{backgroundColor:"#94beb8",border: "1px solid #000", marginTop:"15px", width:"180px", height:"40px", borderRadius:"14px"}} onClick={() => window.location.href = "/"}>Back to Main</button>
            </>}
            {isForgot && <>
                <ForgotForm />
                <button style={{backgroundColor:"#94beb8",border: "1px solid #000", marginTop:"15px", width:"180px", height:"40px", borderRadius:"14px"}} onClick={() => setIsForgot(false)}>Back to Login</button>
            </>}
            {isSignup && <>
                <SignupForm />
                <button style={{backgroundColor:"#94beb8",border: "1px solid #000", marginTop:"15px", width:"180px", height:"40px", borderRadius:"14px"}} onClick={() => setIsSignup(false)}>Back to Login</button>
            </>}
        </div>
    );
}