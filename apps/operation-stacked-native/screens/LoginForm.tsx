import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Image } from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import { login } from '../components/authApi';
import { useSelector, useDispatch } from 'react-redux';
import { Button as PaperButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from '../store/slices/store';
import { toggleTheme } from '../store/slices/themeSlice';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { setAuthData } from '../store/slices/authSlice';
import beans from '../assets/beans.png';


type Inputs = {
    email: string;
    password: string;
};

type LoginFormProps = {
    navigation: StackNavigationProp<any, 'Login'>;
};

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const { register, handleSubmit, control } = useForm<Inputs>();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);

        const response = await login(data.email, data.password);

        setLoading(false);

        if (response.userId) {
            try {
                // Dispatch the setAuthData action with the authentication data
                const authData = {
                    userId: response.userId,
                    success: true
                };

                dispatch(setAuthData(authData)); // Add this line to dispatch the action

                // Navigate to dashboard
                navigation.navigate('Dashboard');
            } catch (error) {
                Alert.alert('Error', 'Failed to login or fetch workout data');
            }
        } else {
            Alert.alert('Error', 'Login failed');
        }
    };




    const onRegister = async (data: Inputs) => {
        Alert.alert('Register', 'Registration process goes here');
        // Add your registration API call here
    };

    const onTestLogin = () => {
        // Navigate to dashboard
        navigation.navigate('Dashboard');
    };

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
            paddingHorizontal: 20,
        },
        input: {
            backgroundColor: theme.inputBackground,
            color: theme.text,
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            marginBottom: 10,
        },
        button: {
            marginBottom: 10,
            backgroundColor: "#ff8c00",
            
        },
    });

    const toggleLoginRegister = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <View style={styles.container}>
            <Spinner visible={loading} />
            {!loading && (
                <>
                     <Image
                     style={{ width: 250, height: 150,paddingBottom:200 }}
                    source={beans} // replace this with your local image or any other image
                />
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Email"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={styles.input}
                                placeholderTextColor={theme.placeholderTextColor}
                            />
                        )}
                        name="email"
                        defaultValue=""
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Password"
                                secureTextEntry
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={styles.input}
                                placeholderTextColor={theme.placeholderTextColor}
                            />
                        )}
                        name="password"
                        defaultValue=""
                    />
                    <PaperButton
                        mode="contained"
                        onPress={() => {
                            handleSubmit((data: Inputs) => {
                                data.email = 'joeyrichardson96@gmail.com';
                                data.password = 'Zelfdwnq9512!';
                                onSubmit(data);
                            })();
                        }}
                        style={styles.button}
                    >
BDTV                    </PaperButton>
                    <PaperButton
                        mode="contained"
                        onPress={() => {
                            handleSubmit((data: Inputs) => {
                                data.email = 'joeyyrichardson96@gmail.com';
                                data.password = 'Zelfdwnq9512!';
                                onSubmit(data);
                            })();
                        }}
                        style={styles.button}
                    >
TEST                    </PaperButton>
                    <PaperButton
                        mode="contained"
                        onPress={handleSubmit(isRegistering ? onRegister : onSubmit)}
                        style={styles.button}
                    >
                        {isRegistering ? 'Register' : 'Login'}
                    </PaperButton>
                    
                
                    <PaperButton
                        mode="contained"
                        onPress={toggleLoginRegister}
                        style={styles.button}
                    >
                        {isRegistering ? 'Login' : 'Register'}
                    </PaperButton>
                </>
            )}
        </View>
    );
};

export default LoginForm;
