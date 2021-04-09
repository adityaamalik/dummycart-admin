import { Card, Row, Col } from "antd";
import * as S from "./styles";
const { Meta } = Card;

const Grid = (props) => {
  const { gridOf } = props;

  return (
    <S.MiddleBlock>
      <Row type="flex" justify="center" align="middle">
        <Col>
          <Row type="flex" justify="center">
            <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
              <Card
                bordered={false}
                hoverable
                cover={
                  <img
                    height="100%"
                    alt="example"
                    src="http://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8cHJvZHVjdHx8MHx8fHwxNjE3NjU4NTM2&ixlib=rb-1.2.1&q=80&w=1080"
                  />
                }
              >
                <Meta title={gridOf} />
              </Card>
            </S.ImageCol>
            <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
              <Card
                bordered={false}
                hoverable
                cover={
                  <img
                    height="100%"
                    alt="example"
                    src="http://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8cHJvZHVjdHx8MHx8fHwxNjE3NjU4NTM2&ixlib=rb-1.2.1&q=80&w=1080"
                  />
                }
              >
                <Meta title={gridOf} />
              </Card>
            </S.ImageCol>
            <S.ImageCol xl={6} lg={6} md={10} sm={20} xs={20}>
              <Card
                bordered={false}
                hoverable
                cover={
                  <img
                    height="100%"
                    alt="example"
                    src="http://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8cHJvZHVjdHx8MHx8fHwxNjE3NjU4NTM2&ixlib=rb-1.2.1&q=80&w=1080"
                  />
                }
              >
                <Meta title={gridOf} />
              </Card>
            </S.ImageCol>
          </Row>
        </Col>
      </Row>
    </S.MiddleBlock>
  );
};

export default Grid;
