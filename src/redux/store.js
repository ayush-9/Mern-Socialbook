import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { signinReducer } from "./reducers/signin.reducer";
import { getuserReducer } from "./reducers/getuser.reducer";
import { getpostsReducer } from "./reducers/getposts.reducer";
import { searchuserReducer } from "./reducers/searchuser.reducer";
import { friendreqReducer } from "./reducers/friendreq.reducer";

const rootReducer = combineReducers({
  signindata: signinReducer,
  getuserdata: getuserReducer,
  getpostsdata: getpostsReducer,
  searchuserdata: searchuserReducer,
  friendreqdata: friendreqReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
