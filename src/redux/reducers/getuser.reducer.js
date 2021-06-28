export const getuserReducer = (
  state = {
    user: {},
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "GETUSER_SUCCESS":
      return {
        ...state,
        user: payload.user,

        loading: false,
      };

    case "GETUSER_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "GETUSER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
