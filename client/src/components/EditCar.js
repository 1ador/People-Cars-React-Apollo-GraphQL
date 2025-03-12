import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { Modal, Input, Button, Form, message } from "antd";

function EditCar({ car, people, visible, onClose }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (car) {
      form.setFieldsValue({
        year: car.year || "",
        make: car.make || "",
        model: car.model || "",
        price: car.price || "",
        personId: car.personId || "",
      });
    }
  }, [car, form]);

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted: () => {
      message.success("Car updated successfully!");
      onClose();
    },
    onError: (error) => message.error("Error updating car: " + error.message),
  });

  const handleSubmit = (values) => {
    updateCar({
      variables: { id: car.id, ...values, year: parseInt(values.year), price: parseFloat(values.price) },
    });
  };

  return (
    <Modal title="Edit Car" open={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Year" name="year" rules={[{ required: true, message: "Please enter year" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Make" name="make" rules={[{ required: true, message: "Please enter make" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Model" name="model" rules={[{ required: true, message: "Please enter model" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter price" }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
}

export default EditCar;
