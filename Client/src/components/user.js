import React, { useState, useEffect } from "react";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";
import { userInstance } from "../config/axios";

function user() {
  const [items, setItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const getData = await userInstance.get("/getuser");
      setItems(getData.data);
    }
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      user_name: userName,
      user_email: userEmail,
      user_contact: userContact,
    };
    if (userId !== 0) {
      let updateData = await userInstance.patch(
        `/updatedata/${userId}`,
        payload
      );
      if (updateData) {
        toast.success("Data Updated successfully", { containerId: "B" });
      } else {
        toast.error("Error...", { containerId: "B" });
      }
    } else {
      let saveData = await userInstance.post("/registeruser", payload);
      if (saveData) {
        toast.success("Data Saved", { containerId: "B" });
      } else {
        toast.error("Error...", { containerId: "B" });
      }
    }
    setUserName("");
    setUserEmail("");
    setUserContact("");
    let getData = await userInstance.get("/getuser");
    setItems(getData.data);
  };

  const deleteItems = async (e) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let deleteData = await userInstance.delete(`/deleteuser/${e}`);
            if (deleteData) {
              toast.success("Data Deleted Successfully", {
                containerId: "B",
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  const updateItems = async (id) => {
    const item = items.find((element) => element.user_id === id);
    if (item) {
      setUserName(item.user_name);
      setUserEmail(item.user_email);
      setUserContact(item.user_contact);
      setUserId(id);
    }
  };

  return (
    <div className="user-list">
      <h1>Simple Crud Form</h1>

      <Form onSubmit={submit}>
        <Form.Group controlId="formBasicloginone">
          <Form.Label>User Name </Form.Label>
          <FormControl
            type="text"
            placeholder="User Name"
            name="cname"
            autoComplete="off"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicloginone">
          <Form.Label>User Email </Form.Label>
          <FormControl
            type="text"
            placeholder="User Email"
            name="cname"
            autoComplete="off"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="formBasicloginone">
          <Form.Label>User Phone</Form.Label>
          <FormControl
            type="text"
            placeholder="User Contact"
            name="cname"
            autoComplete="off"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
            required={true}
          />
        </Form.Group>
        <Button type="submit" className="btn save-btn">
          Save
        </Button>
      </Form>

      <h1> Render Data</h1>

      <Table className="crud-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.user_id + index}>
              <td>{item.user_name}</td>
              <td>{item.user_email}</td>
              <td>{item.user_contact}</td>
              <td>
                <Button onClick={(e) => updateItems(item.user_id)}>
                  Update
                </Button>
                <Button
                  className="btn del-btn"
                  onClick={(e) => deleteItems(item.user_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default user;
