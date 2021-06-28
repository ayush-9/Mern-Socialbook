import React, { useState, useEffect } from "react";
import { Search } from "@material-ui/icons";
import "./RightBar.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import FriendCard from "../friendcard/FriendCard";
function RightBar() {
  let { user } = useSelector((state) => state.getuserdata);
  let { users } = useSelector((state) => state.searchuserdata);

  const dispatch = useDispatch();
  const [search, setsearch] = useState("");
  useEffect(() => {
    (async () => {
      let res = await axios.get(
        `http://localhost:3000/users/search?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      let results = res.data.data.users.filter(
        ({ _id: id1 }) => !user.friends?.some(({ _id: id2 }) => id2 === id1)
      );
      //setsearchfriend(results);
      dispatch({
        type: "SEARCHUSER_SUCCESS",
        payload: {
          users: results,
        },
      });
    })();
  }, [dispatch, search, user.friends]);
  return (
    <div className="rightbar">
      <div className="rightsearchbar">
        <Search className="rightsearchIcon" />
        <input
          placeholder="Find users to send friend request.."
          className="rightsearchInput"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
      </div>
      <ul className="rightsidebarFriendList">
        {users.map((u) => (
          <FriendCard key={u._id} u={u} fr={false} />
        ))}
      </ul>
    </div>
  );
}

export default RightBar;
