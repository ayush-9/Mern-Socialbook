export const getpostsReducer = (
  state = {
    posts: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "GETPOSTS_SUCCESS":
      return {
        ...state,
        posts: payload.posts,

        loading: false,
      };

    case "GETPOSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "GETPOSTS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETEPOST":
      return {
        ...state,
        posts: state.posts.filter((x) => x._id !== payload.id),
      };
    case "DELETEPOST_ERROR":
      return {
        ...state,
        error: payload,
      };

    case "CREATE":
      return {
        ...state,
        posts: [payload.post, ...state.posts],
        error: undefined,
      };
    case "CREATE_ERROR":
      return {
        ...state,
        error: payload,
      };

    case "UPDATE":
      return {
        ...state,
        posts: state.posts.map((x) =>
          x._id === payload.post._id ? payload.post : x
        ),
        error: undefined,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        error: payload,
      };
    case "COMMENT":
      return {
        ...state,
        posts: state.posts.map((x) =>
          x._id === payload.post._id ? payload.post : x
        ),
      };
    case "COMMENT_ERROR":
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
