import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import * as S from "./styles";
const { Meta } = Card;

const Grid = (props) => {
  const { gridOf, data } = props;

  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Col>
          <Row type="flex" justify="center">
            {data.map((val) => {
              return (
                <S.ImageCol key={val._id} xl={6} lg={6} md={10} sm={20} xs={20}>
                  <Link
                    to={{
                      pathname: "/category",
                      state: {
                        id: val._id,
                      },
                    }}
                  >
                    <Card
                      bordered={false}
                      hoverable
                      cover={
                        <img height="100%" alt={val.name} src={val.image} />
                      }
                    >
                      <Meta title={val.name} />
                    </Card>
                  </Link>
                </S.ImageCol>
              );
            })}
          </Row>
        </Col>
      </Row>
    </S.MiddleBlock>
  );
};

export default Grid;
