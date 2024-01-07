import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	drawerContainer: {
		backgroundColor: 'yellow',
	},
	drawerStyle: {
		backgroundColor: 'yellow',
	},
	drawerLabel: {
		fontWeight: 'bold',
	},
	screenContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	separator: {
		height: 20, // Adjust the height as needed for the desired space
	},
	activeButton: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#bbb',
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
		marginBottom: 20,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
});

export const accountStyles = StyleSheet.create({
	container: {
		padding: 20,
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	userInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	userInfoText: {
		marginLeft: 10,
		fontSize: 16,
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		marginBottom: 10,
	},
	distanceText: {
		fontSize: 16,
		marginBottom: 10,
	},
	logoutText: {
		fontSize: 16,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	actionText: {
		color: 'red',
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 10,
	},
});

export const selectedCarStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	carImage: {
		width: 230,
		height: 230,
		resizeMode: 'cover',
		borderRadius: 10,
	},
	carName: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	carInfo: {
		marginTop: 10,
		alignItems: 'center',
	},
	carDetail: {
		fontSize: 16,
	},
});

export const carItemStyles = StyleSheet.create({
	titleContainer: {
		marginTop: 'auto',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	image: {
		width: 150,
		height: 150,
		resizeMode: 'cover',
		borderRadius: 10,
		marginRight: 20,
	},
	infoContainer: {
		marginTop: 50,
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
});
