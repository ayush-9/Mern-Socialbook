import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import { useDispatch } from "react-redux";
import "./Feed.scss";
import { getposts } from "../../redux/actions/getposts.action";
import { useSelector } from "react-redux";
import CreatePost from "../createpost/CreatePost";
function Feed() {
  let { posts } = useSelector((state) => state.getpostsdata);
  const dispatch = useDispatch();
  const [num, setnum] = useState(0);
  useEffect(() => {
    dispatch(getposts());
  }, [dispatch]);

  return (
    <div className="feed">
      <div className="feed_wrapper">
        <ul className="feed_list">
          <CreatePost num={num} setnum={setnum} />
          {posts.map((p) => (
            <Post post={p} setnum={setnum} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Feed;
