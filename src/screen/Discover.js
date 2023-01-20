import React, { useState, useEffect } from 'react'
import { ViewStyle, TextStyle, InputStyle, ImageStyle, ScrollViewStyle, ButtonStyle } from '../config/style'
import AntDesign from "react-native-vector-icons/AntDesign"
import { ActivityIndicator, Platform, StatusBar } from 'react-native'
import products from '../constants/api/products'
import convertRupiah from '../utils/convertRupiah'

const Discover = ({ navigation }) => {
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        products.getAll()
            .then(res => {
                setDataProducts(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <ViewStyle
            className='flex-1 bg-white'
        >
            <ScrollViewStyle
                showsVerticalScrollIndicator={false}
                className='mx-6'
                style={{
                    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
                }}
            >
                <TextStyle
                    className='text-4xl font-bold mt-6'
                >Discover</TextStyle>

                <ViewStyle
                    className='flex-row mt-4 justify-between mb-4'
                >
                    <ViewStyle
                        className='w-4/5 flex-row p-4 pl-5 bg-gray-200 rounded-xl items-center'
                    >
                        <ImageStyle
                            className='mr-3'
                            source={require("../../assets/searchIcon.png")}
                        />
                        <InputStyle
                            className='text-black'
                            placeholder='Search Anything'
                        />
                    </ViewStyle>

                    <ViewStyle
                        className='p-5 bg-black rounded-xl justify-center items-center'
                    >
                        <ImageStyle
                            source={require("../../assets/filterIcon.png")}
                        />
                    </ViewStyle>
                </ViewStyle>

                <ScrollViewStyle
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    className="mb-4"
                >
                    <ButtonStyle
                        className="px-6 py-2 bg-black rounded-lg mr-6"
                    >
                        <TextStyle
                            className='text-white'
                        >All</TextStyle>
                    </ButtonStyle>
                    <ButtonStyle
                        className="px-6 py-2 bg-gray-200 rounded-lg mr-6"
                    >
                        <TextStyle
                            className='text-black'
                        >Men</TextStyle>
                    </ButtonStyle>
                    <ButtonStyle
                        className="px-6 py-2 bg-gray-200 rounded-lg mr-6"
                    >
                        <TextStyle
                            className='text-black'
                        >Women</TextStyle>
                    </ButtonStyle>
                    <ButtonStyle
                        className="px-6 py-2 bg-gray-200 rounded-lg mr-6"
                    >
                        <TextStyle
                            className='text-black'
                        >Kids</TextStyle>
                    </ButtonStyle>
                </ScrollViewStyle>

                <ViewStyle
                    className='flex-row flex-wrap justify-between'
                >
                    {
                        loading ? (
                            <ActivityIndicator
                                size="large"
                            />
                        ) : dataProducts.length === 0 ? (
                            <TextStyle>Katalog masih kosong</TextStyle>
                        ) : dataProducts.map((product, index) => {
                            let productImage = `http://192.168.1.8:3000/${product.image}`
                            return (
                                <ButtonStyle
                                    key={index}
                                    className='w-5/12 mb-6'
                                    onPress={() => navigation.navigate("Detail", {
                                        data: product
                                    })}
                                >
                                    <ImageStyle
                                        source={{ uri: productImage }}
                                        className="w-full h-40 rounded-xl"
                                    />
                                    <TextStyle
                                        className='text-lg font-bold'
                                    >{product.name}</TextStyle>
                                    <TextStyle
                                        className='text-sm'
                                    >{convertRupiah(product.price)}</TextStyle>

                                    <ButtonStyle
                                        className='bg-white p-2 absolute right-3 top-3 rounded-md'
                                    >
                                        <AntDesign name='hearto' size={18} />
                                    </ButtonStyle>
                                </ButtonStyle>
                            )
                        })
                    }
                </ViewStyle>

            </ScrollViewStyle>
        </ViewStyle>

    )
}

export default Discover