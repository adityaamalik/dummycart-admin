import * as S from "./styles";
import { Row, Col, Menu, Dropdown } from "antd";
import Logo from "../../img/doc.png";
import { CaretRightOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <S.Span href="/products">
        {window.location.pathname === "/products" && <CaretRightOutlined />}
        products
      </S.Span>
    </Menu.Item>
    <Menu.Item key="1">
      <S.Span href="/categories">
        {window.location.pathname === "/categories" && <CaretRightOutlined />}
        categories
      </S.Span>
    </Menu.Item>
    <Menu.Item key="3">
      <S.Span href="/orders">
        {window.location.pathname === "/orders" && <CaretRightOutlined />}
        orders
      </S.Span>
    </Menu.Item>
    <Menu.Item key="4">
      <S.Span href="/blogs">
        {window.location.pathname === "/blogs" && <CaretRightOutlined />}my
        blogs
      </S.Span>
    </Menu.Item>
    <Menu.Item key="5">
      <S.Span href="/reviews">
        {window.location.pathname === "/reviews" && <CaretRightOutlined />}
        reviews
      </S.Span>
    </Menu.Item>
    <Menu.Item key="6">
      <S.Span href="/contacts">
        {window.location.pathname === "/contacts" && <CaretRightOutlined />}
        contacts
      </S.Span>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <S.Header>
      <Row align="middle">
        <Col span={6}>
          <S.Logo src={Logo} alt="Logo" />
        </Col>
        <Col span={12}>
          <S.Heading href="/">MYINDIANTHINGS ADMIN</S.Heading>
        </Col>
        <Col span={6}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              href="/#"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <S.DropdownIcon />
            </a>
          </Dropdown>
        </Col>
      </Row>
    </S.Header>
  );
};

export default Header;
