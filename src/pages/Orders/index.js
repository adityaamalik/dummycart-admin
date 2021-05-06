import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/orders")
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
                <Link
                  to={{
                    pathname: "/order",
                    state: {
                      d: order,
                    },
                  }}
                >
                  <Card hoverable>
                    Name : {order.name} <br />
                    Shipping Address 1 : {order.shippingAddress1} <br />
                    Shipping Address 2 : {order.shippingAddress2} <br />
                    Payment Status : {order.paymentstatus} <br />
                    Total Price : {order.totalPrice}
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Orders;
