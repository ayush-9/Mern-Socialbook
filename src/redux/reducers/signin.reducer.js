export const signinReducer = (
  state = {
    user: {},
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
      };

    case "SIGNUP_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SIGNUP_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        loading: false,
      };

    case "SIGNIN_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SIGNIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
