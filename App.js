import React from 'react';
import { StyleSheet, Text, View , ScrollView} from 'react-native';
import {Card, Header} from 'react-native-elements';
import CardComponent from './components/card.component.js';
import cats from './cats/catmodel';

export default class App extends React.Component {
  apikey = "58222523-be3c-4dea-95cd-d0c57f75f592";
  userid = "789zlf";
  
  render() {
   
    return (
      <View style={{paddingBottom:'10%'}}>
      <Header
        centerComponent={{ text: 'Tinder for cat', style: { color: '#fff' } }}
      />
      <ScrollView>
       {cats.map((cat, index)=>{
       return <CardComponent cat={cat} imageuri={cat.file} key={index}/>
      })}
      </ScrollView>
     
    </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});