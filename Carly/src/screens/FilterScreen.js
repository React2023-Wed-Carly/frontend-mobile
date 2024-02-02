import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { setFilters } from '../redux/actions';

const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet'];
const fuelTypes = ['Gasoline', 'Electric', 'Hybrid'];
const transmissionTypes = ['Automatic', 'Manual'];

function FilterScreen({ applyFilters }) {
  const filters = useSelector(state=>state.filters);
  const theme = useSelector(state=>state.theme);

  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [seatRange, setSeatRange] = useState([filters.minSeat, filters.maxSeat]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(filters.trans);

  const handleApplyFilters = () => {

    console.log('Filters Applied:', {
      priceRange,
      seatRange,
      transmissionTypes: selectedTransmissionTypes,
    });

    setFilters({
      minPrice: priceRange[0],
      maxPrice:priceRange[1],
      minSeat:seatRange[0],
      maxSeat:seatRange[1],
      trans: selectedTransmissionTypes
    })
  };

  const labelStyle = {fontSize: 18,
    marginBottom: 5,
    color: theme === 'light' ? "#222" : '#fff'
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Brand</Text>
          <MultiSelect
            items={brands.map((brand) => ({ name: brand }))}
            uniqueKey="name"
            selectText="Select Brands"
            searchInputPlaceholderText="Search Brands..."
            displayKey="name"
            styleDropdownMenu={styles.multiSelectDropdown}
            styleListContainer={styles.multiSelectList}
            IconRenderer={Icon}
            onSelectedItemsChange={()=>{}}
          />
        </View>

        <View style={styles.section}>
          <Text style={labelStyle}>
            Price per day: {priceRange[0]} - {priceRange[1]}
          </Text>
          <View style={styles.sliderSection}>
            <MultiSlider
              values={priceRange}
              min={0}
              max={100}
              step={5}
              onValuesChange={(values) => setPriceRange(values)}
              containerStyle={styles.sliderContainer}
              showMarkers
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={labelStyle}>
            Number of Seats: {seatRange[0]} - {seatRange[1]}
          </Text>
          <View style={styles.sliderSection}>
            <MultiSlider
              values={seatRange}
              min={2}
              max={9}
              step={1}
              onValuesChange={(values) => setSeatRange(values)}
              containerStyle={styles.sliderContainer}
              showMarkers
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={labelStyle}>Fuel Type</Text>
          <MultiSelect
            items={fuelTypes.map((fuelType) => ({ name: fuelType }))}
            uniqueKey="name"
            selectText="Select Fuel Types"
            searchInputPlaceholderText="Search Fuel Types..."
            displayKey="name"
            styleDropdownMenu={styles.multiSelectDropdown}
            styleListContainer={styles.multiSelectList}
            IconRenderer={Icon}
          />
        </View>

        <View style={styles.section}>
          <Text style={labelStyle}>Transmission Type</Text>
          <MultiSelect
            items={transmissionTypes.map((transmissionType) => ({
              name: transmissionType,
            }))}
            uniqueKey="name"
            selectedItems={selectedTransmissionTypes}
            onSelectedItemsChange={(items) => setSelectedTransmissionTypes(items)}
            selectText="Select Transmission Types"
            searchInputPlaceholderText="Search Transmission Types..."
            displayKey="name"
            styleDropdownMenu={styles.multiSelectDropdown}
            styleListContainer={styles.multiSelectList}
            IconRenderer={Icon}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sliderSection: {
    paddingHorizontal: 5,
    maxWidth: 150,
  },
  sliderContainer: {
    height: 30,
  },
  applyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: -20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  multiSelectDropdown: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    maxHeight: '50%',
  },
  multiSelectList: {
    maxHeight: 200,
  },
});

export default FilterScreen;
