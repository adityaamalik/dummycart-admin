import { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";

const Category = (props) => {
  const { id } = props.location.state;

  const [category, setCategory] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories/${id}`)
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
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
        <h1>Name : {category.name}</h1>
        <Image width="80%" height="auto" src={category.image} />
      </div>
    </>
  );
};

export default Category;
