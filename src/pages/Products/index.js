import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        Products
      </h1>

      <Grid gridOf="products" />
    </>
  );
};

export default Products;
