import { Link } from "react-router-dom";
import { Card, Row } from "antd";
import * as S from "./styles";
const { Meta } = Card;

const Grid = (props) => {
  const { gridOf, data } = props;

  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center">
        {data.map((val) => {
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
                  bordered={false}
                  hoverable
                  cover={<img height="100%" alt={val.name} src={val.image} />}
                >
                  <Meta
                    title={val.name || val.title}
                    description={val.content}
                  />
                </Card>
              </Link>
            </S.ImageCol>
          );
        })}
      </Row>
    </S.MiddleBlock>
  );
};

export default Grid;
