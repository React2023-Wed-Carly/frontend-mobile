import React from 'react';
import {
  View, Text, TextInput, Button,
} from 'react-native';

function CarFilter({ filter, setFilter, setIsFilter }) {
  const handleFilterChange = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const submitClick = () => {
    setIsFilter(false);
  };

  return (
    <View>
      <Text>Brand:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        name="brand"
        value={filter.brand}
        onChangeText={(text) => handleFilterChange('brand', text)}
      />

      <Text>Model:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        name="model"
        value={filter.model}
        onChangeText={(text) => handleFilterChange('model', text)}
      />

      <Text>Max Price:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        name="maxPrice"
        value={filter.maxPrice}
        onChangeText={(text) => handleFilterChange('maxPrice', text)}
        keyboardType="numeric"
      />

      <Button title="Close" onPress={submitClick} />
    </View>
  );
}

export default CarFilter;
