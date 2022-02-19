import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavourite } from '../redux/actions/updateAction'
export default function DetailScreens ({route, navigation }) {
  const { id } = route.params.item;
  const { imageAvailable } = route.params.item;
  const { contactType } = route.params.item;
  const { firstName } = route.params.item;
  const { name } = route.params.item;
  const { emails } = route.params.item;
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactinfo)
  const [favourite, setFavourite] = useState({});
    useEffect(async () => {
      const favouritelocal = await JSON.parse(await AsyncStorage.getItem('favourite')||'{}');
      }, []);
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      {imageAvailable ? <FontAwesome name="user" size={30} color="black" /> : 
      <Image
          style={{
            height:30,
            width:30
          }} 
          source={require('../../assets/image-user.png')} />
      }
      {/* <Text>First Name: {JSON.stringify(firstName)} </Text> */}
      <Text>ContactType: {contactType} </Text>
      <View style={{
        flexDirection:'row',
        alignItems: 'center'
      }} >
        <Text>Name: {name} </Text>
        <TouchableOpacity
        style={{
          alignItems:'center',
          justifyContent:'center',
          width: 50
        }}
        onPress={async()=> {
          contacts.favourite[id] =  !contacts.favourite[id];
          dispatch(updateFavourite(contacts.favourite))
          await AsyncStorage.setItem('favourite',JSON.stringify(contacts.favourite));
        }}
      >
        <Image
          style={{
            height:30,
            width:30
          }} 
          source={ contacts.favourite[id] ? require('../../assets/icons/star-favorited.png') : require('../../assets/icons/star-empty.png')} />
      </TouchableOpacity>
      </View>
      <Text>Email: {emails ? emails[0].email:""} </Text>
    </View>
  )
}
