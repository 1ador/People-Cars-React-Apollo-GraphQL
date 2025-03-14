const people = [{
    id: "1",
    firstName: "Bill",
    lastName: "Gates"
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs"
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds"
  },
];

const cars = [{
  id: "1",
  year: 2019,
  make: "Toyota",
  model: "Corolla",
  price: 40000,
  personId: "1",
},
{
  id: "2",
  year: 2018,
  make: "Lexus",
  model: "LX 600",
  price: 13000,
  personId: "1",
},
{
  id: "3",
  year: 2017,
  make: "Honda",
  model: "Civic",
  price: 20000,
  personId: "1",
},
  {
    id: "4",
    year: 2019,
    make: "Acura ",
    model: "MDX",
    price: 60000,
    personId: "2"
  },
  {
    id: "5",
    year: 2018,
    make: "Ford",
    model: "Focus",
    price: 35000,
    personId: "2"
  },
  {
    id: "6",
    year: 2017,
    make: "Honda",
    model: "Pilot",
    price: 45000,
    personId: "2"
  },
  {
    id: "7",
    year: 2019,
    make: "Volkswagen",
    model: "Golf",
    price: 40000,
    personId: "3"
  },
  {
    id: "8",
    year: 2018,
    make: "Kia",
    model: "Sorento",
    price: 45000,
    personId: "3"
  },
  {
    id: "9",
    year: 2017,
    make: "Volvo",
    model: "XC40",
    price: 55000,
    personId: "3"
  }
];

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => people.find((p) => p.id === id),
    cars: () => cars,
    car: (_, { id }) => cars.find((c) => c.id === id),
  },
  Person: {
    cars: (parent) => cars.filter((car) => car.personId === parent.id),
  },
  Mutation: {
    addPerson: (_, { firstName, lastName}) => {
      const newPerson = {
        id: String(people.length + 1),
        firstName,
        lastName
      };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = people.find((p) => p.id === id);
      if (!person) throw new Error("Person not found.");
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      return person;
    },
    deletePerson: (_, { id }) => {
      const index = people.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Person not found.");
      const deletedPerson = people.splice(index, 1)[0];
      for (let i = cars.length - 1; i >= 0; i--) {
        if (cars[i].personId === id) {
          cars.splice(i, 1);
        }
      }
      return deletedPerson;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      if (!people.some((p) => p.id === personId)) throw new Error("Person not found.");
      const newCar = {
        id: String(cars.length + 1),
        year,
        make,
        model,
        price,
        personId
      };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (_, { id, year, make, model, price, personId }) => {
      const car = cars.find((c) => c.id === id);
      if (!car) throw new Error("Car not found.");
      if (year) car.year = year;
      if (make) car.make = make;
      if (model) car.model = model;
      if (price) car.price = price;
      if (personId) {
        if (!people.some((p) => p.id === personId)) throw new Error("Person not found.");
        car.personId = personId;
      }
      return car;
    },
    deleteCar: (_, { id }) => {
      const index = cars.findIndex((c) => c.id === id);
      if (index === -1) throw new Error("Car not found.");
      const deletedCar = cars.splice(index, 1)[0];
      return deletedCar;
    },
  },
};

export default resolvers;