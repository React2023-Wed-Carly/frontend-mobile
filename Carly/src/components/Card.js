import { View } from 'react-native';

export default function Card({ children }) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        marginBottom: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderWidth: 1,
      }}
    >
      {children}
    </View>
  );
}
