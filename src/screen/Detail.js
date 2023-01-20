import React from 'react'
import { Alert, Platform, StatusBar } from 'react-native';
import { ButtonStyle, ImageStyle, ScrollViewStyle, TextStyle, ViewStyle } from '../config/style'
import AsyncStorage from "@react-native-async-storage/async-storage"
import AntDesign from "react-native-vector-icons/AntDesign";
import IonIcons from "react-native-vector-icons/Ionicons";
import convertRupiah from '../utils/convertRupiah';
import carts from '../constants/api/carts';
import orders from '../constants/api/orders';

const Detail = ({ route, navigation }) => {
    const { data } = route.params
    const productImage = `http://192.168.1.8:3000/${data.image}`

    const addToCart = (product, orderID) => {
        carts
            .addCart({
                order_id: orderID,
                product_id: product.id,
                price: product.price
            })
            .then(() => Alert.alert("Produk berhasil ditambahkan ke keranjang"))
            .catch((err) => {
                if (err.response.data.message) {
                    Alert.alert("Produk sudah ada di keranjang")
                }
            })
    }

    const makeOrder = (product) => {
        orders
            .create()
            .then(async res => {
                addToCart(product, res.data)
                let orderID = res.data
                await AsyncStorage.setItem("@order_id", orderID.toString())
            })
            .catch((err) => {
                if (err.response?.data?.message === "pending orders found") {
                    return Alert.alert("Ada orderan yang belum diverifikasi, coba lagi nanti")
                }
                navigation.navigate("Login")
            })
    }


    return (
        <ViewStyle
            className='flex-1 bg-white'
            style={{
                marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}
        >
            <ScrollViewStyle className='mx-6 mb-24' showsVerticalScrollIndicator={false} >
                <ViewStyle
                    className='mt-6 flex-row justify-between items-center'
                >
                    <ButtonStyle
                        onPress={() => navigation.navigate("HomeStack")}
                    >
                        <AntDesign
                            name='arrowleft'
                            size={24}
                        />
                    </ButtonStyle>
                    <TextStyle
                        className='text-2xl font-bold'
                    >Details</TextStyle>
                    <IonIcons
                        name='ios-notifications-outline'
                        size={24}
                    />
                </ViewStyle>

                <ViewStyle
                    className='w-full h-72 mt-3'
                >
                    <ImageStyle
                        source={{ uri: productImage }}
                        className="w-full h-full rounded-xl"
                    />
                    <ButtonStyle
                        className='bg-white p-2 absolute right-3 top-3 rounded-md'
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,

                            elevation: 9,
                        }}
                    >
                        <AntDesign name='hearto' size={18} />
                    </ButtonStyle>
                </ViewStyle>

                <TextStyle
                    className='text-2xl mt-4 font-bold'
                >{data.name}</TextStyle>
                <TextStyle className='mt-2'>
                    <IonIcons name='star' color={"#FFA928"} size={17} /> 4.5/5 (45 reviews)
                </TextStyle>

                <TextStyle className='text-sm my-5'>
                    {data.description}
                </TextStyle>

                <TextStyle
                    className='text-lg font-bold mb-3'
                >Choose Size</TextStyle>

                <ViewStyle
                    className='flex-row'
                >
                    <ButtonStyle
                        className='py-3 px-4 border-2 border-gray-100 rounded-lg'
                    >
                        <TextStyle className='font-bold text-xl'>S</TextStyle>
                    </ButtonStyle>
                    <ButtonStyle
                        className='py-3 px-4 mx-3 border-2 border-gray-100 rounded-lg'
                    >
                        <TextStyle className='font-bold text-xl'>M</TextStyle>
                    </ButtonStyle>
                    <ButtonStyle
                        className='py-3 px-4 border-2 border-gray-100 rounded-lg'
                    >
                        <TextStyle className='font-bold text-xl'>L</TextStyle>
                    </ButtonStyle>
                </ViewStyle>
            </ScrollViewStyle>

            {/* footer */}

            <ViewStyle
                className='flex-row items-center px-6 py-3 justify-between absolute bottom-0 left-0 right-0 bg-white border-2 border-gray-100'
            >
                <ViewStyle>
                    <TextStyle>Price</TextStyle>
                    <TextStyle
                        className='text-2xl font-bold'
                    >{convertRupiah(data.price)}</TextStyle>
                </ViewStyle>
                <ButtonStyle
                    className='flex-row items-center justify-center bg-black py-4 px-9 rounded-xl'
                    onPress={() => makeOrder(data)}
                >
                    <ImageStyle
                        source={require("../../assets/cartBag.png")}
                        className="mr-3"
                    />
                    <TextStyle
                        className='text-white'
                    >Add to Cart</TextStyle>
                </ButtonStyle>
            </ViewStyle>
        </ViewStyle>
    )
}

export default Detail