import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./TopBar.scss";
import axios from "axios";
function TopBar() {
  let { friendrequests } = useSelector((state) => state.friendreqdata);
  let { user } = useSelector((state) => state.getuserdata);

  const dispatch = useDispatch();
  let history = useHistory();

  const SignOut = () => {
    //window.location.reload();
    //
    //Important Note below :
    //
    /* Here below we are making token undefined and user as {} so that state of token and user does not remain same(which was set while doing signin/signup),
      Now when we push history to signin or sign up previous token and user state doesnt remain and it doesnot redirect us to home again.
      {hence no need of using window.location.reload();}
      */
    dispatch({
      type: "SIGNIN_SUCCESS",
      payload: {
        token: undefined,
        user: {},
      },
    });
    dispatch({
      type: "SIGNIN_ERROR",
      payload: {
        error: null,
      },
    });
    dispatch({
      type: "GETPOSTS_ERROR",
      payload: {
        error: null,
      },
    });
    history.push("/signin");
  };
  const handleSignOut = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid");
    await axios.get("http://localhost:3000/users/logout");
    //console.log(data);

    SignOut();
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socialbook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search post or video" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <span>{user.name}</span>
          </div>
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">{friendrequests.length}</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">{friendrequests.length}</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">{friendrequests.length}</span>
          </div>
          <div>
            <IconButton onClick={handleSignOut}>
              <SignOutIcon className="signOutIcon" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
