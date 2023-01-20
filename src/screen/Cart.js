import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Platform, StatusBar, RefreshControl } from 'react-native'
import { ButtonStyle, ScrollViewStyle, TextStyle, ViewStyle } from '../config/style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AntDesign from "react-native-vector-icons/AntDesign"
import IonIcons from "react-native-vector-icons/Ionicons"
import carts from '../constants/api/carts'
import CartCard from '../components/CartCard'
import convertRupiah from '../utils/convertRupiah'

const Cart = ({ navigation }) => {
    const [cartData, setCartData] = useState([])
    const [dataCount, setDataCount] = useState(0)
    const [ammount, setAmmount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);

    const getAmmount = (products) => {
        let ammountTemp = 0
        products.map(data => {
            ammountTemp += data.total_price
        })
        setAmmount(ammountTemp);
    }

    const fetchData = async () => {
        const orderID = await AsyncStorage.getItem("@order_id")
        carts.getCart(parseInt(orderID))
            .then(res => {
                getAmmount(res.data.products);
                setCartData(res.data.products)
                setDataCount(res.data.products.length)
                setLoading(false)
            })
            .catch(() => {
                setDataCount(0)
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchData()
    }, [dataCount])

    const countData = async (product, action, index) => {
        let url = "";
        action === "plus" ?
            url = "/cart/user-cart/add-count"
            :
            url = "/cart/user-cart/minus-count"

        const orderID = await AsyncStorage.getItem("@order_id")

        if ((product.count === 1) && (action === "minus")) return

        carts.changeCount(url, {
            order_id: parseInt(orderID),
            product_id: product.id
        })
            .then(res => {
                if (res.hasOwnProperty("data")) {
                    // copy array
                    const newArray = [...cartData]
                    newArray[index] = { ...newArray[index], count: res.data.count, total_price: res.data.total_price }
                    setCartData(newArray)
                    getAmmount(newArray)
                }
            })
            .catch(err => console.log(err))
    }

    const deleteData = async (productID) => {
        const orderID = await AsyncStorage.getItem("@order_id")
        carts.deleteProduct({
            data: {
                order_id: parseInt(orderID),
                product_id: productID
            }
        })
            .then(() => {
                setDataCount(dataCount - 1)
                Alert.alert("Berhasil menghapus produk dari keranjang")
            })
            .catch(() => Alert.alert("Gagal menghapus produk dari keranjang"))
    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false))
    }

    return (
        <ViewStyle
            className='flex-1 bg-white'
            style={{ marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
        >
            <ScrollViewStyle
                showsVerticalScrollIndicator={false}
                className="mb-20"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <ViewStyle
                    className='mx-5'
                >
                    <ViewStyle
                        className='mt-6 flex-row justify-between items-center mb-5'
                    >
                        <ButtonStyle
                            onPress={() => navigation.navigate("Home")}
                        >
                            <AntDesign
                                name='arrowleft'
                                size={24}
                            />
                        </ButtonStyle>
                        <TextStyle
                            className='text-2xl font-bold'
                        >My Cart</TextStyle>
                        <IonIcons
                            name='ios-notifications-outline'
                            size={24}
                        />
                    </ViewStyle>

                    <ViewStyle>
                        {
                            loading ? (
                                <ActivityIndicator size="large" />
                            ) :
                                dataCount === 0 ? (
                                    <TextStyle>Keranjang masih kosong</TextStyle>
                                ) : (
                                    cartData.map((product, index) => {
                                        return (
                                            <CartCard
                                                key={index}
                                                data={product}
                                                handleDelete={(productID) => deleteData(productID)}
                                                handleCount={(product, action) => countData(product, action, index)}
                                            />
                                        )
                                    })
                                )
                        }
                    </ViewStyle>
                    <ViewStyle
                        className='bg-gray-100 mb-4 pl-5 py-4 rounded-lg'
                    >
                        <TextStyle className='text-gray-400'>Add a voucher</TextStyle>
                    </ViewStyle>

                    {
                        loading ? (
                            <ActivityIndicator
                                size="large"
                            />
                        ) : (
                            <ViewStyle>
                                <ViewStyle className='flex-row justify-between mb-2'>
                                    <TextStyle className='text-gray-400'>Sub-total</TextStyle>
                                    <TextStyle>{convertRupiah(ammount)}</TextStyle>
                                </ViewStyle>
                                <ViewStyle className='flex-row justify-between mb-2'>
                                    <TextStyle className='text-gray-400'>VAT (%)</TextStyle>
                                    <TextStyle>Rp. 0</TextStyle>
                                </ViewStyle>
                                <ViewStyle className='flex-row justify-between mb-2'>
                                    <TextStyle className='text-gray-400'>Shipping fee</TextStyle>
                                    <TextStyle>Rp. 2.000</TextStyle>
                                </ViewStyle>
                            </ViewStyle>
                        )
                    }

                    <ViewStyle className='border-t-2 border-gray-200 py-3 flex-row justify-between'>
                        <TextStyle>Total</TextStyle>
                        <TextStyle>{convertRupiah(parseInt(ammount) + 2000)}</TextStyle>
                    </ViewStyle>

                </ViewStyle>

            </ScrollViewStyle>

            <ViewStyle
                className='flex-row items-center px-5 py-3 justify-between absolute bottom-0 left-0 right-0 bg-white border-2 border-gray-100'
            >
                <ButtonStyle
                    className='w-full flex-row items-center justify-center bg-black py-4 px-9 rounded-xl'
                >
                    <TextStyle
                        className='text-white mr-1'
                    >Checkout </TextStyle>
                    <AntDesign name='arrowright' color={"#fff"} size={14} />
                </ButtonStyle>
            </ViewStyle>
        </ViewStyle>
    )
}

export default Cart