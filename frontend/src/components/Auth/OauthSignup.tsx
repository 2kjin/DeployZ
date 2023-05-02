import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OauthSignup() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const accessToken = String(params.get("access_token"));
  const refreshToken = String(params.get("refresh_token"));
  const registrationId = String(params.get("registrationId"));
  
  console.log(window.location.search)
  console.log(accessToken)
  console.log(refreshToken)
  console.log(registrationId)

  const handleToken = () => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("registrationId", registrationId);
  };

  useEffect(() => {
    handleToken();
    navigate("/signup");
  }, []);
  return 
  <></>
}

