import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { styles, selectedCarStyles } from '../styles';
import Card from '../components/Card';
import { useSelector } from 'react-redux';

function SelectedCarScreen({ navigation, route }) {
  const { car, bookCar, reservation } = route.params;
  const theme = useSelector(state=>state.theme);

  const featuresLength = car.features ? car.features.length : 0;

  const textPairContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    color:theme === 'light' ? '#222' : '#fff'
  };

  const labelStyle = { fontWeight: 'bold', paddingRight: 10, color:theme === 'light' ? '#222' : '#fff' };
  const valueStyle = { color:theme === 'light' ? '#222' : '#fff' };


  const handleBookCar = () => {
    // book a car logic
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
                <Text style={{ fontWeight: 'bold', fontSize: 20, color:theme === 'light' ? '#222' : '#fff' }}>
                  {`${car.info.brand} ${car.info.model} ${car.info.year}`}
                </Text>
                <Text style={{color:theme === 'light' ? '#222' : '#fff' }}>{car.info.description}</Text>
              </View>

              <View style={{ width: '85%' }}>
              {reservation && (
                <>
                  <View style={textPairContainerStyle}>
                    <Text style={labelStyle}>Start date:</Text>
                    <Text style={valueStyle}>{reservation.startDate}</Text>
                  </View>

                  <View style={textPairContainerStyle}>
                    <Text style={labelStyle}>End date:</Text>
                    <Text style={valueStyle}>{reservation.endDate}</Text>
                  </View>
                </>
              )}

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Owner</Text>
                  <Text style={valueStyle}>{car.info.owner}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Daily Price</Text>
                  <Text style={valueStyle}>{`$${car.info.dailyPrice}`}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Seating Capacity</Text>
                  <Text style={valueStyle}>{car.info.seatingCapacity}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Fuel Type</Text>
                  <Text style={valueStyle}>{car.info.fuelType}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Transmission</Text>
                  <Text style={valueStyle}>{car.info.transmission}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>Mileage</Text>
                  <Text style={valueStyle}>{`${car.info.mileage} miles`}</Text>
                </View>

                <View style={textPairContainerStyle}>
                  <Text style={labelStyle}>License Plate</Text>
                  <Text style={valueStyle}>{car.info.licensePlateNumber}</Text>
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
                    {car.features.map((feature, index) => (
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
                        <Text style={{ fontSize: 12, color:theme === 'light' ? '#222' : '#fff' }}>{feature}</Text>
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
      </View>
    </View>
  );
}

export default SelectedCarScreen;
