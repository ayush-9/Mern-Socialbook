import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import image from "../../image/PngItem_1468479.png";
import { getuser } from "../../redux/actions/getuser.action";
import { getposts } from "../../redux/actions/getposts.action";
import { friendreq } from "../../redux/actions/friendreq.action";

function FriendCard({ u, fr }) {
  const dispatch = useDispatch();
  const [text, settext] = useState(fr ? "Accept Request" : "Add friend");
  const handlesendoracceptrequest = async (u) => {
    let message = await axios.post(
      fr
        ? "http://localhost:3000/users/acceptfriendrequest"
        : "http://localhost:3000/users/sendfriendrequest",
      {
        id: u._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    dispatch(getuser());
    dispatch(getposts());
    dispatch(friendreq());
    console.log(message);
  };
  return (
    <div>
      <li className="sidebarFriend">
        <div className="sidebarFriendtub">
          <img className="sidebarFriendImg" src={image} alt="" />
          <span className="sidebarFriendName">{u.name}</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handlesendoracceptrequest(u);
            settext(fr ? "Request Accepted" : "Request Sent");
          }}
        >
          {text}
        </Button>
      </li>
    </div>
  );
}

export default FriendCard;
