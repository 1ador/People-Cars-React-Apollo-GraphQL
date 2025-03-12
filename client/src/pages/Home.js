import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../graphql/queries";
import PeopleList from "../components/PeopleList";
import AddPerson from "../components/AddPerson";
import AddCar from "../components/AddCar";
import { Typography, Divider } from "antd";

function Home() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        PEOPLE AND THEIR CARS
      </Typography.Title>
      <Divider />
      <AddPerson />
      <AddCar people={data.people} />
      <PeopleList />
    </div>
  );
}

export default Home;
