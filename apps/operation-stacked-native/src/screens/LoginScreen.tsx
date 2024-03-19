import React, { useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { GoogleAuthApi, UserIdApi } from 'auth-api';

const googleAuthApi = new GoogleAuthApi();
const userIdApi = new UserIdApi();

const redirectUri = AuthSession.makeRedirectUri({ useProxy: false });

async function handleGoogleSuccess(token: string): Promise<[boolean, string]> {
  try {
    const authResponse = await googleAuthApi.googleAuthGoogleSignInPost({ idToken: token });
    if (authResponse.data.success) {
      const userIdResponse = await userIdApi.apiUserIdGetUserIdGet({ withCredentials: true });
      const userId = userIdResponse.data.userId;
      console.log('UserId:', userId);
      return [true, userId];
    } else {
      console.error('Google Authentication failed');
      return [false, 'Google Authentication failed'];
    }
  } catch (error) {
    console.error('Error processing Google login:', error);
    return [false, error instanceof Error ? error.message : String(error)];
  }
}

export default function LoginScreen() {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: '876582448990-0ac35vm82d195s99isjnevbtljirsmuf.apps.googleusercontent.com',
      responseType: 'token',
      scopes: ['openid', 'profile', 'email'],
    },
    {}
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      handleGoogleSuccess(access_token).then(([success, result]) => {
        if (success) {
          console.log('Login successful, userId:', result);
        } else {
          console.error('Login failed:', result);
        }
      });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Google</Text>
      <Button
        disabled={!request}
        title="Google Sign-In"
        onPress={() => promptAsync({})}
      />
    </View>
  );
}

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
