import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Input, message } from "antd";

const Category = (props) => {
  const { d } = props.location.state;

  const [category, setCategory] = useState({});
  const [name, setName] = useState("");
  const [imageURI, setImageURI] = useState("");

  const [showEditBox, toggleEditBox] = useState(false);

  useEffect(() => {
    axios
      .get(`/categories/${d.id}`)
      .then((response) => setCategory(response.data))
      .catch((err) => console.log(err));
  }, [d]);

  const submitCategory = () => {
    const data = {
      name: name,
      image: imageURI,
    };

    axios
      .put(`/categories/${d.id}`, data)
      .then((response) => {
        setCategory(response.data);
        setName("");
        setImageURI("");
        message.success("Successfully updated the category name");
      })
      .catch((error) => {
        console.log(error);

        message.error("Some error occured");
      });
  };

  const deleteCategory = () => {
    axios
      .delete(`/categories/${d.id}`)
      .then((response) => {
        message
          .success("Category deleted successfully !")
          .then(() => (window.location.pathname = "/categories"));
      })
      .catch((err) => {
        message.error("Cannot delete category !");
      });
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        {console.log(category)}
        <h1>Name : {category.name}</h1>
        {!!category.image && (
          <Image width="300px" height="auto" src={category.image} />
        )}

        <br />
        <Button onClick={() => toggleEditBox(!showEditBox)}>
          Edit category
        </Button>

        <br />

        <div
          style={{
            display: showEditBox ? "block" : "none",
            marginTop: "15px",
          }}
        >
          <Input
            required
            style={{ margin: "10px", width: "300px" }}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Input
            required
            style={{ margin: "10px", width: "300px" }}
            type="text"
            placeholder="Image URL"
            value={imageURI}
            onChange={(e) => setImageURI(e.target.value)}
          />
          <br />
          <Button onClick={() => submitCategory()}>Submit</Button>
        </div>
        <br />

        <hr />

        <div
          style={{
            marginTop: "15px",
          }}
        >
          <Button danger type="default" onClick={() => deleteCategory()}>
            Delete Category
          </Button>
        </div>
      </div>
    </>
  );
};

export default Category;
