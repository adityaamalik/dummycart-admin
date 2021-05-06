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
    axios
      .get(`/blogs/${d.id}`)
      .then((response) => setBlog(response.data))
      .catch((err) => console.log(err));
  }, [d.id]);

  const submitBlog = () => {
    const data = {
      title: title,
      content: content,
      image: image,
    };

    axios.put(`/blogs/${d.id}`, data).then(
      (response) => {
        console.log(response.data);
        setBlog(response.data);
        setTitle("");
        setContent("");
        setImage("");
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
      .delete(`/blogs/${d.id}`)
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
      {!!blog.image && <Image width="300px" height="auto" src={blog.image} />}

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
        <Input
          style={{ margin: "10px", width: "300px" }}
          type="text"
          value={image}
          placeholder="Image URL"
          onChange={(val) => setImage(val.target.value)}
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
