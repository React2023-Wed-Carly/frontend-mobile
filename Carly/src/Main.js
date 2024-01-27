import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import store from './redux/store';
import App from './App';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default registerRootComponent(Main);
