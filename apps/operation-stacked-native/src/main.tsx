import { AppRegistry } from 'react-native';
import App from './app/App';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

AppRegistry.registerComponent('OperationStackedNative', () => App);
GoogleSignin.configure({
  webClientId: '876582448990-0ac35vm82d195s99isjnevbtljirsmuf.apps.googleusercontent.com',
});
