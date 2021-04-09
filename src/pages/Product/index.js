import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";

const Product = (props) => {
  const { id } = props.location.state;

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

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
        <Image width="80%" height="auto" src={product.image} />
      </div>
    </>
  );
};

export default Product;
