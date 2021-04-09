import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        Blogs
      </h1>

      <Grid gridOf="blogs" />
    </>
  );
};

export default Blogs;
