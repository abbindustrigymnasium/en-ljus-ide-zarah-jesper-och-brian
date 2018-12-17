import React from 'react';
import { 
	StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Slider from 'react-native-slider';


export default class Slidern extends React.Component {

    DEFAULT_VALUE = 100; // ursprungsläge för slidern

    



    UpdateDataToServer = () =>{ // uppdaterar värdet för ljusstyrka
	 
	 
        
        const { ljusstyrka }  = value ; //ljusstyrka är value som står för sliderns värde
        if(ljusstyrka!="")
        {
        var adress='iot.abbindustrigymnasium.se/ljuside5/lampa';
       
       fetch(adress, { //uppdaterar 
         method: 'PATCH',	
           headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           },
         body: JSON.stringify({
         ljusstryrka: ljusstyrka,	 
         })
        
       }).then((response) => response.json())
           .then((responseJson) => {
        
       
  
       console.log(responseJson);
         alert("Ny ljusstyrka ställs in"); 
        
           }).catch((error) => {
           console.error(error);
           });
        
          }
          else
          alert("Något okänt fel.")
         }
  
         SliderContainer = React.createClass({ // sätter ursprungsvärde för slidern
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