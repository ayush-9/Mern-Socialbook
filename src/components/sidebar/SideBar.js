import React, { useEffect } from "react";
import "./SideBar.scss";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
} from "@material-ui/icons";

import FriendCard from "../friendcard/FriendCard";
import { friendreq } from "../../redux/actions/friendreq.action";

function SideBar() {
  const dispatch = useDispatch();
  let { friendrequests } = useSelector((state) => state.friendreqdata);

  useEffect(() => {
    dispatch(friendreq());
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li key="Feed" className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li key="Chats" className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li key="Videos" className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <hr className="sidebarHr" />
          <li key="Friend Requests" className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Friend Requests</span>
          </li>
        </ul>

        <ul className="sidebarFriendList">
          {friendrequests.map((u) => (
            <FriendCard key={u._id} u={u} fr={true} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
