import { ViewStyle, TextStyle, InputStyle, ButtonStyle, ImageStyle } from '../config/style'
import React from 'react'

const Register = ({ navigation }) => {
    return (
        <ViewStyle
            className='flex-1 bg-white'
        >
            <ViewStyle
                className='mt-12 mx-6'
            >
                <TextStyle
                    className='text-3xl font-extrabold'
                >
                    Create an account
                </TextStyle>
                <TextStyle
                    className='text-sm text-gray-400 mb-8'
                >
                    Let's create your account
                </TextStyle>

                <ViewStyle
                    className='mb-5'
                >
                    <TextStyle className='font-bold'>
                        Full Name
                    </TextStyle>
                    <InputStyle
                        className='bg-gray-100 text-black py-3 pl-5 mt-1'
                        placeholder='Enter your full name'
                    />
                </ViewStyle>

                <ViewStyle
                    className='mb-5'
                >
                    <TextStyle className='font-bold'>
                        Email
                    </TextStyle>
                    <InputStyle
                        className='bg-gray-100 text-black py-3 pl-5 mt-1'
                        placeholder='Enter your email address'
                    />
                </ViewStyle>

                <ViewStyle
                    className='mb-5'
                >
                    <TextStyle className='font-bold'>
                        Password
                    </TextStyle>
                    <InputStyle
                        className='bg-gray-100 text-black py-3 pl-5 mt-1'
                        placeholder='Enter your password'
                    />
                </ViewStyle>

                <ButtonStyle
                    className='w-100 bg-black h-14 rounded-xl justify-center items-center'
                    onPress={() => navigation.navigate("HomeStack")}
                >
                    <TextStyle
                        className='text-white font-bold text-base'
                    >
                        Sign Up
                    </TextStyle>
                </ButtonStyle>

                <TextStyle className='text-center my-5'>Or</TextStyle>

                <ButtonStyle
                    className='w-100 h-14 flex-row rounded-xl justify-center items-center border-2 border-gray-200'
                >
                    <ImageStyle
                        source={require("../../assets/googleIcon.png")}
                    />
                    <TextStyle
                        className='font-bold ml-4'
                    >
                        Sign Up with Google
                    </TextStyle>
                </ButtonStyle>

                <ButtonStyle
                    className='w-100 h-14 mt-3 flex-row rounded-xl bg-blue-600 justify-center items-center'
                >
                    <ImageStyle
                        source={require("../../assets/fbIcon.png")}
                    />
                    <TextStyle
                        className='text-white font-bold ml-4'
                    >
                        Sign Up with Facebook
                    </TextStyle>
                </ButtonStyle>

                <ViewStyle
                    className='flex-row mt-5 justify-center'
                >
                    <TextStyle
                        className='text-gray-400'
                    >Already a member ? </TextStyle>
                    <TextStyle
                        className='text-bold underline'
                        onPress={() => navigation.navigate("Login")}
                    > Sign In</TextStyle>
                </ViewStyle>
            </ViewStyle>
        </ViewStyle>
    )
}

export default Register