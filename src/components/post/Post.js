import React, { useState } from "react";
import "./Post.scss";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import image from "../../image/PngItem_1468479.png";
import like from "../../image/like/SeekPng.com_addition-sign-png_3994068.png";
import share from "../../image/share/share.png";
import { useSelector } from "react-redux";
import {
  deletingpost,
  togglinglikepost,
  sharepost,
  commenting,
} from "../../redux/actions/getposts.action";
import EditIcon from "@material-ui/icons/Edit";
function Post({ post, setnum }) {
  let { user } = useSelector((state) => state.getuserdata);
  const dispatch = useDispatch();

  const deletepost = (id) => {
    dispatch(deletingpost(id));
  };
  const likeHandler = (id) => {
    dispatch(togglinglikepost(id));
  };
  const shareHandler = (id) => {
    dispatch(sharepost(id));
  };

  const [comment, setComment] = useState("");
  const resetForm = () => {
    setComment("");
  };
  const handleSubmitComment = (id) => {
    dispatch(commenting(id, comment));
    resetForm();
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={image} alt="" />

            <span className="postUsername">{post?.user.name}</span>
          </div>
          <div className="postTopRight">
            {post?.userId === user._id ? (
              <>
                <IconButton onClick={() => setnum(post._id)}>
                  <EditIcon color="primary" />
                </IconButton>

                <IconButton onClick={() => deletepost(post._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="postCenter">
          <h3>{post?.name}</h3>
          <b>Status:</b>
          <p>{post?.status}</p>
          <b>Description:</b>
          <p>{post?.description}</p>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {post?.userId !== user._id ? (
              <IconButton className="shareIconbutton">
                <img
                  className="shareIcon"
                  src={share}
                  onClick={() => shareHandler(post?._id)}
                  alt=""
                />
              </IconButton>
            ) : (
              ""
            )}
            <IconButton className="likeIconbutton">
              <img
                className="likeIcon"
                src={like}
                onClick={() => likeHandler(post?._id)}
                alt=""
              />
            </IconButton>
            <span className="postLikeCounter">
              &nbsp; Likes:{post?.likers.length}&nbsp; Shares:
              {post?.sharers.length}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post?.commenters.length} comments
            </span>
          </div>
        </div>
        <hr />
        {post?.commenters.length >= 1 ? (
          <ul className="commentList">
            {post?.commenters.map((p) => (
              <li className="commentList_line">
                <div className="commentList_user">
                  <img className="postProfileImg" src={image} alt="" />
                  <span className="postUsername">{p.user.name}:</span>
                </div>
                <p>{p.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
        <div className="commentsection">
          <div className="commentsection_topLefta">
            <div className="commentsection_topLeftb">
              <img className="postProfileImg" src={image} alt="" />
            </div>
            <TextField
              id="standard-basic"
              label="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {comment.length > 0 ? (
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="secondary"
              onClick={() => handleSubmitComment(post?._id)}
            >
              Comment
            </Button>
          ) : (
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="secondary"
              disabled
            >
              Comment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
