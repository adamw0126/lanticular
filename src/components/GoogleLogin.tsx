import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


function GoogleLoginComponent() {
    const navigate = useNavigate();
    
    const handleLogin = (data: any) => {
        axios.post("/api/oauth", data).then(res => {
            // console.log(res);
            if (res.data.msg == "success") {
                toast.success("SignIn successful.", {
                  duration: 1000,
                  position: "top-right",
                  style: { background: "#333", color: "#fff" },
                  icon: "👏",
                });
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                setTimeout(() => {
                    navigate("/upload");
                    window.location.reload();
                }, 500);
            } else {
                console.log(res.data);
                
                // toast.error(res.data.msg);
            }
            if(res.data.msg == "signup success") {
                handleLogin(data);
            }
        })

    }

  return (
    <div>
      <GoogleLogin
            onSuccess={credentialResponse => {
                handleLogin(credentialResponse)
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    </div>
  );
}

export default GoogleLoginComponent;
