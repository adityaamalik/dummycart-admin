import { Link } from "react-router-dom";
import { Button, Card, message, Row } from "antd";
import * as S from "./styles";
import axios from "axios";

const { Meta } = Card;

const Grid = (props) => {
  const { gridOf, data } = props;

  const deleteReview = (id) => {
    axios
      .delete(`https://myindianthings-backend.herokuapp.com/reviews/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.pathname = "/reviews";
      })
      .catch((error) => {
        console.log(error);
        message.error("Some error occured");
      });
  };

  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center">
        {!!data ? (
          data.map((val) => {
            return (
              <S.ImageCol key={val._id} xl={6} lg={6} md={10} sm={20} xs={20}>
                <Link
                  to={{
                    pathname: "/" + gridOf,
                    state: {
                      id: val._id,
                    },
                  }}
                >
                  <Card
                    hoverable={gridOf === "reviews" ? false : true}
                    bordered={gridOf === "reviews" ? true : false}
                    cover={
                      <img
                        height="100%"
                        alt={val.name}
                        src={val.image || val.commentimages}
                      />
                    }
                  >
                    <Meta
                      title={val.name || val.title}
                      description={
                        val.content || val.description || val.comment
                      }
                    />
                    {gridOf === "reviews" && (
                      <>
                        <br />
                        <p>Rating : {val.rating}</p>
                        <br />
                        <Button danger onClick={() => deleteReview(val._id)}>
                          Delete Review
                        </Button>
                      </>
                    )}
                  </Card>
                </Link>
              </S.ImageCol>
            );
          })
        ) : (
          <h1>No {gridOf} yet</h1>
        )}
      </Row>
    </S.MiddleBlock>
  );
};

export default Grid;
