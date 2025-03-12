import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { Input, Button, Card, message } from "antd";

function AddPerson() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onError: (error) => message.error("Error adding person: " + error.message),
  });

  const handleSubmit = async () => {
    if (!firstName || !lastName) return;
    await addPerson({ variables: { firstName, lastName } });
    setFirstName("");
    setLastName("");
    message.success("Person added successfully!");
  };

  return (
    <Card title="Add Person">
      <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Button type="primary" onClick={handleSubmit} disabled={!firstName || !lastName}>
        Add Person
      </Button>
    </Card>
  );
}

export default AddPerson;
