import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";
import { Button, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogInput, toggleBlogInput] = useState(false);
  const [title, setBlogTitle] = useState("");
  const [content, setBlogContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitBlog = () => {
    const fmData = new FormData();

    fmData.append("title", title);
    fmData.append("content", content);
    fmData.append("image", image);

    axios.post("http://localhost:3000/blogs", fmData).then(
      (response) => {
        console.log(response.data);
        setBlogs([...blogs, response.data]);
        document.getElementById("image").value = null;
        setBlogTitle("");
        setBlogContent("");
        message.success("New blog posted");
      },
      (error) => {
        console.log(error);
        message.error("Some error occured");
      }
    );
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
    >
      <h1>Blogs</h1>
      <Button onClick={() => toggleBlogInput(!blogInput)}>Add New blog</Button>
      {blogInput && (
        <div style={{ marginTop: "15px" }}>
          <Input
            style={{ margin: "10px", width: "80%" }}
            type="text"
            value={title}
            placeholder="Title"
            onChange={(val) => setBlogTitle(val.target.value)}
          />
          <TextArea
            style={{ margin: "10px", width: "80%" }}
            placeholder="Content"
            value={content}
            onChange={(val) => setBlogContent(val.target.value)}
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
          <Button onClick={() => submitBlog()} style={{ margin: "10px" }}>
            Post
          </Button>
        </div>
      )}

      <Grid gridOf="blog" data={blogs} />
    </div>
  );
};

export default Blogs;
