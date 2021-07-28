import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import 'form-data'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'
import api from '../../services/api'
import FormData from 'form-data'
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

import styles from './styles'


export default function Box(){
    const [state, setState] = useState('')
    useEffect(()=>{
        async function getData(){
            const box = await AsyncStorage.getItem('@NextBox:box');
            const response = await api.get(`boxes/${box}`)
            
            setState(response.data)
        }
        getData()
    }, [])


    const handleUpload = ()=> {
        ImagePicker.launchImageLibrary({}, async upload => {
            console.log(upload)
            if ( upload.error ){
                console.log('Error')
            } else if( upload.didCancel ){
                console.log('Canceled by user')
            } else {
                try{
                    const user = state
                    const data = new FormData()
                    if(upload.fileName != null){
                        const [prefix, suffix] = upload.fileName.split('.')
                        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix
                        data.append('file', {
                            uri: upload.uri,
                            type: upload.type,
                            name: `${prefix}.${ext}`
                        })
                    }else{
                        data.append('file', {
                            uri: upload.uri,
                            type: upload.type,
                            name: `imageapple${Math.random()}.jpg`
                        })
                    }

                    await api.post(`boxes/${user._id}/files`, data)

    
                }catch(error) {
                    console.log(error)
                 }
            }
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.boxTitle}>
                {state.title}
            </Text>
            <FlatList
                style={styles.list}
                data={state.files}
                keyExtractor={file => file._id}
                ItemSeparatorComponent={()=> <View style={styles.separator}/>}
                renderItem={({ item })=> (
                    <TouchableOpacity 
                        onPress={()=> {}}
                        style={styles.file}
                    >
                        <View style={styles.fileInfo}>
                            <Icon name="insert-drive-file" size={24} color="#a5cfff"/>
                            <Text style={styles.fileTitle}>
                                {item.title}
                            </Text>
                        </View>
                        <Text style={styles.fileDate}>
                                há 
                            </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.fab} onPress={()=> handleUpload()}>
                <Icon name={'cloud-upload'} size={24} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
}
