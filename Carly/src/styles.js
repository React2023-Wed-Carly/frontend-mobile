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
    backgroundColor: '#ffbe30',
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
  buttonText: {
    color: 'green',
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
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333333',
    width: '90%',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    flex: 1,
    margin: 10,
  },
  activeModalButton: {
    backgroundColor: '#ffbe30',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const selectedCarStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    height: 230,
    width: 300,
    resizeMode: 'contain',
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

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: '#27ae60',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#ffbe30',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: '#ffbb24',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export const filterStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sliderSection: {
    paddingHorizontal: 5,
    maxWidth: 150,
  },
  sliderContainer: {
    height: 30,
  },
  applyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: -20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  multiSelectDropdown: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    maxHeight: '50%',
  },
  multiSelectList: {
    maxHeight: 200,
  },
});
