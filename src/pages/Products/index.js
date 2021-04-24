import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";
import { Input, Button, message, Select, Radio } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productInput, toggleProductInput] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState({});
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("");

  const [discountInput, toggleDiscountInput] = useState(false);
  const [newDiscount, setNewDiscount] = useState("");
  const [productsToDiscount, setProductsToDiscount] = useState([]);

  useEffect(() => {
    axios
      .get("https://myindianthings-backend.herokuapp.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://myindianthings-backend.herokuapp.com/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitProduct = () => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPercentage", discountPercentage);
    formData.append("isFeatured", isFeatured);
    formData.append("category", category);

    axios
      .post("https://myindianthings-backend.herokuapp.com/products", formData)
      .then((response) => {
        setProducts([...products, response.data]);
        setName("");
        document.getElementById("image").value = null;
        setDescription("");
        setOriginalPrice("");
        setDiscountPercentage("");
        setFile({});
        setCategory("");
        message.success("Successfully created the new product");
      })
      .catch((error) => {
        console.log(error);
        setName("");
        message.error("Some error occured");
      });
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
        .post(
          "https://myindianthings-backend.herokuapp.com/products/setDiscount",
          data
        )
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
          <label htmlFor="image">Select Single Image : </label>
          <input
            required
            id="image"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
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
          <Button onClick={() => submitProduct()} style={{ margin: "10px" }}>
            Post
          </Button>
          <hr />
          <br />
          <br />
        </div>
      )}

      <Button
        style={{ marginTop: "10px" }}
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

      <Grid gridOf="product" data={products} />
    </div>
  );
};

export default Products;
