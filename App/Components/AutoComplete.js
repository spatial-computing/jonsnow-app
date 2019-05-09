
import React ,{Component}from 'react';
import { View, Image ,TexInput} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 
export default class GooglePlacesInput  extends Component{
  render(){
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
         // console.warn(details.geometry);
          this.props.navigation.navigate('LaunchScreen',{
            location:details.geometry.location,
          });
        }}
        
        getDefaultValue={() => ''}
        
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          //key: 'AIzaSyBLhLfNle_sMTJau_9QvCOvE_yT8hBDF1s',
          
         //key: 'AIzaSyDPw-WHpkoF-SfLIMbPHEgVrJazn1yp6Ag',

          key:'AIzaSyAEbWesjZkdgV33SObymJf2dAO3XW0kOcw',
          language: 'en', // language of the results
          types: 'establishment', // default: 'geocode'
           location:'34.0224,-118.2851',
           radius:50000,
           strictbounds:'true',
          input:'Los Angeles'
        }}
        
        styles={{
          textInputContainer: {
            width: '100%',
            top:30,

          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
          listView:{
            //backgroundColor:'red',
            top:30,
          },
          container:{
            backgroundColor:'white',
          
          },

          poweredContainer:{
            height:0
          },
          powered:{
            height:0
          }

        }}
        
        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"

         nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        // GoogleReverseGeocodingQuery={{
        //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        // }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}
        
        // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}
   
        // debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
        // renderRightButton={() => <Text>Custom text after the input</Text>}


      />
    );
  }
}
