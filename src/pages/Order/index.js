import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import { LinkOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";

const Order = (props) => {
  const { id } = props.location.state;

  const [order, setOrder] = useState({});
  const [showPaymentEditBox, togglePaymentEditBox] = useState(false);
  const [showShippingStatusEditBox, toggleShippingStatusEditBox] = useState(
    false
  );

  const [paymentStatus, setPaymentStatus] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");

  useEffect(() => {
    axios
      .get(`https://myindianthings-backend.herokuapp.com/orders/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const deleteOrder = () => {
    axios
      .delete(`https://myindianthings-backend.herokuapp.com/orders/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.pathname = "/orders";
      })
      .catch((err) => {
        console.log(err);
        message.error("Cannot delete the order");
      });
  };

  const updatePaymentStatus = () => {
    if (paymentStatus === "") {
      message.error("Please enter a payment status");
    } else {
      const data = {
        paymentstatus: paymentStatus,
      };
      axios
        .put(`https://myindianthings-backend.herokuapp.com/orders/${id}`, data)
        .then((response) => {
          console.log(response.data);
          message.success("Successfully updated the payment status");
          setPaymentStatus("");
          togglePaymentEditBox(false);
          setOrder(response.data);
        })
        .catch((err) => {
          console.log(err);
          message.error("Cannot update payment status");
        });
    }
  };

  const updateShippingStatus = () => {
    if (shippingStatus === "") {
      message.error("Please enter a shipping status");
    } else {
      const data = {
        shippingstatus: shippingStatus,
      };
      axios
        .put(`https://myindianthings-backend.herokuapp.com/orders/${id}`, data)
        .then((response) => {
          console.log(response.data);
          message.success("Successfully updated the shipping status");
          setShippingStatus("");
          toggleShippingStatusEditBox(false);
          setOrder(response.data);
        })
        .catch((err) => {
          console.log(err);
          message.error("Cannot update shipping status");
        });
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <h1>Name : {order.name}</h1>
        <br />
        <p>Email : {order.email}</p>
        <br />
        <p>Phone : {order.phone}</p>
        <br />
        <p>Total Price : {order.totalPrice}</p>
        <br />
        <p>Shipping Address 1 : {order.shippingAddress1}</p>
        <br />
        <p>Shipping Address 2 : {order.shippingAddress2}</p>
        <br />
        <p>State : {order.state}</p>
        <br />
        <p>City : {order.city}</p>
        <br />
        <p>Zip : {order.zip}</p>
        <br />
        <p>
          Payment Status : {order.paymentstatus}{" "}
          <EditOutlined
            onClick={() => togglePaymentEditBox(!showPaymentEditBox)}
          />
        </p>
        {showPaymentEditBox && (
          <>
            <Input
              type="text"
              placeholder="Payment Status"
              style={{ width: "300px" }}
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            />
            <span
              onClick={() => updatePaymentStatus()}
              style={{
                border: "1px solid black",
                marginLeft: "10px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <CheckOutlined />
            </span>

            <br />
          </>
        )}

        <br />
        <p>
          Shipping Status : {order.shippingstatus}{" "}
          <EditOutlined
            onClick={() =>
              toggleShippingStatusEditBox(!showShippingStatusEditBox)
            }
          />
        </p>
        {showShippingStatusEditBox && (
          <>
            <Input
              type="text"
              placeholder="Shipping Status"
              style={{ width: "300px" }}
              value={shippingStatus}
              onChange={(e) => setShippingStatus(e.target.value)}
            />
            <span
              onClick={() => updateShippingStatus()}
              style={{
                border: "1px solid black",
                marginLeft: "10px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <CheckOutlined />
            </span>

            <br />
          </>
        )}
        <br />
        <h2>Ordered Items are listed below</h2>
        {order !== undefined &&
          order.orderItems !== undefined &&
          order.orderItems.map((item) => {
            return (
              <>
                <hr />
                <p>
                  <Link
                    to={{
                      pathname: "/product",
                      state: {
                        id: item.product,
                      },
                    }}
                  >
                    {" "}
                    <LinkOutlined />
                    View Product
                  </Link>{" "}
                </p>
                <br />
                <p>Quantity : {item.quantity}</p>
                <br />
                <p>Price : {item.price}</p>
                <br />
                <p>Colour : {item.colour}</p>
                <hr />
              </>
            );
          })}
        <Button danger onClick={() => deleteOrder()}>
          Delete Order
        </Button>
        <br />
        <br />
      </div>
    </>
  );
};

export default Order;
