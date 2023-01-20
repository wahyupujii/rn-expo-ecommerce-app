import React from 'react'
import { TextStyle, ViewStyle, ImageStyle, ButtonStyle } from '../config/style'
import FeatcherIcon from "react-native-vector-icons/Feather";
import convertRupiah from '../utils/convertRupiah'

export default function CartCard({ data, handleDelete, handleCount }) {
    let productImage = `http://192.168.1.8:3000/${data.image}`
    return (
        <ViewStyle
            className='flex-row px-4 py-3 bg-gray-100 rounded-xl mb-4'
        >
            <ViewStyle
                className='justify-center items-center border-2 border-gray-200 rounded-xl'
            >
                <ImageStyle
                    source={{ uri: productImage }}
                    className="h-24 w-24"
                />
            </ViewStyle>
            <ViewStyle
                className='justify-between pl-2 w-2/5'
            >
                <ViewStyle>
                    <TextStyle className='text-sm font-semibold'>{data.name}</TextStyle>
                    <TextStyle className='text-xs text-gray-400'>Size L</TextStyle>
                </ViewStyle>
                <TextStyle className='mb-2'>{convertRupiah(data.price)}</TextStyle>
            </ViewStyle>
            <ViewStyle
                className='justify-between items-end'
            >
                <ButtonStyle
                    onPress={() => handleDelete(data.id)}
                >
                    <FeatcherIcon
                        name='trash-2'
                        color="red"
                        size={16}
                    />
                </ButtonStyle>
                <ViewStyle
                    className='flex-row mb-1'
                >
                    <ButtonStyle
                        className='px-2 py-1 border-2 border-gray-200 rounded-sm'
                        onPress={() => handleCount(data, "minus")}
                    >
                        <TextStyle
                            className='text-center'
                        >-</TextStyle>
                    </ButtonStyle>
                    <ViewStyle
                        className='px-2 py-1 justify-center'
                    >
                        <TextStyle
                            className='text-center'
                        >{data.count}</TextStyle>
                    </ViewStyle>
                    <ButtonStyle
                        className='px-2 py-1 border-2 border-gray-200 rounded-sm'
                        onPress={() => handleCount(data, "plus")}
                    >
                        <TextStyle
                            className='text-center'
                        >+</TextStyle>
                    </ButtonStyle>
                </ViewStyle>
            </ViewStyle>
        </ViewStyle>
    )
}
