import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          await axios.post(`${server}/user/activation`, {
            activation_token,
          }).then((res)=>{
            console.log(res);
          })
          
        } catch (err) {
          console.log(err.message);
          setError(true);
        }
        console.log(activation_token);
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your Token is Expired !</p>
      ) : (
        <p>Account Activated Successfully !</p>
      )}
    </div>
  );
};

export default ActivationPage;
