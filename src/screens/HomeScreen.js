import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList,Button, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavourite } from '../redux/actions/updateAction'

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactinfo)
  const renderItem = ({ item }) => (
    <View style={{
      flexDirection:'row',
      flex:1
    }}>
      <TouchableOpacity 
        style={{
          flex:1
        }}
        onPress={() => navigation.navigate('DetailScreen',{item})}
      >
        <View style={{
          borderWidth:1, 
          height: 50, 
          marginTop: 10,
          marginLeft: 10,
          marginBottom:10,
          borderRadius:15,
          padding: 10,
          flexDirection:'row',
          alignItems:'center',
          }}>
          <View style={{
            justifyContent:'center'
          }}>
          <FontAwesome name="user" size={24} color="black" />
          </View>
          <Text style={{
            marginLeft:10
          }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems:'center',
          justifyContent:'center',
          width: 50
        }}
        onPress={async()=> {
          favourite[item.id] =  !favourite[item.id];
          setFavourite(JSON.parse(JSON.stringify(favourite)));
          // sort
          const contact = dataPhone.sort((a, b) => a.name.localeCompare(b.name));
          setDataPhone(contact.sort((a, b) => (favourite[a.id]?-1:1)));
          dispatch(updateFavourite(JSON.parse(JSON.stringify(favourite))));
          await AsyncStorage.setItem('favouriteLocal',JSON.stringify(favourite));
        }}
      >
        <Image
          style={{
            height:30,
            width:30
          }} 
          source={contacts.favourite[item.id] ?require('../../assets/icons/star-favorited.png') : require('../../assets/icons/star-empty.png')} />
      </TouchableOpacity>
    </View>
   
  );
  const [dataPhone, setDataPhone] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [favourite, setFavourite] = useState({});
  useEffect(() => {
    (async () => {
     
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data.sort((a, b) => a.name.localeCompare(b.name));
          const favouritelocal = await JSON.parse(await AsyncStorage.getItem('favouriteLocal')||'{}');
          await setFavourite(favouritelocal);
          setDataPhone(contact.sort((a, b) => (favouritelocal[a.id]?-1:1)));
          dispatch(updateFavourite(favouritelocal));
        }
      }
    })();
  }, []);

  return (
    <View style={{flex:1, top: 0, justifyContent:'center'}}>
        <SearchBar
          round={true}
          lightTheme={true}
          placeholder="Search..."
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(Text)=>{
            setSearchText(Text);
            let Data = dataPhone.filter(function (item) {
              return item.name.toLowerCase().includes(searchText);
            });
            console.log(Data);
            setFilteredData({Data});
          }}
          value={searchText}
        />
       <FlatList
        data={filteredData&&filteredData.Data&&filteredData.Data.length>0?filteredData.Data:dataPhone}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
