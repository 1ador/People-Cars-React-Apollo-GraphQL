import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../graphql/mutations";
import { GET_PEOPLE } from "../graphql/queries";
import { Modal, Input, Button, Form, message } from "antd";

function EditPerson({ person, visible, onClose }) {
    const [form] = Form.useForm();
    const [updatePerson] = useMutation(UPDATE_PERSON, {
        refetchQueries: [{ query: GET_PEOPLE }],
        onCompleted: () => {
            message.success("Person updated successfully!");
            onClose();
        },
        onError: (error) => message.error("Error updating person: " + error.message),
    });

    useEffect(() => {
        if (person) {
            form.setFieldsValue({
                firstName: person.firstName || "",
                lastName: person.lastName || "",
            });
        }
    }, [person, form]);

    const handleSubmit = (values) => {
        updatePerson({
            variables: { id: person.id, ...values },
        });
    };

    return (
        <Modal title="Edit Person" open={visible} onCancel={onClose} footer={null}>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter first name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter last name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item className="flex flex-row">
                    <Button type="primary" htmlType="submit" className="mr-4">
                        Save
                    </Button>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditPerson;
