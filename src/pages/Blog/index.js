import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Image, Input, message } from "antd";

const { TextArea } = Input;

const Blog = (props) => {
  const { d } = props.location.state;

  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [showEditBox, toggleEditBox] = useState(false);

  useEffect(() => {
    setBlog(d);
  }, [d]);

  const submitBlog = () => {
    const fmData = new FormData();

    fmData.append("title", title);
    fmData.append("content", content);
    fmData.append("image", image);

    axios
      .put(`https://myindianthings-backend.herokuapp.com/blogs/${d.id}`, fmData)
      .then(
        (response) => {
          console.log(response.data);
          setBlog(response.data);
          document.getElementById("image").value = null;
          setTitle("");
          setContent("");
          message.success("Blog updated !");
        },
        (error) => {
          console.log(error);
          message.error("Some error occured");
        }
      );
  };

  const deleteBlog = () => {
    axios
      .delete(`https://myindianthings-backend.herokuapp.com/blogs/${d.id}`)
      .then((response) => {
        message.success("Deleted the blog successfully !");
        window.location.pathname = "/blogs";
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        marginBottom: "30px",
      }}
    >
      <h1>Title : {blog.title}</h1>
      <h2>Content : {blog.content}</h2>
      {!!blog.image && (
        <Image
          width="300px"
          height="auto"
          src={`data:image/${blog.image.contentType};base64,${new Buffer.from(
            blog.image.data
          ).toString("base64")}`}
        />
      )}

      <br />
      <br />
      <Button onClick={() => toggleEditBox(!showEditBox)}>
        Edit this blog
      </Button>
      <br />
      <br />
      <div style={{ display: showEditBox ? "block" : "none" }}>
        <Input
          style={{ margin: "10px", width: "300px" }}
          type="text"
          value={title}
          placeholder="Title"
          onChange={(val) => setTitle(val.target.value)}
        />
        <br />
        <TextArea
          style={{ margin: "10px", width: "300px" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <br />
        <label htmlFor="image">Select Single Image : </label>
        <input
          required
          id="image"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <br />
        <Button onClick={() => submitBlog()}>Submit</Button>
      </div>

      <br />
      <br />
      <br />
      <Button danger onClick={() => deleteBlog()}>
        Delete this blog
      </Button>
    </div>
  );
};

export default Blog;
