import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import { DELETE_PERSON, DELETE_CAR } from "../graphql/mutations";
import EditPerson from "./EditPerson";
import EditCar from "./EditCar";
import { Card, Typography, Button, List, message, Modal, Divider } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function PeopleList() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const [editingPerson, setEditingPerson] = useState(null);
  const [editingCar, setEditingCar] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeletePerson = async (id) => {
    Modal.confirm({
      title: "Are you sure deleting this person?",
      content: "This will also delete all their cars.",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          console.log("Deleting person with ID:", id);
          await deletePerson({ variables: { id } });
          message.success("Person deleted successfully!");
        } catch (err) {
          message.error("Error deleting person: " + err.message);
        }
      },
    });
  };
  
  const handleDeleteCar = async (id) => {
    Modal.confirm({
      title: "Are you sure deleting this car?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          console.log("Deleting car with ID:", id);
          await deleteCar({ variables: { id } });
          message.success("Car deleted successfully!");
        } catch (err) {
          message.error("Error deleting car: " + err.message);
        }
      },
    });
  };

  return (
    <div>
      <Divider> 
        <Typography.Title level={3}>Records</Typography.Title>
      </Divider>

      <List dataSource={data.people} renderItem={(person) => (
        <Card 
          title={`${person.firstName} ${person.lastName}`} 
          className="mb-6"
          styles={{
            body: { paddingBottom: 4 }
          }}>
          {person.cars.length > 0 ? (
            person.cars.map((car) => (
              <Card 
                key={car.id} 
                title={ <span className="text-sm font-medium">{`${car.year} ${car.make} ${car.model} -> $ ${car.price.toLocaleString()}`}</span> } 
                styles={{
                  header: { backgroundColor: "#F5F5F5" },
                  body: { paddingTop: 4, paddingBottom: 4 }
                }}
                className="mb-4">
                <div className="flex justify-around items-center">
                  <Button type="text" icon={<EditOutlined />} onClick={() => setEditingCar(car)} />
                  <Button type="text" icon={<DeleteOutlined className="text-red-500" />} onClick={() => handleDeleteCar(car.id)} />
                </div>
              </Card>
            ))
          ) : (
            <p>No cars available</p>
          )}

          <Link to={`/people/${person.id}`}>
            <Button type="link">Learn More</Button>
          </Link>

          <Divider className="m-2" />
          
          <div className="flex justify-around items-center px-6">
            <Button type="text" icon={<EditOutlined />} onClick={() => setEditingPerson(person)} />
            <Button type="text" icon={<DeleteOutlined className="text-red-500" />} onClick={() => handleDeletePerson(person.id)} />
          </div>

          {editingPerson && <EditPerson person={editingPerson} visible={true} onClose={() => setEditingPerson(null)} />}
          {editingCar && <EditCar car={editingCar} people={data.people} visible={true} onClose={() => setEditingCar(null)} />}
        </Card>
        )}
      />
    </div>
  );
}

export default PeopleList;
