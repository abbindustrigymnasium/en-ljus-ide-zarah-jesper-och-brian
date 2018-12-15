import React from 'react';
import { 
	StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';


export default class Slidern extends React.Component {

    DEFAULT_VALUE = 0.2;

    



    UpdateDataToServer = () =>{ //Liknande insert men patch istället för Port
	 
	 
        const { Name }  = "lampa" ;
        const { ljusstyrka }  = value ;
        if(Name!="")
        {
        var adress='iot.abbindustrigymnasium.se/ljuside5'+Name;
       
       fetch(adress, {
         method: 'PATCH',	
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
         body: JSON.stringify({
         name: Name,
         ljusstryrka: ljusstyrka,	 
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
          alert("Write a name and a price.")
         }
  
         SliderContainer = React.createClass({
            getInitialState() {
                return {
                value: DEFAULT_VALUE,
                };
            
        },     
       

    render() {

        if (!this.props.visible) {
            return false;
        }
        

        return (

            <View 
                style={styles.component}
            >

                <View style={styles.layouts}>
                  
                  <View style={styles.layout1}>
                    
                    <View style={styles.itemcontainer}>
                      
                      <View style={styles.itemcontainerinner}>
                        
                        <View style={styles.item1}>
                        
                          <Text style={styles.itemtext}>
                          Ljusstyrka

                          </Text>
                        </View>

                        <View style={styles.item2}>
                          <Slider 
                          minimumvalue={100}
                          maximumvalue={1000}
                          minimumTrackTintColor=''
                          maximumTrackTintColor=''
                          thumbTintColor=''
                          value={this.state.value}
                          onValueChange={(value) => this.setState({value})}
                          />
                        </View>
                        <View style={styles.item3}>
                          <TouchableOpacity style={styles.button}
                          onPress={this.UpdateDataToServer}>
                          <Text style={styles.itemtext2}>
                          Ändra ljusstyrka
                          </Text>
                          </TouchableOpacity>

                        
                        </View>
                      </View>

                    </View>
                  
              


                  </View>
                	
                </View>

            </View>
            
        );

    }
   
});

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