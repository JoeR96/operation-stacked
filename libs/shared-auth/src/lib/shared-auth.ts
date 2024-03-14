import { GoogleAuthApi, UserIdApi } from '@operation-stacked/shared-services';

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
