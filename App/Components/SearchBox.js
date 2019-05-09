import React ,{Component}from 'react';
import { View, Image ,Text} from 'react-native';
import {Icon} from 'react-native-elements';
export default class SearchBox extends Component{

  constructor(props){
    super(props);
  }


  render(){
    return (    
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <View style={{flex:1}}>
            <Icon name='search' color='blue'/>
          </View>
          <View style={{flex:5}}>
            <Text style={{fontWeight:'200'}}>
              Search
            </Text>
          </View >
        </View>
        
      );
  }

}
