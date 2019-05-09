import React,{Component} from 'react';
import {StyleSheet,View,Dimensions, Alert, TouchableOpacity,Text} from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

import Modal from 'react-native-modalbox';
import DashBoard from './DashBoard.js';
import Legend from './Legend.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';

Mapbox.setAccessToken('pk.eyJ1Ijoibm94ZHJ5YXMiLCJhIjoiY2prc3ZlcjIxMmpsdjN4dGhhaDRxbGJqdiJ9.KjfnwjrvFs2S-Tl_2X53tQ');

const layerStyles = Mapbox.StyleSheet.create({
      light: {},
     
      building: {
        fillExtrusionOpacity: 1,
        fillExtrusionHeight: Mapbox.StyleSheet.identity('height'),
        fillExtrusionBase: 0,
        fillExtrusionColor: Mapbox.StyleSheet.identity('color'),
        fillExtrusionColorTransition: { duration: 2000, delay: 0 },
      },

      bottom:{
        fillColor:Mapbox.StyleSheet.identity('color'),
        fillOpacity:0.5,
      }

    });


export default class TreeDMap extends Component {
	constructor (props){
		super(props);
    this.state={
      choosedID:-1,
      choosedName:'',
      searchedID:-1,
      isOpen:false,
      flyTo:[34.0224,-118.2851],
      lastPosition:{lng:'-118.2851',lat:'34.0224'},
      sliderNumber:0,
      upperBound:-1,
      lowerBound:-1
      
    }
    this.onPress = this.onPress.bind(this);
    this.renderingMapFully=this.renderingMapFully.bind(this);
    
	}

  async componentDidUpdate(prevProps) {
       if(!(prevProps.navigation.lng===this.state.lastPosition.lng&&prevProps.navigation.lat===this.state.lastPosition.lat)){
          this.setState({
            lastPosition:prevProps.navigation,
          });

       }
       
      
  }

  async renderingMapFully(){
          var {height, width} = Dimensions.get('window');
          const featureCollection = await this.map.queryRenderedFeaturesAtPoint(
            [width/2, height/2],
            null,
            ['bottom']
            
          );

          if (featureCollection.features.length) {
            this.setState({
              searchedID:featureCollection.features[0].properties.ID,

            })  
          }  else {
             console.warn('nothing');
          }

         

  }

  async onPress(e) {


    const { screenPointX, screenPointY } = e.properties;
    const featureCollection = await this.map.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY],
      null,
      ['bottom']
      
    );
    if (featureCollection.features.length) {
      this.setState({
        choosedID:featureCollection.features[0].properties.ID,
        searchedID:featureCollection.features[0].properties.ID,
        isOpen:true,
        choosedName:featureCollection.features[0].properties.HOOD
      }); 

    } else {
      console.warn('nothing');
    }
   

  }

  getInfo(){

      Alert.alert(
        'Spatial Science Institute',
        '',
        [ 
          {text: 'https://spatial.usc.edu/'},
          {text: 'https://spatial-computing.github.io'},
          {text: 'Cancel', style: 'cancel'}
          
        ],
        { cancelable: false }
      )

  }

  setFilter(value){
    this.setState({
      upperBound:value+2,
      lowerBound:value-2,
    })

  }


  componentDidMount(){
    
  }
	render(){
     
      const {navigation}= this.props;
      const newposition= navigation;      
      

	     const flyTo=new Array(2);
	     flyTo[1]=parseFloat(newposition.lat).toFixed(4);
	     flyTo[0]=parseFloat(newposition.lng).toFixed(4);
      
       let data=this.props.colorWithHeight;
     
	    return (

        <View style={styles.container}>
  	    	<Mapbox.MapView
                ref={(ref) => (this.map = ref)}
                styleURL={Mapbox.StyleURL.Light}
                zoomLevel={10}
                centerCoordinate={[-118.2851, 34.0224]}
                pitch={45}
                style={styles.container}
                ref={(ref) => (this.map = ref)}
                showUserLocation={true}
                onWillStartLoadingMap={()=>this.map.flyTo([parseFloat(flyTo[0]), parseFloat(flyTo[1])], 5000)}
                onPress={this.onPress}
                id='bottom'
                onDidFinishRenderingMapFully={this.renderingMapFully}

                logoEnabled={false}
                >

                <Mapbox.ShapeSource
                  id="bottomSource"
                  
                  shape={data}
                  >
                  <Mapbox.FillLayer
                    id="bottom"
                    style={layerStyles.bottom}
                  />
  
                </Mapbox.ShapeSource>

                <Mapbox.ShapeSource
                  id="BuildingSource"
                  shape={data}
                  >

                  <Mapbox.FillExtrusionLayer
                    id="building3d"
                    style={layerStyles.building}
                    filter={['==', 'ID', this.state.searchedID]}
                  />
                  <Mapbox.FillExtrusionLayer
                    id="building3d"
                    style={layerStyles.building}
                    filter={['all',['<=','aqi',this.state.upperBound],['>=','aqi',this.state.lowerBound]]}
                  />


  
                </Mapbox.ShapeSource>


          </Mapbox.MapView>

          <View style={styles.legend}>
            <Legend >
            </Legend>
          </View>

          <Modal 
              isOpen={this.state.isOpen} 
              onClosed={() => this.setState({isOpen: false})} 
              style={[styles.modal, styles.modal4]} 
              position={"bottom"} 
             // backdropContent={BContent}
              >
             <View style={styles.dashboard}>
               <DashBoard ID={this.state.choosedID} name={this.state.choosedName}/>
             </View>
          </Modal>

          <TouchableOpacity style={styles.info} onPress={()=> this.getInfo()}>
            <Icon name="ios-information-circle-outline" size={28} color="#4F8EF7" />
          </TouchableOpacity>


          <View style={styles.sliderView}>
                <Slider style={styles.slider}
                        minimumValue={0}
                        maximumValue={500}
                        step={2}
                        trackStyle={styles.track}
                        thumbStyle={styles.thumb}
                        thumbTouchSize={{width:30,height:30}}
                        onValueChange={(value)=>this.setState({sliderNumber:value})}
                        onSlidingComplete={(value)=>this.setFilter(value)}/>
          </View>

          <View style={styles.sliderNumber}>
            <Text>
              {this.state.sliderNumber}
            </Text>

          </View>

        </View>

	    )
	}
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },


  modal4: {
    height:'80%'
  },

  dashboard:{
    flex:1,
    width:'100%',
    marginTop:10,
  },
  legend:{
    position:"absolute",
    bottom:50,
    width:'80%',
    height:20,
    left:'10%',

  },
  info:{
    position:'absolute',
    bottom:5,
    left:10,
    width:30,
    height:30
  },
  sliderView:{
    position:'absolute',
    bottom:60,
    right:'10%',

    width:'80%',
    height:20
  },
  track:{
    height: 0,
    width:'80%'
  },
  thumb:{
    height:30,
    borderRadius: 4,
    width:30,
    backgroundColor:'grey'
  },
  sliderNumber:{
    position:'absolute',
    bottom:75,
    left:'48%'
  }

});

//filter={['any',['==','aqi',this.state.upperBound+4],['==','aqi',this.state.upperBound+3],['==','aqi',this.state.upperBound+2],['==','aqi',this.state.upperBound+1],['==','aqi',this.state.upperBound],['==','aqi',this.state.upperBound-1],['==','aqi',this.state.upperBound-2],['==','aqi',this.state.upperBound-3],['==','aqi',this.state.upperBound-4],['==', 'ID', this.state.searchedID]]}

//filter={['all',['<=','aqi',upperBound],['>=','aqi,lowerBound']]}

//['==', 'ID', this.state.searchedID]
//height: 550
