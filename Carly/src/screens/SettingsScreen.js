import React, { useState } from 'react';
import {
  View, Text, Switch, TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen() {
  const [rememberFilters, setRememberFilters] = useState(false);
  const [theme, setTheme] = useState('light');
  const [autoSetLocation, setAutoSetLocation] = useState(true);
  const [defaultUnits, setDefaultUnits] = useState('kilometers');

  const handleResetData = async () => {
    // Perform actions to reset data (e.g., log out and clear AsyncStorage)
    try {
      // Perform logout actions here (if any)

      // Clear AsyncStorage
      await AsyncStorage.clear();

      // Additional actions after data reset
    } catch (error) {
      console.error('Error resetting data:', error);
    }
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
      <Text style={{ fontSize: 15 }}>{label}</Text>
      <View>{element}</View>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      {renderSettingRow(
			  'Remember my filters',
        <Switch
          value={rememberFilters}
          onValueChange={(value) => setRememberFilters(value)}
        />,
      )}

      {renderSettingRow(
        'Theme',
        <Picker
          selectedValue={theme}
          onValueChange={(value) => setTheme(value)}
          style={{ width: 150 }}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Another" value="another" />
        </Picker>,
      )}

      {renderSettingRow(
        'Set my location automatically',
        <Switch
          value={autoSetLocation}
          onValueChange={(value) => setAutoSetLocation(value)}
        />,
      )}

      {renderSettingRow(
        'Default units',
        <Picker
          selectedValue={defaultUnits}
          onValueChange={(value) => setDefaultUnits(value)}
          style={{ width: 200 }}
        >
          <Picker.Item label="Kilometers" value="kilometers" />
          <Picker.Item label="Miles" value="miles" />
        </Picker>,
      )}

      <TouchableOpacity onPress={handleResetData}>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 15 }}>
          Reset my data
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;
