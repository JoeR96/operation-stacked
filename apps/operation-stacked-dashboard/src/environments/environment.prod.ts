export const environment = {
  authBaseUrl: process.env.AUTH_BASE_URL || 'default_auth_url',
  workoutBaseUrl: process.env.WORKOUT_BASE_URL || 'default_workout_url',
  connectionString: process.env.DB_CONNECTION_STRING || 'default_connection_string'
};
