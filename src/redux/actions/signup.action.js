import axios from "axios";

export const signup =
  (username, email, password, confirmpassword) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "SIGNUP_REQUEST",
      });
      const data = await axios.post("http://localhost:3000/users/signup", {
        name: username,
        email,
        password,
        passwordConfirm: confirmpassword,
      });
      console.log(data);
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: {
          token: data.data.token,
          user: data.data.data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "SIGNUP_ERROR",
        payload: error.response.data,
      });
    }
  };
