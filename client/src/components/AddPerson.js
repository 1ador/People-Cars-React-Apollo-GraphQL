import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { Button, Typography, Divider, message } from "antd";
import CustomInput from "./CustomInput";

function AddPerson() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onError: (error) => message.error("Error adding person: " + error.message),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName) return;
    await addPerson({ variables: { firstName, lastName } });
    setFirstName("");
    setLastName("");
    message.success("Person added successfully!");
  };

  return (
    <div>
      <Divider> 
        <Typography.Title level={3}>Add Person</Typography.Title>
      </Divider>
      <div className="flex justify-center gap-4">
        <CustomInput label="First Name" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange} className="w-28" required />
        <CustomInput label="Last Name" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange} className="w-28" required />
        <Button type="primary" onClick={handleSubmit} disabled={!firstName || !lastName}>
          Add Person
        </Button>
      </div>
    </div>
   
  );
}

export default AddPerson;
