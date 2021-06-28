import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import "./Home.scss";
import TopBar from "../topbar/TopBar";
import SideBar from "../sidebar/SideBar";
import Feed from "../feed/Feed";
import RightBar from "../rightbar/RightBar";
import { getuser } from "../../redux/actions/getuser.action";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </>
  );
}

export default Home;
