import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";
import { Input, Button, message } from "antd";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, toggleCategoryInput] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitCategory = () => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", name);

    axios
      .post("http://localhost:3000/categories", formData)
      .then((response) => {
        console.log(response.data);
        setCategories([...categories, response.data]);
        setName("");
        message.success("Successfully created the new category");
      })
      .catch((error) => {
        console.log(error);
        setName("");
        message.error("Some error occured");
      });
  };

  return (
    <>
      <div
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        <h1>Categories</h1>
        <Button onClick={() => toggleCategoryInput(!categoryInput)}>
          Add New Category
        </Button>
        {categoryInput && (
          <div style={{ marginTop: "15px" }}>
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={name}
              placeholder="Name"
              onChange={(val) => setName(val.target.value)}
            />
            <br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <Button onClick={() => submitCategory()} style={{ margin: "10px" }}>
              Post
            </Button>
          </div>
        )}
        <Grid gridOf="category" data={categories} />
      </div>
    </>
  );
};

export default Categories;
