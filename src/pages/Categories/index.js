import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";
import { Input, Button, message } from "antd";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, toggleCategoryInput] = useState(false);
  const [name, setName] = useState("");
  const [imageURI, setImageURI] = useState("");

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitCategory = () => {
    const data = {
      name: name,
      image: imageURI,
    };

    axios
      .post("/categories", data)
      .then((response) => {
        console.log(response.data);
        setCategories([...categories, response.data]);
        setName("");
        message.success("Successfully created the new category");
      })
      .catch((error) => {
        console.log(error);

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
            <Input
              required
              style={{ margin: "10px", width: "80%" }}
              type="text"
              value={imageURI}
              placeholder="Image URL"
              onChange={(val) => setImageURI(val.target.value)}
            />
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
