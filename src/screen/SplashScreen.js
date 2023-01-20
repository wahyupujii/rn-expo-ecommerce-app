import React from 'react'
import { TextStyle, ViewStyle, ImageStyle, ButtonStyle } from '../config/style'
import AntDesign from "react-native-vector-icons/AntDesign";

const SplashScreen = ({ navigation }) => {
    return (
        <ViewStyle
            className='flex-1 justify-center items-center bg-white'
        >
            <TextStyle
                className='top-12 left-0 absolute py-1 text-5xl font-bold text-black mx-6'
            >
                Define yourself in your unique way.
            </TextStyle>
            <ImageStyle
                className='mt-28'
                source={require("../../assets/imageSplash.png")}
            />
            <ViewStyle
                className="absolute bottom-0 left-0 right-0 w-100 p-6 items-center bg-white"
            >
                <ButtonStyle
                    className='bg-black w-72 h-14 rounded-xl flex-row justify-center items-center'
                    onPress={() => navigation.navigate("Login")}
                >
                    <TextStyle className='text-white text-base mr-3'>Get Started</TextStyle>
                    <AntDesign
                        name='arrowright'
                        color="#fff"
                        size={16}
                    />
                </ButtonStyle>
            </ViewStyle>
        </ViewStyle>
    )
}

export default SplashScreen