import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/Grid";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://myindianthings-backend.herokuapp.com/reviews")
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        Reviews
      </h1>

      <Grid gridOf="reviews" data={reviews} />
    </>
  );
};

export default Reviews;
