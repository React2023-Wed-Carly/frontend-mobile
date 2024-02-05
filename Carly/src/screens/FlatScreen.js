import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import { styles, selectedCarStyles } from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import { sendFlatBooking } from '../redux/flatlyApi';
import { useState } from 'react';
import { formatPrice } from '../utils/textFormatting';
import { getFlatBooking } from '../redux/actions';

export default function FlatScreen({ route, navigation }) {
  const { flatId, flatTitle, bookFlat } = route.params;

  const id = useSelector(state=>state.userInfo.id);
  const theme = useSelector((state) => state.theme);
  const flatsDetails = useSelector((state) => state.flatsDetails);
  const flat = flatsDetails.find((item) => item.title === flatTitle);

  if (!flat) {
    return <Text>Could not fetch flat details. try again later.</Text>;
  }

  const dispatch = useDispatch();

  const today = new Date();
  const tommorrow = new Date(today);
  tommorrow.setDate(today.getDate() + 1);

  const [startDate, setStartDate] = useState(today);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [pets, setPets] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const labelStyle = {
    fontWeight: 'bold',
    paddingRight: 10,
    color: theme === 'light' ? '#222' : '#fff',
  };
  const valueStyle = { color: theme === 'light' ? '#222' : '#fff' };
  const textPairContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    color: theme === 'light' ? '#222' : '#fff',
  };

  const calculateEndDate = () => {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + selectedDuration);
    return newEndDate;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  const handleIncreaseDuration = () => {
    setSelectedDuration((prev) => prev + 1);
  };
  const handleDecreaseDuration = () => {
    if (selectedDuration > 1) {
      setSelectedDuration((prev) => prev - 1);
    }
  };
  const handleIncreaseAdults = () => {
    if (adults + children < flat.capacity) setAdults((prev) => prev + 1);
  };
  const handleDecreaseAdults = () => {
    if (adults > 1) {
      setAdults((prev) => prev - 1);
    }
  };
  const handleIncreaseChildren = () => {
    if (adults + children < flat.capacity) setChildren((prev) => prev + 1);
  };
  const handleDecreaseChildren = () => {
    if (children > 1) {
      setChildren((prev) => prev - 1);
    }
  };
  const handleIncreasePets = () => {
    setPets((prev) => prev + 1);
  };
  const handleDecreasePets = () => {
    if (pets > 1) {
      setPets((prev) => prev - 1);
    }
  };

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
            <Text>{formatPrice(flat.price * selectedDuration)}</Text>
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

          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>Adults:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleDecreaseAdults}>
                <Text style={{ fontSize: 20, marginRight: 10 }}>-</Text>
              </TouchableOpacity>
              <Text>{adults}</Text>
              <TouchableOpacity onPress={handleIncreaseAdults}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>Children:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleDecreaseChildren}>
                <Text style={{ fontSize: 20, marginRight: 10 }}>-</Text>
              </TouchableOpacity>
              <Text>{children}</Text>
              <TouchableOpacity onPress={handleIncreaseChildren}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={textPairContainerStyle}>
            <Text style={labelStyle}>Pets:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleDecreasePets}>
                <Text style={{ fontSize: 20, marginRight: 10 }}>-</Text>
              </TouchableOpacity>
              <Text>{pets}</Text>
              <TouchableOpacity onPress={handleIncreasePets}>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

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
            <TouchableOpacity onPress={handleBookFlat} style={styles.activeButton}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const handleBookFlat = async () => {
    try {
      dispatch(
        sendFlatBooking(flat, {
          flatId,
          startDate: formatDate(today),
          endDate: formatDate(calculateEndDate()),
          adults,
          children,
          pets,
          specialRequests: '',
        }, id)
      );
      setShowReservationModal(true);
    } catch (error) {
      // Use the Alert component to display the error message
      Alert.alert(
        'Error',
        'The date you have selected overlaps with an existing reservation. Someone must have booked the flat faster than you - please choose another flat.'
      );
      // Use the Alert component to display the error message
      Alert.alert(
        'Error',
        'The date you have selected overlaps with an existing reservation. Someone must have booked the flat faster than you - please choose another flat.'
      );
    }
  };

  const handleCancelReservation = () => {
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
                source={require('../../assets/apartment.png')}
                style={selectedCarStyles.carImage}
              />
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: theme === 'light' ? '#222' : '#fff',
                  }}
                >{`${flat.title}`}</Text>
                <Text style={{ color: theme === 'light' ? '#222' : '#fff' }}>
                  {flat.description}
                </Text>
              </View>
            </View>



            <View style={{ width: '85%' }}>

            <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Address: </Text>
                <Text style={valueStyle}>
                  {flat.address.street}
                </Text>
              </View>

              <View style={textPairContainerStyle}>
                <Text style={labelStyle}></Text>
                <Text style={valueStyle}>
                  {flat.address.city}, {flat.address.country}
                </Text>
              </View>

              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Owner: </Text>
                <Text style={valueStyle}>
                  {flat.owner.name} {flat.owner.lastName}
                </Text>
              </View>
              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Email: </Text>
                <Text style={valueStyle}>{flat.owner.email}</Text>
              </View>
              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Phone: </Text>
                <Text style={valueStyle}>{flat.owner.phoneNumber}</Text>
              </View>
              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Capacity: </Text>
                <Text style={valueStyle}>{flat.capacity}</Text>
              </View>
              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Beds: </Text>
                <Text style={valueStyle}>{flat.beds}</Text>
              </View>
              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Bedrooms: </Text>
                <Text style={valueStyle}>{flat.bedrooms}</Text>
              </View>
              <View style={textPairContainerStyle}>
                <Text style={labelStyle}>Bathrooms: </Text>
                <Text style={valueStyle}>{flat.bathrooms}</Text>
              </View>

              {flat.facilities.length > 0 && (
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {flat.facilities.map((feature, index) => (
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
                      <Text style={{ fontSize: 12, color: theme === 'light' ? '#222' : '#fff' }}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
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
        {bookFlat && (
          <View style={{ width: '45%' }}>
            <TouchableOpacity style={styles.activeButton} onPress={handleBookFlat}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
        {!bookFlat && (
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
