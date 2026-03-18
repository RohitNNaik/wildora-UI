import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import PhoneAuthScreen from './src/screens/PhoneAuthScreen';
import FeedScreen from './src/screens/FeedScreen';
import UploadPhotoScreen from './src/screens/UploadPhotoScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import DestinationsScreen from './src/screens/DestinationsScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            {user == null ? (
              <>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Feed" component={FeedScreen} />
                <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} />
                <Stack.Screen name="Destinations" component={DestinationsScreen} />
                <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
