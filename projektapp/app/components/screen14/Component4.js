import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';


export default class Switchscreen extends React.Component {


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

					    <View style={styles.item}>
                          
						  <TouchableOpacity style={styles.button}
						  onPress={() => this.props.navigation.navigate('Screen2', {})}>
                            <Text style={styles.itemtext}>
							Timer
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