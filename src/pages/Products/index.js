import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";
import { Input, Button, message, Select, Radio, Row, Col } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productInput, toggleProductInput] = useState(false);
  const [name, setName] = useState("");

  const [imageURI, setImageURI] = useState("");

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

  const [inStock, setInStock] = useState();

  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [isFeatured, setIsFeatured] = useState();
  const [category, setCategory] = useState("");

  const [discountInput, toggleDiscountInput] = useState(false);
  const [newDiscount, setNewDiscount] = useState("");
  const [productsToDiscount, setProductsToDiscount] = useState([]);

  const [inStockInput, toggleInStockInput] = useState(false);
  const [newInStock, setNewInStock] = useState();
  const [productsToInStock, setProductsToInStock] = useState([]);

  const [showGalleryInput, toggleGalleryInput] = useState(false);

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitProduct = () => {
    if (name === "") {
      message.error("Please fill the name of product");
    } else if (description === "") {
      message.error("Please fill the description of the product");
    } else if (originalPrice === "") {
      message.error("Please fill the original price of the product");
    } else if (imageURI === "") {
      message.error("Please fill the image URL of the product");
    } else if (category === "") {
      message.error("Please select a category");
    } else {
      const data = {
        image: imageURI,
        name: name,
        description: description,
        originalPrice: originalPrice,
        discountPercentage: discountPercentage,
        isFeatured: isFeatured,
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
        inStock: inStock,
      };

      axios
        .post("/products", data)
        .then((response) => {
          setProducts([...products, response.data]);
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
          setInStock("");
          message.success("Successfully created the new product");
        })
        .catch((error) => {
          console.log(error);
          message.error("Some error occured");
        });
    }
  };

  const submitDiscount = () => {
    if (newDiscount === "" || parseInt(newDiscount) === 0) {
      message.error("Please enter some discount");
    } else if (productsToDiscount.length === 0) {
      message.error("Please select some products to discount");
    } else {
      const data = {
        products: productsToDiscount,
        discountPercentage: newDiscount,
      };
      axios
        .post("/products/setDiscount", data)
        .then((response) => {
          setNewDiscount("");
          setProductsToDiscount([]);
          message.success(
            "Successfully applied the discount on all selected products"
          );
        })
        .catch((err) => {
          message.error("Some error occured");
        });
    }
  };

  const submitInStock = () => {
    if (newInStock === "") {
      message.error("Please specify if the product is in stock or not");
    } else if (productsToInStock.length === 0) {
      message.error("Please select some products to discount");
    } else {
      const data = {
        products: productsToInStock,
        inStock: newInStock,
      };
      axios
        .post("/products/setInStock", data)
        .then((response) => {
          setNewInStock("");
          setProductsToInStock([]);
          message.success(
            "Successfully applied the changes on all selected products"
          );
        })
        .catch((err) => {
          message.error("Some error occured");
        });
    }
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
    >
      <h1>Products</h1>
      <Button
        style={{ marginRight: "20px" }}
        onClick={() => toggleProductInput(!productInput)}
      >
        Add New product
      </Button>
      {productInput && (
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
          <TextArea
            required
            style={{ margin: "10px", width: "80%" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <br />
          <Input
            required
            style={{ margin: "10px", width: "80%" }}
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Orginal Price"
          />
          <br />
          <Input
            required
            style={{ margin: "10px", width: "80%" }}
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
            style={{ margin: "10px", width: "80%" }}
            onChange={(e) => setIsFeatured(e.target.value)}
            value={isFeatured}
          >
            <Radio value={true}>Featured Item</Radio>
            <Radio value={false}>Not Featured</Radio>
          </Radio.Group>
          <br />

          <Radio.Group
            style={{ margin: "10px", width: "80%" }}
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
          <hr />
          <br />
          <br />
        </div>
      )}

      <Button
        style={{ marginTop: "10px", marginRight: "20px" }}
        onClick={() => toggleDiscountInput(!discountInput)}
      >
        Add discount percentage to products
      </Button>

      {discountInput && (
        <>
          <div style={{ marginTop: "15px" }}>
            <Input
              required
              style={{ margin: "10px", width: "50%" }}
              type="Number"
              placeholder="Discount Percentage"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
            />
            <br />
            <Select
              mode="multiple"
              allowClear
              required
              placeholder="Select Products"
              style={{ margin: "10px", width: "80%" }}
              onChange={(val) => setProductsToDiscount(val)}
            >
              {products.map((val) => {
                return (
                  <Option key={val._id} value={val._id}>
                    {val.name}
                  </Option>
                );
              })}
            </Select>
            <br />
            <Button onClick={() => submitDiscount()} style={{ margin: "10px" }}>
              Post
            </Button>
            <hr />
            <br />
            <br />
          </div>
        </>
      )}

      <Button
        style={{ marginTop: "10px" }}
        onClick={() => toggleInStockInput(!inStockInput)}
      >
        Change inventory status
      </Button>

      {inStockInput && (
        <>
          <div style={{ marginTop: "15px" }}>
            <Radio.Group
              style={{ margin: "10px", width: "80%" }}
              onChange={(e) => setNewInStock(e.target.value)}
              value={newInStock}
            >
              <Radio value="yes">In Stock</Radio>
              <Radio value="no">Not In Stock</Radio>
            </Radio.Group>
            <br />
            <br />
            <Select
              mode="multiple"
              allowClear
              required
              placeholder="Select Products"
              style={{ margin: "10px", width: "80%" }}
              onChange={(val) => setProductsToInStock(val)}
            >
              {products.map((val) => {
                return (
                  <Option key={val._id} value={val._id}>
                    {val.name}
                  </Option>
                );
              })}
            </Select>
            <br />
            <Button onClick={() => submitInStock()} style={{ margin: "10px" }}>
              Post
            </Button>
            <hr />
            <br />
            <br />
          </div>
        </>
      )}

      <Grid gridOf="product" data={products} />
    </div>
  );
};

export default Products;
