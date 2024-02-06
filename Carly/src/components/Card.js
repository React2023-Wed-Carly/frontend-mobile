import { View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Card({ children }) {
  const theme = useSelector((state) => state.theme);
  return (
    <View
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#222',
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
        borderColor: theme === 'light' ? '#eee' : '#666',
        borderWidth: 1,
      }}
    >
      {children}
    </View>
  );
}
