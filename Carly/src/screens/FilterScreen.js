import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet'];
const fuelTypes = ['Gasoline', 'Electric', 'Hybrid'];
const transmissionTypes = ['Automatic', 'Manual'];

const FilterScreen = (props) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [seatRange, setSeatRange] = useState([2, 9]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );

  const applyFilters = () => {
    console.log('Filters Applied:', {
      brands: selectedBrands,
      priceRange,
      seatRange,
      fuelTypes: selectedFuelTypes,
      transmissionTypes: selectedTransmissionTypes,
    });
    props.applyFilters();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Brand</Text>
          <MultiSelect
            items={brands.map((brand) => ({ name: brand }))}
            uniqueKey='name'
            selectedItems={selectedBrands}
            onSelectedItemsChange={(items) => setSelectedBrands(items)}
            selectText='Select Brands'
            searchInputPlaceholderText='Search Brands...'
            displayKey='name'
            styleDropdownMenu={styles.multiSelectDropdown}
            styleListContainer={styles.multiSelectList}
            IconRenderer={Icon}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
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
          <Text style={styles.label}>
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
          <Text style={styles.label}>Fuel Type</Text>
          <MultiSelect
            items={fuelTypes.map((fuelType) => ({ name: fuelType }))}
            uniqueKey='name'
            selectedItems={selectedFuelTypes}
            onSelectedItemsChange={(items) => setSelectedFuelTypes(items)}
            selectText='Select Fuel Types'
            searchInputPlaceholderText='Search Fuel Types...'
            displayKey='name'
            styleDropdownMenu={styles.multiSelectDropdown}
            styleListContainer={styles.multiSelectList}
            IconRenderer={Icon}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Transmission Type</Text>
          <MultiSelect
            items={transmissionTypes.map((transmissionType) => ({
              name: transmissionType,
            }))}
            uniqueKey='name'
            selectedItems={selectedTransmissionTypes}
            onSelectedItemsChange={(items) =>
              setSelectedTransmissionTypes(items)
            }
            selectText='Select Transmission Types'
            searchInputPlaceholderText='Search Transmission Types...'
            displayKey='name'
            styleDropdownMenu={styles.multiSelectDropdown}
            styleListContainer={styles.multiSelectList}
            IconRenderer={Icon}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  sliderContainer: {
    height: 30,
  },
  applyButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
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
