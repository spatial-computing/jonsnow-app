import React from "react";
import { StyleSheet, View ,Dimensions} from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme ,VictoryLine ,VictoryArea,VictoryScatter} from "victory-native";
import axios from 'axios';


export default class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ID:0,
      time:'hour',
      history: [],
      historyhour:[],
      historyday:[],
    };
    this.getData=this.getData.bind(this);

  }

  componentWillMount() {
      this.setState({
        ID:this.props.ID,
        time:this.props.time,
      })
      this.getData(this.props.ID);
      
   
  }

  componentDidUpdate(prevProps) {
 
    if (this.props.time !== prevProps.time) {
       this.getData(this.props.ID);
    }
  }

  componentWillUnmount() {
    //window.clearInterval(this.setStateInterval);
  }


  async getData(ID) {
      Date.prototype.minusHours=function(h){
        // this.setTime(this.getTime()-(1000*60*60*24)-(h*60*60*1000));
        this.setTime(this.getTime()-(h*60*60*1000));
        return this;
      }
      if(this.props.time=='hour'&&this.state.historyhour.length!=0){
        this.setState({
          history:this.state.historyhour,
        });
        return ;
      }
      if(this.props.time=='day'&&this.state.historyday.length!=0){
        this.setState({
          history:this.state.historyday,
        });
        return ;
      }    

      let data= [];
           //console.warn(ID);
          for(let i=7;i>=1;i--) {
            let pre=new Date();
            if(this.props.time==='hour'){
               pre=new Date().minusHours(i);
            }
            else 
               pre=new Date().minusHours(i*24)
            var hour=pre.getHours();
            var dd = pre.getDate();
            var mm = pre.getMonth()+1;
            var yyyy = pre.getFullYear();
           
            await axios.get(`http://jonsnow.usc.edu/api/gid/${ID}?date=${yyyy}-${mm}-${dd}&hour=${hour}`)
                        .then(response => {
                          let yindex=Math.round(response.data.aqi);
                          
                          if(yindex<0||!yindex)
                              yindex=1;
                          if(this.props.time==='hour')
                            data.push({date: `${hour}`,aqi: yindex});
                          else {
                            data.push({date: `${mm}/${dd}`,aqi: yindex});
                          }
                          
                        })
                        .catch(function (error) {
                        
                        });
          }
          if(this.props.time=='hour'){
             this.setState({
               history:data,
               historyhour:data,
             })
          }
          else {
             this.setState({
               history:data,
               historyday:data,
             })
          }
           
        
           
        
  }

  render() {
    const  initial=[
        { date:  "0",  aqi: 1 },
        { date:  "1",  aqi: 1 },
        { date: "2",  aqi: 1 },
        { date: "3",  aqi: 1 },
        { date: "4",  aqi: 1 },
        { date: "5",  aqi: 1 },
        { date: "6",  aqi: 1 }
      ];
    const data=this.state.history.length==0? initial:this.state.history;
    // char height cannot be string it is a number
    let {height} = Dimensions.get('window');
    height=height*0.8*4/7;
    return (

      <VictoryChart
          domainPadding={{ y: 10 }}
          height={height}
        >            
            <VictoryScatter
              style={{ data: { fill: "#c43a31" } }}
              size={5}
              data={data}
              x="date"
              y="aqi"
              animate={{
                duration: 1000,
                
                onLoad: { duration: 1000 }
              }}
              symbol={"diamond"}
            />
            <VictoryLine
              animate={{
                duration: 1000,
                
                onLoad: { duration: 1000 }
              }}

              interpolation="natural"
              style={{
                data: { stroke: "#000000" ,strokeWidth: 3},
                parent: { border: "1px solid #ccc"}
              }}
              data={data}
              x="date"
              y="aqi"
            />

            <VictoryArea
              style={{ data: { fill: "#808080" ,opacity: 0.7} }}
              interpolation="natural"
              data={data}
              animate={{
                duration: 1000,

                onLoad: { duration: 1000 }
              }}
              x="date"
              y="aqi"
            />
        </VictoryChart>
    );
  }
}


