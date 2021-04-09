import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        Categories
      </h1>

      <Grid gridOf="category" data={categories} />
    </>
  );
};

export default Categories;
