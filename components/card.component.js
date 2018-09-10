import React from 'react';
import { Image, View, Button,Text, AsyncStorage } from 'react-native';
import {Card} from 'react-native-elements';

class CardComponent extends React.Component {

    total_likes = 0;
    total_dislikes  =0;
    
    constructor(props){
        super(props)
        this.getlikesAndDislikes.bind(this);
        this.state = {like:0, dislike:0, 
            data:{
                "file":"",
                 "id":"",
                "like":"",
                "dislike":""},
            }
    }
    render(){
       var cat = this.props.cat;
    return (
        
        <Card title="Cat" key={this.props.index}>
        <Image style={{ width:'100%'}}
          source={this.props.imageuri}
        />
        <View style={{flex: 1, 
            flexDirection: 'row', 
            justifyContent:'space-between',
            paddingTop:5}}>
            <View style={{flexDirection:'row'}}>
                <Button onPress={()=>this.onPressLike(cat)} title="Like" color="#008000"/>
                <Text style={{padding:4, fontSize:14, textAlign:'justify'}}>{this.total_likes}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{padding:4,fontSize:14, textAlign:'justify'}}>{this.total_dislikes}</Text>
                <Button onPress={()=>this.onPressDislike(cat)} title="Dislike" color="#FF0000"/>
           </View>
        </View>
        </Card>
    );
}
    onPressLike(cat){
        AsyncStorage.getItem(cat.id, (error, data)=>{
            if(data==null){
                
                this.setState(k=>{
                       k.like = 1;
                       
                       k.data = cat;
                       k.data.like = 1;
                       this.setItem(cat.id, k.data)
                       this.total_dislikes = k.data.dislike;
                       this.total_likes = k.data.like;
                }) 
                
            }else{
                this.setState(k=>{
                    k.like = 1;
                    
                    k.data = data;
                    k.data.like = parseInt(data.like) + 1;
                    
                    this.setItem(cat.id, k.data)
                    this.total_dislikes = k.data.dislike;
                    this.total_likes = k.data.like;

             }) 
               
            }
        })
    }
    onPressDislike(cat){
        AsyncStorage.getItem(cat.id, (error, data)=>{
     
        if(data==null){
            data = cat;
            data.dislike = 1;
            this.setItem(cat.id, data)
            this.total_dislikes = data.dislike;
            this.total_likes = data.like;
        }else{
            data.dislike = parseInt(data.dislike) + 1;
            this.setItem(cat.id, data)
            this.total_dislikes = data.dislike;
            this.total_likes = data.like;
        }
    });
    }

    setItem(key, value){
       AsyncStorage.setItem(key, value).then(data=>{

       }).catch(error=>{

       })
    }

    getlikesAndDislikes = async(id)=>{
        var cat = await AsyncStorage.getItem(id);
        if(cat!=null){
            this.total_likes = cat.like;
            this.total_dislikes = cat.dislike;
        }
        
    }
}
export default CardComponent; 