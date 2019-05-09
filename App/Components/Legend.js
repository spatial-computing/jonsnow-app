import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {StyleSheet,Text} from 'react-native'
export default class Legend extends React.Component{
  render(){
    return (

      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#008000', '#FFFF00', '#FFA500', '#FF0000','#800080']} style={styles.linearGradient}>
          <Text style={styles.text}>
             0
          </Text>

          <Text style={styles.text}>
             500
          </Text>
      </LinearGradient>
    )
  };
    
 


}


const styles = StyleSheet.create({
  linearGradient: {
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'white'
  },
  text:{
    color:'white',
  }

});

