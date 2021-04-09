import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import * as S from "../../components/Grid/styles";

const { Meta } = Card;

const Home = () => {
  return (
    <>
      <S.MiddleBlock>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "80vh" }}
        >
          <Col>
            <Row type="flex" justify="center">
              <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
                <Link to="/categories">
                  <Card hoverable>
                    <Meta title="CATEGORIES" />
                  </Card>
                </Link>
              </S.ImageCol>
              <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
                <Link to="/products">
                  <Card hoverable>
                    <Meta title="PRODUCTS" />
                  </Card>
                </Link>
              </S.ImageCol>
              <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
                <Link to="/orders">
                  <Card hoverable>
                    <Meta title="ORDERS" />
                  </Card>
                </Link>
              </S.ImageCol>
              <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
                <Link to="/blogs">
                  <Card hoverable>
                    <Meta title="BLOGS" />
                  </Card>
                </Link>
              </S.ImageCol>
              <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
                <Link to="/reviews">
                  <Card hoverable>
                    <Meta title="REVIEWS" />
                  </Card>
                </Link>
              </S.ImageCol>
            </Row>
          </Col>
        </Row>
      </S.MiddleBlock>
    </>
  );
};

export default Home;
