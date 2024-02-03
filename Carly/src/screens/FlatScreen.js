import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import { styles, selectedCarStyles } from '../styles';
import { useSelector } from 'react-redux';

export default function FlatScreen({ route, navigation }) {
  const { flat } = route.params;
  const theme = useSelector(state=>state.theme);

  const labelStyle = { fontWeight: 'bold', paddingRight: 10, color:theme === 'light' ? '#222' : '#fff' };
  const valueStyle = { color:theme === 'light' ? '#222' : '#fff' };
  const textPairContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
    color:theme === 'light' ? '#222' : '#fff'
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
                  style={{ fontWeight: 'bold', fontSize: 20, color:theme === 'light' ? '#222' : '#fff' }}
                >{`${flat.title}`}</Text>
                <Text style={{color:theme === 'light' ? '#222' : '#fff'}}>{flat.description}</Text>
              </View>
            </View>

            <View style={{ width: '85%' }}>
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
                        <Text style={{ fontSize: 12, color: theme === 'light' ? '#222' : '#fff' }}>{feature}</Text>
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
      </View>

    </View>
  );
}
