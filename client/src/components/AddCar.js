import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CAR } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { Button, Select, message, Divider, Typography } from "antd";
import CustomInput from "./CustomInput";

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
        <Typography.Title level={3}>Add Car</Typography.Title>
      </Divider>
      <div className="flex justify-center gap-4">
        <CustomInput label="Year" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-20" required />
        <CustomInput label="Make" name="make" placeholder="Make" value={formData.make} onChange={handleChange} className="w-28" required />
        <CustomInput label="Model" name="model" placeholder="Model" value={formData.model} onChange={handleChange} className="w-28" required />
        <CustomInput label="Price" name="price" prefix="$" value={formData.price} onChange={handleChange} className="w-20" required />
        <div className="flex gap-2 items-center">
          <label><span className="text-red-600">*</span>Person:</label>
          <Select
            placeholder="Select a person"
            onChange={handleSelectChange}
            value={formData.personId || undefined}
            className="w-48"
            options={people.map((person) => ({
              label: `${person.firstName} ${person.lastName}`,
              value: person.id,
            }))}
          />
        </div>
        <Button type="primary" onClick={handleSubmit} disabled={!formData.personId}>
          Add Car
        </Button>
      </div>
    </div>
  );
}

export default AddCar;
