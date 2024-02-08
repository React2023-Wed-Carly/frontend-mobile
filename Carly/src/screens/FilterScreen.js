import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MultiSelect from 'react-native-sectioned-multi-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { filterStyles as styles } from '../styles';
import { setFilters } from '../redux/actions';
import { fetchFilteredCars } from '../redux/api';

const transmissionTypes = ['Automatic', 'Manual'];

function FilterScreen({ applyFilters, setIsFilter }) {
  const filters = useSelector((state) => state.filters);
  const currentLocation = useSelector((state) => state.currentLocation);
  const theme = useSelector((state) => state.theme);
  const rememberFilters = useSelector((state) => state.rememberFilters);

  const dispatch = useDispatch();

  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [seatRange, setSeatRange] = useState([filters.minSeat, filters.maxSeat]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(filters.trans);

  const handleApplyFilters = () => {
    if (rememberFilters)
      AsyncStorage.setItem(
        'filters',
        JSON.stringify({
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          minSeat: seatRange[0],
          maxSeat: seatRange[1],
          trans: selectedTransmissionTypes,
        })
      );

    setFilters({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSeat: seatRange[0],
      maxSeat: seatRange[1],
      trans: selectedTransmissionTypes,
    });
    dispatch(fetchFilteredCars({ location: currentLocation, filters }));
    setIsFilter(false);
  };

  const labelStyle = { fontSize: 18, marginBottom: 5, color: theme === 'light' ? '#222' : '#fff' };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

export default FilterScreen;
