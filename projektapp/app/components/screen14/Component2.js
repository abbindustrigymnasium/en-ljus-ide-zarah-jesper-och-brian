//Knapp för att slå av  och på lampan
import React from 'react';
import { 
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';


export default class Avpåknapp extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			avpå:0,
			ljusstyrka:0,
		}
	}

	
	
	UpdateDataToServer = () =>{ //patchfunktion
	     
			let self = this; 
		
            var adress='http://iot.abbindustrigymnasium.se:3000/grupp5/lampa'; //variabel för addressen backenden ligger på

			  fetch('adress', {  
				method: 'GET'  //anävnder metoden get
			  }).then((response) => response.json())  //Gör om resultatet till json
			  .then((responseJson) => {
				
			   
				
				  
		   self.setState( //ändrar till de nya värdena
				{
				 
					
				avpå = responseJson.påav,
				ljusstyrka = responseJson.ljusstryrka,
			    
		
				
			  }).catch((error) => { //Fångar fel
				console.error(error);
			  });
		  });

		  
		
		  
		
			
				if (avpå = 1) { // om lampan är på och värdet i databasen då är 1, vill vi att lampan ska stängas av
				var	knappvalue = 0;// knapp value blir 0
					
				}
				
				
				else {
				knappvalue = 1; //annars ska lampan tändas
				}
				
			  
	 
		
		
		
		
		
		
		
	   
	   fetch(adress, { // adressen för backenden
		 method: 'PATCH',	//uppdaterar avpå värdet
		   headers: {
		   'Accept': 'application/json',
		   'Content-Type': 'application/json',
		   },
		 body: JSON.stringify({
		 name: "lampa",
		 påav: knappvalue,	//skickar med avpå 
		 kall: 0,
		 varm: 0,
		 ljusstryrka: ljusstyrka,
		 })
		
	   }).then((response) => response.json())
		   .then((responseJson) => {
		
	   
  
	   console.log(responseJson);
		 alert("Lampan slås på eller stängs av");
		
		   }).catch((error) => {
		   console.error(error);
		   });
		
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
                    
					
                        
						<TouchableOpacity style={styles.item1}
						 onPress={this.UpdateDataToServer}>
						<Image style={styles.imagestyle} source={require('./Button.png')} />

						</TouchableOpacity>

					

					 
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
		paddingTop: 20,
	    paddingBottom: 7.5,
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},

	layout: {
		width: '100%',
		position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	},

    imagestyle: {
		height: 100,
		width: 100

	},
	
});