import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signin } from "../../redux/actions/signin.action";
import "./SignInPage.scss";
import { useHistory } from "react-router-dom";
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

function SignInPage() {
  let { user, token, error } = useSelector((state) => state.signindata);
  console.log(user);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

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

  const submit = () => {
    dispatch(signin(email, password));
    // if (accessToken && user_name && password) {
    //   localStorage.setItem("accessToken", accessToken);
    // }
  };
  const goToSignUp = () => {
    history.push("/signup");
  };

  return (
    <div className="fullscreen-wrapper">
      <img src="/images/login-hero.svg" alt="" />
      <FormContainer>
        <Heading>Hello there!</Heading>
        <p>Fill in your email and password to sign in.</p>

        {user.name ? (
          <h3>User {user.name} Logged In Successfully</h3>
        ) : (
          error && <ErrorMessage message={error.message} />
        )}
        {console.log(user, token)}

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

        <p>
          Passwords must contain at least 1 upper case letter, 1 lower case
          letter and one number OR special charracter.
        </p>
        <hr />
        <div>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={submit}
          >
            SIGN IN
          </Button>
          <Button fullWidth onClick={goToSignUp}>
            Don't have an account? Sign up now!
          </Button>
        </div>
      </FormContainer>
    </div>
  );
}

export default SignInPage;
