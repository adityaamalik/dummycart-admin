import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        Orders
      </h1>
      {orders.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "30px",
          }}
        >
          No Orders
        </h2>
      ) : (
        <>
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "30px",
            }}
          >
            List of all orders
          </h2>

          <Row>
            {orders.map((order, index) => (
              <Col
                key={index}
                lg={8}
                md={12}
                sm={24}
                style={{ padding: "10px" }}
              >
                <Card
                  onClick={() =>
                    (window.location.pathname = `/order/${order._id}`)
                  }
                  hoverable
                  cover={<img alt={order.name} src={order.image} />}
                >
                  Name : {order.name} <br />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Orders;
