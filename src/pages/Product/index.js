import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Image, message, Row } from "antd";

const Product = (props) => {
  const { id } = props.location.state;

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setGallery(response.data.images);
        setProduct(response.data);
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
        <Image width="300px" height="auto" src={product.image} />
        <br />

        <Row>
          {gallery.map((img, index) => {
            return (
              <Col lg={6} md={12} sm={24} xs={24} key={index}>
                <Image
                  src={img}
                  alt="gallery image"
                  width="200px"
                  style={{ margin: "10px" }}
                />
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
        <br />
        <Button onClick={() => onUploadPhotos()}>Upload Images</Button>
      </div>
    </>
  );
};

export default Product;
