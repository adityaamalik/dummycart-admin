import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Input, message } from "antd";

const Category = (props) => {
  const { id } = props.location.state;

  const [category, setCategory] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState({});

  const [showNameEditBox, toggleNameEditBox] = useState(false);
  const [showImageEditBox, toggleImageEditBox] = useState(false);

  useEffect(() => {
    axios
      .get(`https://myindianthings-backend.herokuapp.com/categories/${id}`)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const submitName = () => {
    if (name === "") {
      message.error("Please enter name to update !");
    } else {
      const formData = new FormData();
      formData.append("name", name);

      axios
        .put(
          `https://myindianthings-backend.herokuapp.com/categories/${id}`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          setCategory(response.data);
          setName("");
          message.success("Successfully updated the category name");
        })
        .catch((error) => {
          console.log(error);

          message.error("Some error occured");
        });
    }
  };

  const submitImage = () => {
    if (
      image &&
      Object.keys(image).length === 0 &&
      image.constructor === Object
    ) {
      message.error("Please select an image first");
    } else {
      const formData = new FormData();
      formData.append("image", image);
      axios
        .put(
          `https://myindianthings-backend.herokuapp.com/categories/${id}`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          setCategory(response.data);
          document.getElementById("img").value = null;
          setImage({});
          message.success("Successfully updated the category image");
        })
        .catch((error) => {
          console.log(error);

          message.error("Some error occured");
        });
    }
  };

  const deleteCategory = () => {
    axios
      .delete(`https://myindianthings-backend.herokuapp.com/categories/${id}`)
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
        <h1>Name : {category.name}</h1>
        {!!category.image && (
          <Image width="300px" height="auto" src={category.image} />
        )}

        <br />
        <Button onClick={() => toggleNameEditBox(!showNameEditBox)}>
          Edit category Name
        </Button>

        <br />

        <div
          style={{
            display: showNameEditBox ? "block" : "none",
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
          <Button onClick={() => submitName()}>Update Name</Button>
        </div>
        <br />

        <hr />

        <br />
        <Button onClick={() => toggleImageEditBox(!showImageEditBox)}>
          Edit category Image
        </Button>

        <br />

        <div
          style={{
            display: showImageEditBox ? "block" : "none",
            marginTop: "15px",
          }}
        >
          <br />
          <label htmlFor="img">Select single image :</label>
          <input
            required
            style={{ margin: "10px", width: "300px" }}
            id="img"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <Button onClick={() => submitImage()}>Update Image</Button>
        </div>

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
