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
});

export const accountStyles = StyleSheet.create({
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

  export const carItemStyles = StyleSheet.create({
	container: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  padding: 10,
	  borderBottomWidth: 1,
	  borderColor: '#ccc',
	},
	image: {
	  width: 80,
	  height: 80,
	  marginRight: 10,
	},
	infoContainer: {
	  flex: 1,
	  marginRight: 10,
	  marginLeft: 10,
	  marginTop: 30,
	},
	infoRow: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  marginTop: 5,
	},
	info: {
	  fontSize: 15,
	  marginRight: 5,
	  marginLeft: 5,
	},
	distanceContainer: {
	  alignItems: 'flex-end',
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold'
	}
  });