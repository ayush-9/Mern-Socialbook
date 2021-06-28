import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Button,
  MenuItem,
  Select,
} from "@material-ui/core";
import styled from "styled-components";
import ErrorMessage from "../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { create, update } from "../../redux/actions/getposts.action";
import image from "../../image/PngItem_1468479.png";

const FormWrapper = styled.div`
  display: flex;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 30px;
  border-radius: 5px;
`;

const CreatePost = ({ num, setnum }) => {
  let { user } = useSelector((state) => state.getuserdata);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setstatus] = useState("");
  console.log(num);
  const { posts, error } = useSelector((state) => state.getpostsdata);
  const dispatch = useDispatch();
  useEffect(() => {
    if (num !== 0) {
      setName(posts.find((x) => x._id === num)?.name);
      setDescription(posts.find((x) => x._id === num)?.description);
      setstatus(posts.find((x) => x._id === num)?.status);
    }
  }, [num, posts]);
  const resetForm = () => {
    setName("");
    setDescription("");

    setstatus("");
  };

  const handleSubmitTask = () => {
    if (num !== 0) {
      dispatch(update(num, name, description, status));
    } else {
      dispatch(create(name, description, status));
    }

    setnum(0);
    resetForm();
  };

  return (
    <FormWrapper>
      <FormContainer>
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={image} alt="" />

            <span className="postUsername">{user.name}</span>
          </div>
        </div>
        {error && <ErrorMessage message={error?.message} />}
        <FormControl fullWidth>
          <TextField
            name="name"
            label="Name"
            placeholder="Title"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            name="description"
            label="Description"
            placeholder="Description"
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl style={{ width: "140px" }}>
          <Select
            name="status"
            label="Status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            displayEmpty
          >
            <MenuItem value={""}>Select Status</MenuItem>
            <MenuItem value={"pending"}>PENDING</MenuItem>
            <MenuItem value={"progress"}>PROGRESS</MenuItem>

            <MenuItem value={"done"}>DONE</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="primary"
            onClick={handleSubmitTask}
          >
            {num !== 0 ? "DONE" : "POST"}
          </Button>
        </FormControl>
      </FormContainer>
    </FormWrapper>
  );
};

export default CreatePost;
