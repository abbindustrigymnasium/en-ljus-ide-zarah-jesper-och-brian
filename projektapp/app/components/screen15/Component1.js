//knapp för att komma till screen1
import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';


export default class Hemknapp extends React.Component {


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

<View style={styles.itemcontainer1}>
  
  <View style={styles.itemcontainerinner1}>
	
	<View style={styles.item1}>
	  
	  <Text style={styles.itemtext1}>
	  Smart       

	  </Text>

	  

	</View>
	<View style={styles.item2}>
	<Image source={require('./ljus.png')} />
	<TouchableOpacity style={styles.button}
	onPress={() => this.props.navigation.navigate('Screen1', {})}>
    </TouchableOpacity>
	</View>

	<View style={styles.item3}>
	<Text style={styles.itemtext2}>
	Light
	</Text>
	</View>
  
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