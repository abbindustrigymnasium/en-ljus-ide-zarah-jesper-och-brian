//Hemknapp med bild och text
import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	Image,
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
	  Smart           Light      

	  </Text>
    </View>



	  

	
	
	

	<View style={styles.item2}>
	<Image source={require('./ljus.png')} />
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
		backgroundColor: '#FF9900',
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},

	layout1: {
		width: '100%',
		height: 100,

	},

	itemcontainer1: {
	    width: '100%',
	    height: '100%',
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	    paddingLeft: 7.5,
		paddingRight: 7.5,
		backgroundColor: '#F1F0EE',
	},

	itemcontainerinner1: {
		width: '100%',
		height: '5%',
	},

	item1: {
		paddingLeft: 5,
		paddingTop: 15,
		
		

	},

	itemtext1: {
		color: '#000000',
	    fontSize: 40,
	    
	    

	},

	

	

	item2: {
		height: '100%',
		width: '100%',
		position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	    
		
	},
	
	item3: {
		paddingRight: 2.5,
		paddingTop: 10,
	},

	itemtext2: {
		color: '#000000',
	    fontSize: 40,
	    
	    width: '50%',

	}

}); 
