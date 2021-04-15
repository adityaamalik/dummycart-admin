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
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [colours, setColours] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log("Products");
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        console.log("Categories");
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitProduct = () => {
    const colourArray = colours.split(",");
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("originalPrice", originalPrice);
    formData.append("discountedPrice", discountedPrice);
    formData.append("isFeatured", isFeatured);
    formData.append("colours", colourArray);
    formData.append("category", category);

    axios
      .post("http://localhost:3000/products", formData)
      .then((response) => {
        console.log(response.data);
        setProducts([...products, response.data]);
        setName("");
        document.getElementById("image").value = null;
        setDescription("");
        setOriginalPrice("");
        setDiscountedPrice("");
        setFile({});
        setCategory("");
        setColours("");
        message.success("Successfully created the new product");
      })
      .catch((error) => {
        console.log(error);
        setName("");
        message.error("Some error occured");
      });
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
    >
      <h1>Products</h1>
      <Button onClick={() => toggleProductInput(!productInput)}>
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
            style={{ margin: "10px", width: "80%" }}
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
            style={{ margin: "10px", width: "80%" }}
          />
          <br />
          <Button onClick={() => submitProduct()} style={{ margin: "10px" }}>
            Post
          </Button>
        </div>
      )}
      <Grid gridOf="product" data={products} />
    </div>
  );
};

export default Products;
