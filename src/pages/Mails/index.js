import { useEffect, useState } from "react";
import axios from "axios";

const Mails = () => {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    axios
      .get(`https://myindianthings-backend.herokuapp.com/mail`)
      .then((response) => {
        console.log(response.data);
        setMails(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <h1>Mails</h1>
      </div>

      <ul>
        {mails.length !== 0 &&
          mails.map((mail, index) => {
            return <li key={index}>{mail.email}</li>;
          })}
      </ul>
    </>
  );
};

export default Mails;
