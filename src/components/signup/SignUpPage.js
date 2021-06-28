import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./SignUpPage.scss";
import { useHistory } from "react-router-dom";
import { signup } from "../../redux/actions/signup.action";
import ErrorMessage from "../ErrorMessage";
//import { Redirect } from "react-router-dom";
const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #white;
  padding: 30px;
  border-radius: 5px;
  margin-right: 100px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

function SignUpPage() {
  let { user, token, error } = useSelector((state) => state.signindata);
  const [user_name, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  //const [redirectTo, setRedirectTo] = useState(false);
  let history = useHistory();
  useEffect(() => {
    (() => {
      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userid", user._id);
      }
      if (localStorage.getItem("accessToken")) {
        history.push("/home");
      }
    })();
  });
  const dispatch = useDispatch();
  const goToSignIn = () => {
    history.push("/signin");
  };
  const submit = () => {
    dispatch(signup(user_name, email, password, confirmpassword));
  };

  return (
    <div className="fullscreen-wrapper">
      <img src="/images/login-hero.svg" alt="" />
      <FormContainer>
        <Heading>Socialbook</Heading>

        <p>Welcome to your social community</p>

        {user.name ? (
          <h3>User {user.name} Registered Successfully</h3>
        ) : (
          error && <ErrorMessage message={error.message} />
        )}
        {console.log(user, token)}
        <div>
          <FormField
            id="outlined-name"
            label="Username"
            margin="dense"
            variant="outlined"
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Email"
            margin="dense"
            variant="outlined"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Password"
            margin="dense"
            variant="outlined"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Confirm Password"
            margin="dense"
            variant="outlined"
            type="password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div>
        <p>Passwords must contain at least 8 characters.</p>
        <hr />
        <div>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={submit}
          >
            SIGN UP
          </Button>
          <Button fullWidth onClick={goToSignIn}>
            Already have a account? Sign in now!
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}

export default SignUpPage;
