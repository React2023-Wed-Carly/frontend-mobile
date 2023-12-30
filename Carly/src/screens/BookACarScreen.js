import { ScrollView, View, Text } from 'react-native';
import { styles } from '../styles';
import BookCarList from '../components/BookCarList';

export default function BookACarScreen() {
	return (
		<ScrollView>
			<View style={styles.screenContainer}>
			<Text>Book a Car Screen</Text>
			<BookCarList/>
			</View>
		</ScrollView>
	);
}
