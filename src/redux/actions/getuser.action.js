import axios from "axios";

export const getuser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GETUSER_REQUEST",
    });
    const data = await axios.get(
      `http://localhost:3000/users/${localStorage.getItem("userid")}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    dispatch({
      type: "GETUSER_SUCCESS",
      payload: {
        user: data.data.data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "GETUSER_ERROR",
      payload: error.response.data,
    });
  }
};
