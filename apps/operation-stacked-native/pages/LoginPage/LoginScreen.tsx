import {View, Button, Text, StyleSheet} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const googleAuthApi = new GoogleAuthApi();
const userIdApi = new UserIdApi();

export async function handleGoogleSuccess(idToken: string): Promise<[boolean, string]> {
  try {
    const authResponse = await googleAuthApi.googleAuthGoogleSignInPost({ idToken });
    if (authResponse.data.success) {
      const userIdResponse = await userIdApi.apiUserIdGetUserIdGet({ withCredentials: true });
      // @ts-ignore
      const userId = userIdResponse.data.userId;
      console.log(userId);
      return [true, userId];
    } else {
      console.error('Google Authentication failed');
      return [false, 'Google Authentication failed'];
    }
  } catch (error) {
    console.error('Error processing Google login', error);
    return [false, error instanceof Error ? error.message : String(error)]; // Error handling
  }
}

const LoginScreen = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;
      // Use the shared authentication function
      const [success, result] = await handleGoogleSuccess(idToken);
      if (success) {
        console.log('Login successful, userId:', result);
      } else {
        console.error('Login failed:', result);
        // Show an error message
      }
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === 'CANCELED') {
        console.log('User cancelled the login flow');
      } else {
        // Some other error
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Google</Text>
      <Button title="Google Sign-In" onPress={signIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
  },
});

export default LoginScreen;
