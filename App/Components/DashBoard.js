import React from 'react';
import {View ,StyleSheet,TouchableOpacity,Text} from 'react-native'
import Chart from './Chart.js'
import axios from 'axios';



export default class DashBoard extends React.Component{

	constructor (props){
		super(props);
		this.state={
			id:this.props.ID,
			modal:['PM2.5','CO'],
			previous:'hour',
			modalChoosed:'PM2.5',
			airQualityIndex:'loading',
			timeStamp:'',
		}
		this.getAirQuality();
	}
	
	// componentDidUpdate(prevProps) {
 
	//     if (this.props.ID !== prevProps.ID) {
	//        this.setState({
	//        	id:this.props.ID,
	//        })
	//     }
	    
 //  	}


 	async getAirQuality(){
 	
        Date.prototype.minusHours=function(h){
           this.setTime(this.getTime()-(h*60*60*1000));
           return this;
        }
        let now=new Date().minusHours(1);
        var hour=now.getHours();
        var dd = now.getDate();
        var mm = now.getMonth()+1;
        var yyyy = now.getFullYear();
        // console.warn(`http://jonsnow.usc.edu/api/gid/${this.props.ID}?date=${yyyy}-${mm}-${dd}&hour=${hour}`)
 		await axios.get(`http://jonsnow.usc.edu/api/gid/${this.props.ID}?date=${yyyy}-${mm}-${dd}&hour=${hour}`)
            .then(response => {
            	now.setTime(response.data.predictAt);
            	hour=now.getHours();
		        dd = now.getDate();
		        mm = now.getMonth()+1;
                this.setState({
                	airQualityIndex:response.data.aqi.toFixed(4),
                	timeStamp:hour+':00  '+mm+"-"+dd,
                })
                          
            })
            .catch(function (error) {
                console.warn(error)
            });
 	}


	render(){

		let hourStyle;
		let dayStyle;
		let textHour;
		let textDay;
		if(this.state.previous==='hour'){
			hourStyle=styles.choosedTime;
			textHour=styles.timetextchoosed;
			dayStyle=styles.chooseTime;
			textDay=styles.timetext;
		}
		else {
			hourStyle=styles.chooseTime;
			textHour=styles.timetext;
			dayStyle=styles.choosedTime;
			textDay=styles.timetextchoosed;			
		}
		return (
			<View style={styles.container}>

				<View style={styles.info}>
					<View style={styles.title}>
						<Text style={{fontSize:25,fontWeight: 'bold'}}>
							{this.props.name}
						</Text>
					</View>
					<View style={styles.modal}>
						{this.state.modal.map((modal,id)=><Circle key={id} name={modal} modalChoosed={this.state.modalChoosed} Press={(name)=>this.setState({modalChoosed:name})}/>)}
					</View> 
					<View style={styles.airQuality}>
						<View style={styles.airQualityModal}>
							<Text style={styles.airQualityText}>
								{this.state.modalChoosed}
							</Text>
						</View>
						<View style={styles.airQualityNumber}>
							<Text style={styles.airQualityText}>
								  {this.state.airQualityIndex} um/m3 {'\n'}
								  {this.state.timeStamp}
							</Text>
						</View>
					</View>
				</View>


				<View style={styles.time}>
					<TouchableOpacity style={dayStyle} onPress={()=>this.setState({previous:'day'})}>
						<Text style={textDay}>
							Last Week
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={hourStyle} onPress={()=>this.setState({previous:'hour'})}>
						<Text style={textHour}>
							Last 7 hours
						</Text>
					</TouchableOpacity>
				</View>

				<Chart style={styles.chart} ID={this.state.id} time={this.state.previous}/>

			</View>

		)
	};
}

const Circle=({name,modalChoosed,Press})=>{
	let circleStyle=modalChoosed===name? styles.choosedCircle:styles.circle;
	let circleText=modalChoosed===name? styles.choosedCircleText:styles.cirlceText;
	return(
		<TouchableOpacity style={circleStyle} onPress={()=>Press(name)}>
			<Text style={circleText}>
				
			</Text>
		</TouchableOpacity>

	)
}

const styles=StyleSheet.create({

	container:{
		flex:1,
	},
	info:{
		flex:3,
	},

	chart:{
		flex:3,
	},
	title:{
		flex:1,
		alignItems:'center',
		justifyContent: 'center',
	},
	modal:{
		flex:0,
		flexDirection:'row',
		justifyContent: 'space-around',
		alignItems:'center',
		borderBottomColor:'black',
		borderBottomWidth:1,

	},
	airQuality:{
		flex:2,
		flexDirection:'row',
		borderBottomWidth:2,

	},
	airQualityModal:{
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
		marginVertical:15,
		borderRightWidth:2,
	},
	airQualityNumber:{
		flex:4,
		justifyContent: 'center',
		marginLeft:20,
		
	},
	airQualityText:{
		fontSize:20,
		
	},

	time:{
		flex:1,
		flexDirection:'row',
		borderBottomWidth:1,

	},

 
	circle:{


	},
	choosedCircle:{
		
	},

	cirlceText:{

		
	},
	choosedCircleText:{

	},

	chooseTime:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		
	},
	choosedTime:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:2,
		borderBottomColor:'green'
		
	},
	timetextchoosed:{
		fontSize:20,
		fontWeight: 'bold',
		justifyContent:'center',
		alignItems:'center',
	},
	timetext:{
		fontSize:20,
		color:'grey'
	}



});


 
	// circle:{
	// 	width: 80,
	//     height: 40,
	//     borderRadius: 40/2,
	//     backgroundColor: 'white', 	
	//     justifyContent:'center',
	//     borderColor:'black',
	//     borderWidth:2,

	// },
	// choosedCircle:{
	// 	width: 90,
	//     height: 50,
	//     borderRadius: 50/2,
	//     backgroundColor: 'grey',
	//     justifyContent:'center',
	//     borderColor:'yellow',
	//     borderWidth:3,
	// },

	// cirlceText:{
	// 	textAlign:'center',
	// 	color:'black',
		
	// },
	// choosedCircleText:{
	// 	textAlign:'center',
	// 	color:'white',
	// 	fontWeight:'bold',
	// },

