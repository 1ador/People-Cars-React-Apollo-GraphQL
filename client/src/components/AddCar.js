import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { Input, Button, Select, message, Divider, Typography } from "antd";

const { Option } = Select;

function AddCar({ people }) {
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    price: "",
    personId: "",
  });

  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted: () => {
      setFormData({ year: "", make: "", model: "", price: "", personId: "" });
      message.success("Car added successfully!");
    },
    onError: (error) => message.error("Error adding car: " + error.message),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      personId: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.year || !formData.make || !formData.model || !formData.price || !formData.personId) return;

    addCar({
      variables: {
        year: parseInt(formData.year),
        make: formData.make,
        model: formData.model,
        price: parseFloat(formData.price),
        personId: formData.personId,
      },
    });
  };

  return (
    <div>
      <Divider> 
        <Typography.Title level={3} style={{ margin: 0 }}>
        Add Car
        </Typography.Title> 
      </Divider>
      <label>Year:</label>
      <Input name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
      <Input name="make" placeholder="Make" value={formData.make} onChange={handleChange} />
      <Input name="model" placeholder="Model" value={formData.model} onChange={handleChange} />
      <Input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <Select placeholder="Select Owner" onChange={handleSelectChange} value={formData.personId}>
        {people.map((person) => (
          <Option key={person.id} value={person.id}>
            {person.firstName} {person.lastName}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={handleSubmit} disabled={!formData.personId}>
        Add Car
      </Button>
    </div>
  );
}

export default AddCar;
