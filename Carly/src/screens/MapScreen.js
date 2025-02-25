import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import MapView, { Marker, MapStyle } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { darkMap } from '../../assets/dark_map';
import { setNewLocation, fetchFilteredCars, resetCars } from '../redux/api';

const defaultLocation = {
  latitude: 52.2297,
  longitude: 21.0122,
};

function MapScreen() {
  const filters = useSelector((state) => state.filters);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.currentLocation);
  const autoLocation = useSelector((state) => state.autoLocation);

  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [autocompleteLocation, setAutocompleteLocation] = useState(null);

  const setDefaultLocation = () => {
    setInitialRegion({
      ...defaultLocation,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    setSelectedLocation(defaultLocation);
    setAutocompleteLocation(defaultLocation);
    dispatch(setNewLocation(defaultLocation));
    dispatch(resetCars());
    dispatch(fetchFilteredCars({ location: currentLocation, filters, page: 0 }));
  };

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setDefaultLocation();
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSelectedLocation(location.coords);
      setAutocompleteLocation(location.coords);

      setInitialRegion({
        ...location.coords,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      dispatch(setNewLocation(location.coords));
      dispatch(resetCars());
      dispatch(fetchFilteredCars({ location: currentLocation, filters, page: 0 }));
    };
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autocompleteLocation) {
      setInitialRegion({
        ...autocompleteLocation,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [autocompleteLocation]);

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
    dispatch(setNewLocation(event.nativeEvent.coordinate));
    dispatch(fetchFilteredCars({ location: currentLocation, filters }));
  };

  const handleAddressSelect = (data, details) => {
    setAutocompleteLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setSelectedLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    dispatch(
      setNewLocation({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      })
    );
    dispatch(fetchFilteredCars({ location: currentLocation, filters }));
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        autoFocus={false}
        fetchDetails
        onPress={handleAddressSelect}
        query={{
          key: 'AIzaSyASp262HP3AQD96RZEWL8nMdbfcZ-YHoV4',
          language: 'en',
        }}
        styles={{
          container: {
            flex: 0,
          },
          description: {
            color: '#000',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#3caf50',
          },
        }}
      />
      <MapView
        style={{ flex: 1 }}
        customMapStyle={theme === 'light' ? null : darkMap}
        region={initialRegion}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            draggable
            onDragEnd={(e) => setSelectedLocation(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
