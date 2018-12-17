//samma som för avpåkanpp screen1
import React from 'react';
import { 
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';

export default class Avpåknapp extends React.Component {

	
	UpdateDataToServer = () =>{ //patchfunktion
	     
		let self = this; 
	
		var adress='http://iot.abbindustrigymnasium.se/ljuside5/lampa'; //variabel för addressen backenden ligger på

		  fetch('adress', {  
			method: 'GET'  //anävnder metoden get
		  }).then((response) => response.json())  //Gör om resultatet till json
		  .then((responseJson) => {
			
		   
			
			  
	   self.setState( //ändrar till de nya värdena
			{
			 
				
			onoroff: responseJson.result.påav, // ger onoroff värdet för påav från databasen
			  
			
		
	
			
		  }).catch((error) => { //Fångar fel
			console.error(error);
		  });
	  });
	
	  
	
		
			if (onoroff = 1) { // om lampan är på och värdet i databasen då är 1, vill vi att lampan ska stängas av
			var	knappvalue = 0;// knapp value blir 0
				
			}
			
			
			else {
			knappvalue = 1; //annars ska lampan tändas
			}
			
		  
 
	
	
	
	const { avpå }  = knappvalue ; //lägger in knappvalue i konstanten avpå
	if(knappvalue!="")
	{
	
   
   fetch(adress, { // adressen för backenden
	 method: 'PATCH',	//uppdaterar avpå värdet
	   headers: {
	   'Accept': 'application/json',
	   'Content-Type': 'application/json',
	   },
	 body: JSON.stringify({
	 påav: avpå,	//skickar med avpå 
	 })
	
   }).then((response) => response.json())
	   .then((responseJson) => {
	
   

   console.log(responseJson);
	 alert("Lampan slås på eller stängs av");
	
	   }).catch((error) => {
	   console.error(error);
	   });
	
	  }
	  else
	  alert("Som vanligt så fungerar det inte.");
	 }
	


    render() {

        if (!this.props.visible) {
            return false;
        }
        

        return (

            <View 
                style={styles.component}
            >

                <View style={styles.layouts}>
				  
				  <View style={styles.layout}>
                    
					<View style={styles.itemcontainer}>
					  
					  <View style={styles.itemcontainerinner}>
                        
						<TouchableOpacity style={styles.item1}
						 onPress={this.UpdateDataToServer}>
						<Image style={styles.imagestyle} source={require('./Button.png')} />

						</TouchableOpacity>

					

					  </View>

					</View>
				  </View>

                	
                </View>

            </View>
            
        );

    }

}

const styles = StyleSheet.create({
    
	component: {
	    width: '100%',
	    flexDirection: 'row',
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},
	
});