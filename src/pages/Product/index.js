import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Image, Input, message, Radio, Row, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;
const Product = (props) => {
  const { d, id } = props.location.state;

  const [product, setProduct] = useState({});
  const [showDetails, toggleDetails] = useState(true);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [isFeatured, setIsFeatured] = useState();
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState();

  const [imageURI, setImageURI] = useState("");
  const [showGalleryInput, toggleGalleryInput] = useState(false);

  const [galleryImage1, setGalleryImage1] = useState("");
  const [color1, setColor1] = useState("");
  const [galleryImage2, setGalleryImage2] = useState("");
  const [color2, setColor2] = useState("");
  const [galleryImage3, setGalleryImage3] = useState("");
  const [color3, setColor3] = useState("");
  const [galleryImage4, setGalleryImage4] = useState("");
  const [color4, setColor4] = useState("");
  const [galleryImage5, setGalleryImage5] = useState("");
  const [color5, setColor5] = useState("");
  const [galleryImage6, setGalleryImage6] = useState("");
  const [color6, setColor6] = useState("");
  const [galleryImage7, setGalleryImage7] = useState("");
  const [color7, setColor7] = useState("");

  useEffect(() => {
    axios
      .get(`/products/${id || d.id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, [d, id]);

  const submitProduct = () => {
    const data = {
      image: imageURI,
      name: name,
      description: description,
      originalPrice: originalPrice,
      discountPercentage: discountPercentage,
      isFeatured: isFeatured,
      inStock: inStock,
      category: category,
      galleryImage1: galleryImage1,
      color1: color1,
      galleryImage2: galleryImage2,
      color2: color2,
      galleryImage3: galleryImage3,
      color3: color3,
      galleryImage4: galleryImage4,
      color4: color4,
      galleryImage5: galleryImage5,
      color5: color5,
      galleryImage6: galleryImage6,
      color6: color6,
      galleryImage7: galleryImage7,
      color7: color7,
    };

    axios
      .put(`/products/${d.id || id}`, data)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setName("");
        setImageURI("");
        setDescription("");
        setOriginalPrice("");
        setDiscountPercentage("");
        setCategory("");
        setGalleryImage1("");
        setColor1("");
        setGalleryImage2("");
        setColor2("");
        setGalleryImage3("");
        setColor3("");
        setGalleryImage4("");
        setColor4("");
        setGalleryImage5("");
        setColor5("");
        setGalleryImage6("");
        setColor6("");
        setGalleryImage7("");
        setColor7("");
        message.success("Successfully updated the product");
      })
      .catch((error) => {
        console.log(error);

        message.error("Some error occured");
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`/products/${d.id || id}`)
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
        <Image width="300px" height="auto" src={product.image} />
        <br />

        <hr />
        <Row>
          {!!product.galleryImage1 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage1}
                alt="gallery image 1"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 1</h3>
              <h4>Color : {product.color1}</h4>
            </Col>
          )}

          {!!product.galleryImage2 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage2}
                alt="gallery image 2"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 2</h3>
              <h4>Color : {product.color2}</h4>
            </Col>
          )}
        </Row>

        <Row>
          {!!product.galleryImage3 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage3}
                alt="gallery image 3"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 3</h3>
              <h4>Color : {product.color3}</h4>
            </Col>
          )}

          {!!product.galleryImage4 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage4}
                alt="gallery image 4"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 4</h3>
              <h4>Color : {product.color4}</h4>
            </Col>
          )}
        </Row>

        <Row>
          {!!product.galleryImage5 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage5}
                alt="gallery image 5"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 5</h3>
              <h4>Color : {product.color5}</h4>
            </Col>
          )}

          {!!product.galleryImage6 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage6}
                alt="gallery image 6"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 6</h3>
              <h4>Color : {product.color6}</h4>
            </Col>
          )}
        </Row>

        <Row>
          {!!product.galleryImage7 && (
            <Col lg={12} md={12} sm={24} xs={24}>
              <Image
                src={product.galleryImage7}
                alt="gallery image 7"
                width="200px"
                style={{ margin: "10px" }}
              />
              <br />
              <h3>Gallery Image 7</h3>
              <h4>Color : {product.color7}</h4>
            </Col>
          )}
        </Row>

        <br />
        <br />

        <div style={{ display: showDetails ? "block" : "none" }}>
          <hr />
          <p style={{ whiteSpace: "pre-wrap" }}>
            Description : {product.description}
          </p>
          <hr />
          <br />
          <p>Original Price : {product.originalPrice}</p>
          <br />
          <p>Discount Percentage : {product.discountPercentage}</p>
          <br />
          <p>Featured Item : {product.isFeatured ? "Yes" : "No"}</p>
          <br />
          <p>In Stock : {product.inStock}</p>
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
            defaultValue={name}
            placeholder="Name"
            onChange={(val) => setName(val.target.value)}
          />
          <br />
          <Input
            required
            style={{ margin: "10px", width: "300px" }}
            type="text"
            value={imageURI}
            placeholder="Image URL"
            onChange={(val) => setImageURI(val.target.value)}
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
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="Discount Percentage"
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
          <Radio.Group
            style={{ margin: "10px", width: "300px" }}
            onChange={(e) => setInStock(e.target.value)}
            value={inStock}
          >
            <Radio value="yes">In Stock</Radio>
            <Radio value="no">Not In Stock</Radio>
          </Radio.Group>
          <br />
          <Button
            onClick={() => toggleGalleryInput(!showGalleryInput)}
            style={{ margin: "10px" }}
          >
            Fill Gallery Images
          </Button>
          {showGalleryInput && (
            <div style={{ marginTop: "15px" }}>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage1}
                    placeholder="Gallery Image 1"
                    onChange={(val) => setGalleryImage1(val.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={color1}
                    placeholder="Colour for Gallery Image 1"
                    onChange={(val) => setColor1(val.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage2}
                    placeholder="Gallery Image 2"
                    onChange={(val) => setGalleryImage2(val.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={color2}
                    placeholder="Colour for Gallery Image 2"
                    onChange={(val) => setColor2(val.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage3}
                    placeholder="Gallery Image 3"
                    onChange={(val) => setGalleryImage3(val.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={color3}
                    placeholder="Colour for Gallery Image 3"
                    onChange={(val) => setColor3(val.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage4}
                    placeholder="Gallery Image 4"
                    onChange={(val) => setGalleryImage4(val.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={color4}
                    placeholder="Colour for Gallery Image 4"
                    onChange={(val) => setColor4(val.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage5}
                    placeholder="Gallery Image 5"
                    onChange={(val) => setGalleryImage5(val.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={color5}
                    placeholder="Colour for Gallery Image 5"
                    onChange={(val) => setColor5(val.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage6}
                    placeholder="Gallery Image 6"
                    onChange={(val) => setGalleryImage6(val.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={color6}
                    placeholder="Colour for Gallery Image 6"
                    onChange={(val) => setColor6(val.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Input
                    required
                    style={{ margin: "10px", width: "80%" }}
                    type="text"
                    value={galleryImage7}
                    placeholder="Gallery Image 7"
                    onChange={(val) => setGalleryImage7(val.target.value)}
                  />
                </Col>
              </Row>
            </div>
          )}
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
