export const searchuserReducer = (
  state = {
    users: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "SEARCHUSER_SUCCESS":
      return {
        ...state,
        users: payload.users,

        loading: false,
      };
    case "SEARCHUSER_MODIFY":
      return {
        ...state,
        users: state.users.filter(
          ({ _id: id1 }) => !payload.users.some(({ _id: id2 }) => id2 === id1)
        ),

        loading: false,
      };

    case "SEARCHUSER_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "SEARCHUSER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
