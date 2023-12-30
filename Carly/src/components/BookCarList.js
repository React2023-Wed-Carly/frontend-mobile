import BookCarItem from "./BookCarItem";
import { useState, useEffect } from "react";
import CarFilter from "./CarFilter";
import { Button } from 'react-native';

import jsonData from "../DummyData.json";

export default function BookCarList() {
  const cars = jsonData.cars;

  const [filter, setFilter] = useState({
    brand: "",
    model: "",
    maxPrice: "",
  });
  const [isFilter, setIsFilter] = useState(false);

  const filterClick = (event) => {
    setIsFilter(true);
  };

  const filteredCars = cars.filter((car) => {
    return (
      car.brand.toLowerCase().includes(filter.brand.toLowerCase()) &&
      car.model.toLowerCase().includes(filter.model.toLowerCase()) &&
      (filter.maxPrice === "" || car.dailyPrice <= parseInt(filter.maxPrice))
    );
  });

  return (
    <>
      {isFilter && <CarFilter filter={filter} setFilter={setFilter} setIsFilter={setIsFilter}/>}
      {!isFilter && <Button title="Filters" onPress={filterClick}></Button>}
      {!isFilter && filteredCars.map((item) => (
        <BookCarItem key={item.id} car={item} />
      ))}
    </>
  );
}
