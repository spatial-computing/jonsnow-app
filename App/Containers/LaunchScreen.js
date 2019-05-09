

import React, { Component } from 'react';
import { StyleSheet, View ,Text,TextInput,TouchableOpacity} from 'react-native';

import SearchBox from '../Components/SearchBox.js';
import ThreeDMap from '../Components/ThreeDMap'
import axios from 'axios';
import indoorMapGeoJSON from '../Containers/RawData/mapData.js';
import addColor from '../Containers/RawData/addColor.js';

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      aqi:[],
      change:'string',
    }

  }
  componentWillMount(){
       const date=new Date(Date.now()-(1000*60*60*3));
          
            var hour=date.getHours();
            var dd = date.getDate();
            var mm = date.getMonth()+1;
            var yyyy = date.getFullYear();

       axios.get(`http://jonsnow.usc.edu/api/aqi?date=${yyyy}-${mm}-${dd}&hour=${hour}&jon=snow`)
                      .then(response => {
                        this.setState({ aqi: response.data });
                        
                      })
                      .catch(function (error) {
                         
                      });

   }
  render() {
  
  
    let navigation=this.props.navigation.getParam('location', {lng:'-118.2851',lat:'34.0224'});
    var colorWithHeight=addColor(indoorMapGeoJSON,this.state.aqi);
    //console.warn(colorWithHeight.features[1]);
    return (
      <View style={styles.container}>
          
          <View style={styles.map}>
            <ThreeDMap 
                //navigation={this.props.navigation.getParam('location', {lng:'-118.2851',lat:'34.0224'})} 
                navigation={navigation}
                colorWithHeight={colorWithHeight}/>
          </View>

        <TouchableOpacity
            style={styles.search}    
            onPress={() => this.props.navigation.navigate('SearchScreen')}
            >
          <SearchBox />
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map:{
    flex:1,
  
  },
  search:{
    position: 'absolute',
    height:35,
    top:30,
    width:'90%',
    left:'5%',
    backgroundColor:'white',
    borderColor:'red',
    borderRadius:5,
    shadowColor:'black',
    shadowOffset:{width: 1,height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});



