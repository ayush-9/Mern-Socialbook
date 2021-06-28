import axios from "axios";

export const friendreq = () => async (dispatch, getState) => {
  let res = await axios.get("http://localhost:3000/users/friendrequests", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  dispatch({
    type: "FRIENDREQ_SUCCESS",
    payload: {
      friendrequests: res.data.data.friendrequestArray,
    },
  });
  dispatch({
    type: "SEARCHUSER_MODIFY",
    payload: {
      users: res.data.data.friendrequestArray,
    },
  });
};
