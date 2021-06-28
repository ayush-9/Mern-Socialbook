import axios from "axios";

export const getposts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GETPOSTS_REQUEST",
    });
    const data = await axios.get(`http://localhost:3000/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    dispatch({
      type: "GETPOSTS_SUCCESS",
      payload: {
        posts: data.data.data.posts,
      },
    });
  } catch (error) {
    dispatch({
      type: "GETPOSTS_ERROR",
      payload: error.response?.data,
    });
  }
};

export const deletingpost = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:3000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      dispatch({
        type: "DELETEPOST",
        payload: { id: res.data.data.post._id },
      });
    })
    .catch((err) =>
      dispatch({
        type: "DELETEPOST_ERROR",
        payload: err.response?.data,
      })
    );
};

export const create = (name, description, status) => (dispatch) => {
  axios
    .post(
      `http://localhost:3000/posts/`,
      { name, description, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "CREATE",
        payload: { post: res.data.data.post },
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err.response?.data,
      })
    );
};
export const update = (num, name, description, status) => (dispatch) => {
  axios
    .patch(
      `http://localhost:3000/posts/${num}`,
      { name, description, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "UPDATE",
        payload: { post: res.data.data.post },
      });
    })
    .catch((err) =>
      dispatch({
        type: "UPDATE_ERROR",
        payload: err.response?.data,
      })
    );
};

export const togglinglikepost = (id) => (dispatch) => {
  axios
    .post(
      `http://localhost:3000/posts/togglelikepost`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "UPDATE",
        payload: { post: res.data.data.post },
      });
      //dispatch(getposts());
    })
    .catch((err) =>
      dispatch({
        type: "UPDATE_ERROR",
        payload: err.response?.data,
      })
    );
};

export const commenting = (id, comment) => (dispatch) => {
  axios
    .post(
      `http://localhost:3000/posts/postcomment`,
      { id, comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "COMMENT",
        payload: { post: res.data.data.post },
      });
      //dispatch(getposts());
    })
    .catch((err) =>
      dispatch({
        type: "COMMENT_ERROR",
        payload: err.response?.data,
      })
    );
};

export const sharepost = (id) => (dispatch) => {
  axios
    .post(
      `http://localhost:3000/posts/sharepost`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      dispatch({
        type: "CREATE",
        payload: { post: res.data.sharedpost },
      });
      //   dispatch(getposts());
      dispatch({
        type: "UPDATE",
        payload: { post: res.data.post },
      });
    })
    .catch((err) =>
      dispatch({
        type: "CREATE_ERROR",
        payload: err.response?.data,
      })
    );
};
