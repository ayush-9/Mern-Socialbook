export const friendreqReducer = (
  state = {
    friendrequests: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case "FRIENDREQ_SUCCESS":
      return {
        ...state,
        friendrequests: payload.friendrequests,

        loading: false,
      };

    case "FRIENDREQ_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case "FRIENDREQ_REQUEST":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
