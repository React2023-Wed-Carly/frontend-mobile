import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import MapView, { Marker, MapStyle } from 'react-native-maps';
import * as Location from 'expo-location';
import jsonData from '../DummyData.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';

const defaultLocation = {
  latitude: 52.2297,
  longitude: 21.0122,
};

const MapScreen = ({ location, setLocation }) => {
  const cars = jsonData.cars;
  const theme = useSelector((state) => state.theme);
  const darkMap = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ];

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
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setDefaultLocation();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setSelectedLocation(location.coords);
      setAutocompleteLocation(location.coords);
      setInitialRegion({
        ...location.coords,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };
    getLocation();
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
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        autoFocus={false}
        fetchDetails={true}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
