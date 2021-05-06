import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, message, Button } from "antd";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const deleteReview = (id) => {
    axios
      .delete(`/reviews/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.pathname = "/reviews";
      })
      .catch((error) => {
        console.log(error);
        message.error("Some error occured");
      });
  };

  useEffect(() => {
    axios
      .get("/reviews")
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

      <Row type="flex" justify="center">
        {reviews.map((review, index) => {
          if (!!review.commentimages) {
            let img, url;

            img = new Buffer.from(review.commentimages.data).toString("base64");
            url = `data:image/${review.commentimages.contentType};base64,${img}`;

            return (
              <Col
                style={{
                  marginRight: "1rem",
                  marginLeft: "1rem",
                  marginTop: "10px",
                }}
                key={index}
                xl={6}
                lg={6}
                md={10}
                sm={20}
                xs={20}
              >
                <Card>
                  <img src={url} height="100%" width="100%" alt="review" />
                  <p>Name : {review.name}</p>
                  <p>Email : {review.email}</p>
                  <p>Comment : {review.comment}</p>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      size="small"
                      danger
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete review
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          } else {
            return (
              <Col
                style={{
                  marginRight: "1rem",
                  marginLeft: "1rem",
                  marginTop: "10px",
                }}
                key={index}
                xl={6}
                lg={6}
                md={10}
                sm={20}
                xs={20}
              >
                <Card key={index}>
                  <p>Name : {review.name}</p>
                  <p>Email : {review.email}</p>
                  <p>Comment : {review.comment}</p>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      size="small"
                      danger
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete review
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          }
        })}
      </Row>
    </>
  );
};

export default Reviews;
