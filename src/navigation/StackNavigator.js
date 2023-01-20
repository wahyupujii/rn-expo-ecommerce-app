import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screen/SplashScreen'
import Login from '../screen/Login'
import Register from '../screen/Register'
import TabNavigator from './TabNavigator'
import Detail from '../screen/Detail'

const Stack = createStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="HomeStack" component={TabNavigator} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}

export default StackNavigator