import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import { DELETE_PERSON, DELETE_CAR } from "../graphql/mutations";
import EditPerson from "./EditPerson";
import EditCar from "./EditCar";
import { Card, Button, List, message, Modal } from "antd";
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
    <List
      dataSource={data.people}
      renderItem={(person) => (
        <Card title={`${person.firstName} ${person.lastName}`} style={{ marginBottom: "20px" }}>
          <p><strong>Cars:</strong></p>
          {person.cars.length > 0 ? (
            person.cars.map((car) => (
              <div key={car.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p>{car.year} {car.make} {car.model} - ${car.price}</p>
                <div>
                  <Button size="small" onClick={() => setEditingCar(car)}>Edit</Button>
                  <Button size="small" danger onClick={() => handleDeleteCar(car.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No cars available</p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <Button onClick={() => setEditingPerson(person)}>Edit</Button>
            <Button danger onClick={() => handleDeletePerson(person.id)}>Delete</Button>
            <Link to={`/people/${person.id}`}>
              <Button type="link">Learn More</Button>
            </Link>
          </div>

          {editingPerson && <EditPerson person={editingPerson} visible={true} onClose={() => setEditingPerson(null)} />}
          {editingCar && <EditCar car={editingCar} people={data.people} visible={true} onClose={() => setEditingCar(null)} />}
        </Card>
      )}
    />
  );
}

export default PeopleList;
