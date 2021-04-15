import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Button, message } from "antd";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/contacts")
      .then((response) => {
        console.log(response.data);
        setContacts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:3000/contacts/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.pathname = "/contacts";
      })
      .catch((error) => {
        console.log(error);
        message.error("Some error occured");
      });
  };

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
      >
        Contacts
      </h1>

      <Row>
        {contacts.map((contact, index) => (
          <Col key={index} lg={8} md={12} sm={24} style={{ padding: "10px" }}>
            <Card>
              <strong>Name :</strong> {contact.name} <br /> <br />
              <strong>Email :</strong> {contact.email} <br /> <br />
              <strong>Message :</strong> {contact.message} <br /> <br />
              <Button danger onClick={() => deleteContact(contact._id)}>
                Delete Contact
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Contacts;
