import React, { useState } from 'react'
import { ViewStyle, TextStyle, InputStyle, ButtonStyle, ImageStyle } from '../config/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import users from '../constants/api/users'
import setAuthorizationHeader from '../config/setAuthorizationHeader'

import orders from '../constants/api/orders'

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({})

    const submit = () => {
        users.login({ ...inputs })
            .then(async res => {
                await AsyncStorage.setItem("@user_session", JSON.stringify(res.data))
                setAuthorizationHeader(res.data.token)
                orders.getOrderReady()
                    .then(async (res) => {
                        const orderID = res.data.id
                        await AsyncStorage.setItem("@order_id", orderID.toString())
                    })
                    .catch(err => console.log("err get order id in login ", err))
                navigation.navigate("HomeStack")
            })
            .catch(err => console.log("err login ", err))
    }

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
                    Welcome
                </TextStyle>
                <TextStyle
                    className='text-sm text-gray-400 mb-8'
                >
                    Sign In to your account
                </TextStyle>

                <ViewStyle
                    className='mb-5'
                >
                    <TextStyle className='font-bold'>
                        Email
                    </TextStyle>
                    <InputStyle
                        className='bg-gray-100 text-black py-3 pl-5 mt-1'
                        placeholder='Enter your email address'
                        onChangeText={(email) => setInputs({ ...inputs, email: email })}
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
                        onChangeText={(password) => setInputs({ ...inputs, password: password })}
                        secureTextEntry={true}
                    />
                </ViewStyle>

                <ButtonStyle
                    className='w-100 bg-black h-14 rounded-xl justify-center items-center'
                    onPress={submit}
                >
                    <TextStyle
                        className='text-white font-bold text-base'
                    >
                        Sign In
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
                        Sign In with Google
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
                        Sign In with Facebook
                    </TextStyle>
                </ButtonStyle>

                <ViewStyle
                    className='flex-row mt-5 justify-center'
                >
                    <TextStyle
                        className='text-gray-400'
                    >Create account ? </TextStyle>
                    <TextStyle
                        className='text-bold underline'
                        onPress={() => navigation.navigate("Register")}
                    > Sign Up</TextStyle>
                </ViewStyle>
            </ViewStyle>

        </ViewStyle>
    )
}

export default Login