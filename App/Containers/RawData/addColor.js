

export default function addColor(geo={},color=[]){
	var min=600;
	var max=0;
	for(var i=1;i<color.length;i++){
		min=Math.min(min,color[i].aqi);
		max=Math.max(max,color[i].aqi);
	}

	const otherfeatures=geo.features.map(one=>Object.assign(one,{properties:insertcolor(one,color,min,max)}));
	Object.assign(geo,{features:otherfeatures});
	return geo;
}
function insertcolor(one,color=[],min,max){
	
	const height=one.properties.ID;
	
	const newproperties=Object.assign(one.properties,getColor(height,color,min,max));
	return newproperties;
}


var colors=[
["#6ed229"],["#65c226"],["#5cb123"],["#54a11f"],["#4b901c"],["#438019"],["#3a7016"],["#325f13"],["#294f0f"],
["#FFF300"],["#FFE800"],["#FFDD00"],["#FFD200"],["#FFC600"],["#FFBB00"],["#FFB000"],["#FFA500"],
["#FF9000"],["#FF7B00"],["#FF6700"],["#FF5200"],["#FF3D00"],["#FF2900"],["#FF1400"],["#FF0000"],

["#EF0010"],["#EF0010"],["#DF0020"],["#DF0020"],["#CF0030"],["#CF0030"],["#BF0040"],["#BF0040"],["#AF0050"],["#AF0050"],["#9F0060"],["#9F0060"],["#8F0070"],["#8F0070"],["#800080"],["#800080"]
]
function getColor(height=100,color=[],min,max){
	

	const now=color[height];
	const step=40/300;

	if(typeof now == 'object'){
		var index=Math.floor(now.aqi*step);
		return {color:colors[index][0],height:1000,aqi:now.aqi};
	}
}	



