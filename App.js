import React,{useContext,useEffect,useState} from 'react';

import { StyleSheet, Text, SafeAreaView,StatusBar } from 'react-native';

import { FirebaseContext } from './FirebaseContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Components/Login';
import Register from './Components/Register';
import Secure from './Components/Secure';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {

  const {auth} = useContext(FirebaseContext);

  const [user, setUser] = useState(null);

  useEffect(() => {

    const authChange = auth.onAuthStateChanged(userAuth => {

      setUser(userAuth);

      console.log("user",userAuth)

    }) ;

    return () => {

      authChange

    }

  }, [])

  return (
    <NavigationContainer>

       {

        user ? 
        <>
        <Secure/>

        </>

        :

        <> 

          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>

        </> 

      }

    </NavigationContainer>
  );

}

export default App

  