import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles, selectedCarStyles } from '../styles';
import Card from '../components/Card';
import { sendCarBooking } from '../redux/api';
import { formatPrice } from '../utils/textFormatting';

function SelectedCarScreen({ navigation, route }) {
  const { car, bookCar, reservation } = route.params;

  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.currentLocation);
  const currentCarBooking = useSelector((state) => state.currentCarBooking);
  const theme = useSelector((state) => state.theme);

  const today = new Date();
  const tommorrow = new Date(today);
  tommorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(today);
  const [selectedDuration, setSelectedDuration] = useState(1);

  const [showReservationModal, setShowReservationModal] = useState(false);

  const calculateEndDate = () => {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + selectedDuration);
    return newEndDate;
  };

  const handleIncreaseDuration = () => {
    setSelectedDuration(selectedDuration + 1);
  };

  const handleDecreaseDuration = () => {
    if (selectedDuration > 1) {
      setSelectedDuration(selectedDuration - 1);
    }
  };

  const featuresLength = car.info.features ? car.info.features.length : 0;

  const textPairContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    color: theme === 'light' ? '#222' : '#fff',
  };

  const labelStyle = {
    fontWeight: 'bold',
    paddingRight: 10,
    color: theme === 'light' ? '#222' : '#fff',
  };
  const valueStyle = { color: theme === 'light' ? '#222' : '#fff' };

  const closeModal = () => {
    setShowReservationModal(false);
  };

  const renderReservationModal = () => (
    <Modal
      transparent
      animationType="slide"
      visible={showReservationModal}
      onRequestClose={closeModal}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
            Reservation details
          </Text>
          {/* Render reservation details content here based on your UI structure */}
          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>Start date:</Text>
            <Text>{startDate.toLocaleDateString()}</Text>
          </View>
          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>End date:</Text>
            <Text>{calculateEndDate().toLocaleDateString()}</Text>
          </View>
          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>Price:</Text>
            <Text>{formatPrice(car.info.dailyPrice * selectedDuration)}</Text>
          </View>
          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>Duration (days):</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleDecreaseDuration}>
                <Text style={{ fontSize: 20, marginRight: 10 }}>-</Text>
              </TouchableOpacity>
              <Text>{selectedDuration}</Text>
              <TouchableOpacity onPress={handleIncreaseDuration}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Book and Close buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginBottom: -20,
            }}
          >
            <TouchableOpacity onPress={closeModal} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBookCar} style={styles.activeButton}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const handleBookCar = async () => {
    try {
      dispatch(
        sendCarBooking(car, {
          carId: car.info.id,
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
          startDate: startDate.toISOString(),
          endDate: calculateEndDate().toISOString(),
          integratedSystemId: 0,
        })
      );

      // Show reservation details modal
      setShowReservationModal(true);
    } catch (error) {
      // Use the Alert component to display the error message
      Alert.alert(
        'Error',
        'The date you have selected overlaps with an existing reservation. Someone must have booked the car faster than you - please choose another car.'
      );
      // Use the Alert component to display the error message
      Alert.alert(
        'Error',
        'The date you have selected overlaps with an existing reservation. Someone must have booked the car faster than you - please choose another car.'
      );
    }
  };

  const handleCancelReservation = () => {
    // Show confirmation modal
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this reservation? You will not receive a refund for your payment',
      [
        {
          text: 'Back',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            // Logic to cancel reservation
            try {
              console.log('CANCEL');
            } catch (error) {
              console.error('Error cancelling reservation:', error);
              // Handle error if the cancellation fails
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ padding: 15, flex: 1 }}>
      <ScrollView>
        <Card>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Image
                // eslint-disable-next-line global-require
                source={{ uri: `data:image/png;base64,${car.img}` }}
                style={selectedCarStyles.carImage}
              />
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {`${car.info.brand} ${car.info.model} ${car.info.year}`}
                </Text>
                <Text>{car.info.description}</Text>
              </View>

              <View style={{ width: '85%' }}>
                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Owner</Text>
                  <Text>{car.info.owner}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Daily Price</Text>
                  <Text>{`$${car.info.dailyPrice}`}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Seating Capacity</Text>
                  <Text>{car.info.seatingCapacity}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Fuel Type</Text>
                  <Text>{car.info.fuelType}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Transmission</Text>
                  <Text>{car.info.transmission}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Mileage</Text>
                  <Text>{`${car.info.mileage} miles`}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>License Plate</Text>
                  <Text>{car.info.licensePlateNumber}</Text>
                </View>

                {featuresLength > 0 && (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
                    {car.info.features &&
                      car.info.features.map((feature, index) => (
                        <View
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          style={{
                            borderColor: 'orange',
                            borderWidth: 1,
                            borderRadius: 15,
                            padding: 5,
                            paddingHorizontal: 10,
                            margin: 5,
                          }}
                        >
                          <Text
                            style={{ fontSize: 12, color: theme === 'light' ? '#222' : '#fff' }}
                          >
                            {feature}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
      <View
        style={{
          marginBottom: -20,
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
        {bookCar && (
          <View style={{ width: '45%' }}>
            <TouchableOpacity style={styles.activeButton} onPress={handleBookCar}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
        {!bookCar && (
          <View style={{ width: '45%' }}>
            <TouchableOpacity style={styles.activeButton} onPress={handleCancelReservation}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showReservationModal && renderReservationModal()}
    </View>
  );
}

export default SelectedCarScreen;
