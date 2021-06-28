import axios from "axios";

export const signin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "SIGNIN_REQUEST",
    });
    const data = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
    console.log(data);
    dispatch({
      type: "SIGNIN_SUCCESS",
      payload: {
        token: data.data.token,
        user: data.data.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "SIGNIN_ERROR",
      payload: error.response.data,
    });
  }
};
