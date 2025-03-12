import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../graphql/queries";
import { Card, Button, Spin } from "antd";

function PersonDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  if (loading) return <Spin />;
  if (error) return <p>Error: {error.message}</p>;

  const person = data.person;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", paddingTop: "20px" }}>
      <Card title={`${person.firstName} ${person.lastName}`}>
        <p><strong>Cars:</strong></p>
        {person.cars.length > 0 ? (
          person.cars.map((car) => (
            <p key={car.id}>
              {car.year} {car.make} {car.model} - ${car.price}
            </p>
          ))
        ) : (
          <p>No cars available</p>
        )}

        <Link to="/">
          <Button type="primary" style={{ marginTop: "20px" }}>Go Back</Button>
        </Link>
      </Card>
    </div>
  );
}

export default PersonDetail;
