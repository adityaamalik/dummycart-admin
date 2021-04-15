import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Image, Input, message, Radio, Row, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;
const Product = (props) => {
  const { id } = props.location.state;

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [showDetails, toggleDetails] = useState(true);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState();
  const [colours, setColours] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setGallery(response.data.images);
        setProduct(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const onUploadPhotos = () => {
    const formData = new FormData();

    for (let image of images) {
      formData.append("images", image);
    }

    axios
      .put(`http://localhost:3000/products/gallery-images/${id}`, formData)
      .then((response) => {
        setGallery(response.data.images);
        document.getElementById("images").value = null;
        setGallery([]);
        message.success("Successfully uploaded the photos");
      })
      .catch((err) => {
        message.error("Some error occured");
      });
  };

  const removeImages = () => {
    const formData = new FormData();

    const emptyImgs = [];

    formData.append("images", emptyImgs);

    axios
      .put(`http://localhost:3000/products/gallery-images/${id}`, formData)
      .then((response) => {
        setGallery(response.data.images);
        message.success("Successfully removed all the phots");
      })
      .catch((err) => {
        message.error("Some error occured");
      });
  };

  const submitProduct = () => {
    const colourArray = colours.split(",");
    const formData = new FormData();

    if (name !== "") {
      formData.append("name", name);
    }
    if (description !== "") {
      formData.append("description", description);
    }
    if (originalPrice !== "") {
      formData.append("originalPrice", originalPrice);
    }
    if (discountedPrice !== "") {
      formData.append("discountedPrice", discountedPrice);
    }
    if (isFeatured !== undefined) {
      formData.append("isFeatured", isFeatured);
    }
    if (colours !== "") {
      formData.append("colours", colourArray);
    }
    if (category !== "") {
      formData.append("category", category);
    }

    axios
      .put(`http://localhost:3000/products/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setName("");
        setDescription("");
        setOriginalPrice("");
        setDiscountedPrice("");
        setIsFeatured();
        setCategory("");
        setColours("");
        message.success("Successfully updated the product");
      })
      .catch((error) => {
        console.log(error);

        message.error("Some error occured");
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.pathname = "/products";
        message.success("Successfully deleted the product");
      })
      .catch((err) => {
        console.log(err);
        message.error("Cannot delete the product");
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
        <h1>Name : {product.name}</h1>
        {!!product.image && (
          <Image
            width="300px"
            height="auto"
            src={`data:image/${
              product.image.contentType
            };base64,${new Buffer.from(product.image.data).toString("base64")}`}
          />
        )}
        <br />

        <Row>
          {gallery.map((img, index) => {
            return (
              <Col lg={6} md={12} sm={24} xs={24} key={index}>
                {!!img && (
                  <Image
                    src={`data:image/${
                      img.contentType
                    };base64,${new Buffer.from(img.data).toString("base64")}`}
                    alt="gallery image"
                    width="200px"
                    style={{ margin: "10px" }}
                  />
                )}
              </Col>
            );
          })}
        </Row>

        <div>
          <Button onClick={() => removeImages()}>Delete All Images</Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="images">Select Image Gallery : </label>
          <input
            required
            id="images"
            type="file"
            multiple
            onChange={(e) => {
              let arr = [];
              for (let file of e.target.files) {
                arr.push(file);
              }
              setImages([...arr]);
            }}
          />
        </div>
        {images.length !== 0 && (
          <>
            <br />
            <Button onClick={() => onUploadPhotos()}>Upload Images</Button>
          </>
        )}

        <br />
        <br />

        <div style={{ display: showDetails ? "block" : "none" }}>
          <p>Description : {product.description}</p>
          <br />
          <p>Original Price : {product.originalPrice}</p>
          <br />
          <p>Discounted Price : {product.discountedPrice}</p>
          <br />
          <p>Colours : {product.colours}</p>
          <br />
          <p>Featured Item : {product.isFeatured ? "Yes" : "No"}</p>
        </div>

        <br />
        <br />

        <Button onClick={() => toggleDetails(!showDetails)}>
          Edit Product Details
        </Button>

        <br />
        <br />

        <div
          style={{ display: showDetails ? "none" : "block", marginTop: "15px" }}
        >
          <Input
            required
            style={{ margin: "10px", width: "300px" }}
            type="text"
            value={name}
            placeholder="Name"
            onChange={(val) => setName(val.target.value)}
          />
          <br />
          <TextArea
            required
            style={{ margin: "10px", width: "300px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <br />
          <Input
            required
            style={{ margin: "10px", width: "300px" }}
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Orginal Price"
          />
          <br />
          <Input
            required
            style={{ margin: "10px", width: "300px" }}
            type="number"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            placeholder="Discounted Price"
          />
          <br />
          <Select
            required
            placeholder="Select Category"
            style={{ margin: "10px", width: 200 }}
            onChange={(val) => setCategory(val)}
          >
            {categories.map((val) => {
              return (
                <Option key={val._id} value={val._id}>
                  {val.name}
                </Option>
              );
            })}
          </Select>
          <br />
          <Radio.Group
            style={{ margin: "10px", width: "300px" }}
            onChange={(e) => setIsFeatured(e.target.value)}
            value={isFeatured}
          >
            <Radio value={true}>Featured Item</Radio>
            <Radio value={false}>Not Featured</Radio>
          </Radio.Group>
          <br />
          <Input
            type="text"
            placeholder="Enter comma separated color hex codes"
            value={colours}
            onChange={(e) => setColours(e.target.value)}
            style={{ margin: "10px", width: "300px" }}
          />
          <br />
          <Button onClick={() => submitProduct()} style={{ margin: "10px" }}>
            Post
          </Button>
          <br />
          <br />
        </div>
        <Button danger onClick={() => deleteProduct()}>
          Delete Product
        </Button>
        <br />
        <br />
      </div>
    </>
  );
};

export default Product;
