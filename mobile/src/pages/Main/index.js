import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacitym, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import styles from './styles'

import logo from '../../assets/logo.png'

export default function Main({ navigation: { navigate } }){
    const [state, setState] = useState({
        newBox: ''
    })
    useEffect(()=> {
        async function verify(){
            const box = await AsyncStorage.getItem('@NextBox:box')
            if(box){
                navigate('Box')
            }
        }
        verify()
    }, [])

    const handleSignIn = async ()=> {
        const response = await api.post('boxes', {
            title: state.newBox
        })

        await AsyncStorage.setItem('@NextBox:box', response.data._id)

        navigate('Box')

    }
        return(
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo}/>
                <TextInput
                    style={styles.input}
                    placeholder="Crie um box"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={state.newBox}
                    onChangeText={text => setState({ newBox: text })}
                />
                <TouchableOpacity onPress={() => handleSignIn()} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Criar
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
}