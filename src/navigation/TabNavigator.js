import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ImageStyle, TextStyle, ViewStyle } from '../config/style';
import Discover from '../screen/Discover'
import Saved from "../screen/Saved";
import Cart from "../screen/Cart";
import Settings from "../screen/Settings";

import {
    home, saved, cart, settings, homeFocus, savedFocus, cartFocus, settingsFocus
} from "../constants/tabImages";

const Tab = createBottomTabNavigator()

const tabSection = (focused, iconFocus, iconUsual, routeName) => {
    return (
        <ViewStyle className='items-center'>
            <ImageStyle source={focused ? iconFocus : iconUsual} />
            <TextStyle
                style={{
                    fontSize: 12,
                    marginTop: 3,
                    color: focused ? "#000" : "rgb(229 231 235)"
                }}
            >
                {routeName}
            </TextStyle>
        </ViewStyle>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === "Home") {
                        return tabSection(focused, homeFocus, home, route.name)
                    } else if (route.name === "Saved") {
                        return tabSection(focused, savedFocus, saved, route.name)
                    } else if (route.name === "Cart") {
                        return tabSection(focused, cartFocus, cart, route.name)
                    } else if (route.name === "Settings") {
                        return tabSection(focused, settingsFocus, settings, route.name)
                    }
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    elevation: 0,
                    paddingVertical: 10
                }
            })}
        >
            <Tab.Screen name='Home' component={Discover} />
            <Tab.Screen name='Saved' component={Saved} />
            <Tab.Screen name='Cart' getComponent={() => require("../screen/Cart").default} options={{
                tabBarStyle: {
                    display: "none"
                }
            }} />
            <Tab.Screen name='Settings' component={Settings} />
        </Tab.Navigator>
    )
}

export default TabNavigator