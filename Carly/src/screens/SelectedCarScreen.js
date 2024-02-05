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

// import DateTimePicker from '@react-native-community/datetimepicker';

import Card from '../components/Card';
import { sendCarBooking } from '../redux/api';

function SelectedCarScreen({ navigation, route }) {
  const { car, bookCar, reservation } = route.params;

  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.currentLocation);
  const currentCarBooking = useSelector((state) => state.currentCarBooking);
  const theme = useSelector((state) => state.theme);

  const [startDate, setStartDate] = useState(new Date('2024-12-10T03:24:00'));
  const [endDate, setEndDate] = useState(new Date('2024-12-12T03:24:00'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showModal, setShowModal] = useState(true);
  const [modalMessage, setModalMessage] = useState('Dates are overlapping.');

  const closeModal = () => {
    setShowModal(false);
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

  const renderDatePicker = () => {
    if (showDatePicker) {
      return (
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: 'blue' }}>Select End Date</Text>
        </TouchableOpacity>
      );
    }
    return <></>;
  };

  const openCancelModal = () => {
    setShowModal(true);
    setModalMessage('Are you sure you want to cancel this reservation?');
  };

  const handleBookCar = async () => {
    try {
      await dispatch(
        sendCarBooking(car.info.id, {
          carId: car.info.id,
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          integratedSystemId: 0,
        })
      );
    } catch (error) {
      setModalMessage('Dates are overlapping. Please choose another date.');
      setShowModal(true);
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
              closeModal();
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
                source={require('../../assets/dummy_cars/car.png')}
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
                  <Text style={labelStyle}>Start date:</Text>
                  {bookCar ? (
                    <Text>{startDate.toLocaleDateString()}</Text>
                  ) : (
                    <Text>{reservation.startDate}</Text>
                  )}
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>End date:</Text>
                  {bookCar ? renderDatePicker() : <Text>{reservation.endDate}</Text>}
                </View>

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

        <Modal visible={showModal} animationType="slide" transparent={false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text>{modalMessage}</Text>
              <Button title="OK" onPress={closeModal} />
            </View>
          </View>
        </Modal>
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
    </View>
  );
}

export default SelectedCarScreen;
