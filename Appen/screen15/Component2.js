import React from 'react';
import { 
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
} from 'react-native';

export default class Avpåknapp extends React.Component {

	
	UpdateDataToServer = () =>{ //Liknande insert men patch istället för Port
	     
			let self = this; //Kallar this för self för att lättare använda
		
			  fetch('', {  //Urlen där vi vill skicka ifrån (Detta är datorns ipadress, hämtas via ipconfig i cmd, ip4)
				method: 'GET'  //Säger att det är GET vi vill använda
			  }).then((response) => response.json())  //Gör om resultatet till json
			  .then((responseJson) => {
				 // console.log(responseJson, 'res');
				 // self.setState({ products: Object.assign(responseJson.result, products)  });
			   
				
				  
		   self.setState( //Sätter värden till statevariablen
				{
				 
					Name: responseJson.result[1].name , //TAr första produkten i listans namn
					onoroff: responseJson.result[1].påav,
				  
				
			
		
				
			  }).catch((error) => { //Fångar error
				console.error(error);
			  });
		  });
		
		  
		
			 // Med hjälp av map öppnar vi upp varje enskilda produkt i produkter och returnernar det vi bestämmer att returnera på nästkommande rader
				if (onoroff = 1) {
					knappvalue = 0;
					
				}
				
				
				else {
				knappvalue = 1;
				}
				
			  
	 
		
		
		const { Name }  = "lampa" ;
		const { avpå }  = knappvalue ;
		if(Name!="")
		{
		var adress='http://iot.abbindustrigymnasium.se/ljuside5'+Name;
	   
	   fetch(adress, {
		 method: 'PATCH',	
		   headers: {
		   'Accept': 'application/json',
		   'Content-Type': 'application/json',
		   },
		 body: JSON.stringify({
		 name: Name,
		 påav: avpå,	 
		 })
		
	   }).then((response) => response.json())
		   .then((responseJson) => {
		
	   // Showing response message coming from server after inserting records.
  
	   console.log(responseJson);
		 alert( "Update was successfull, "+ Name); //Skriver ut att uppdateringen lyckats samt itemet som uppdaterats, vi använder namn denna gång för responseJSon säger ingenting om vad som uppdaterats
		
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
						<Image style={styles.imegestyle} source={require('./Button.png')} />

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