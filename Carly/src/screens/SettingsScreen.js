import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, changeUnit, changeAutoLocation, rememberFilters } from '../redux/actions';

function SettingsScreen({ navigation, onLogout }) {
  const theme = useSelector((state) => state.theme);
  const unit = useSelector((state) => state.unit);
  const autoLocation = useSelector((state) => state.autoLocation);
  const dispatch = useDispatch();
  const remember = useSelector((state) => state.rememberFilters);

  const [rFilters, setRFilters] = useState(remember);
  const [autoSetLocation, setAutoSetLocation] = useState(autoLocation);

  const handleResetData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error resetting data:', error);
    }
  };

  useEffect(() => {
    dispatch(changeAutoLocation(autoLocation));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, autoSetLocation]);

  useEffect(() => {
    dispatch(rememberFilters(rFilters));
  }, [dispatch, rFilters]);

  const toggleTheme = (value) => {
    AsyncStorage.setItem('theme', JSON.stringify(value));
    dispatch(changeTheme(value));
  };

  const renderSettingRow = (label, element) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Text style={{ fontSize: 15, color: theme === 'light' ? '#222' : '#fff' }}>{label}</Text>
      <View>{element}</View>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      {renderSettingRow(
        'Remember my filters',
        <Switch value={rFilters} onValueChange={(value) => setRFilters(value)} />
      )}

      {renderSettingRow(
        'Theme',
        <Picker
          selectedValue={theme}
          onValueChange={(value) => toggleTheme(value)}
          style={{ width: 150, color: theme === 'light' ? '#222' : '#fff' }}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Another" value="another" />
        </Picker>
      )}

      {renderSettingRow(
        'Set my location automatically',
        <Switch value={autoLocation} onValueChange={(value) => setAutoSetLocation(value)} />
      )}

      {renderSettingRow(
        'Default units',
        <Picker
          selectedValue={unit}
          onValueChange={(value) => dispatch(changeUnit(value))}
          style={{ width: 200, color: theme === 'light' ? '#222' : '#fff' }}
        >
          <Picker.Item label="Kilometers" value="kilometers" />
          <Picker.Item label="Metres" value="meters" />
        </Picker>
      )}

      <TouchableOpacity onPress={handleResetData}>
        <Text
          style={{
            color: theme === 'light' ? '#222' : '#fff',
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 30,
          }}
        >
          Reset my data
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogout}>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;
