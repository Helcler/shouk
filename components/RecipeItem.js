import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
var component = 'RecipeItem';

component = props => {    
    return (
        <View style={styles.recipeItem}>
            <TouchableOpacity onPress={props.onSelectRecipe}>
                <View>
                    <View style={{ ...styles.recipeRow, ...styles.recipeHeader }}>
                        <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.recipeRow, ...styles.recipeDetail }}>
                        <Text style={styles.fontFamily}>{props.duration}m</Text>
                        <Text style={styles.fontFamily}>{props.complexity}</Text>
                        <Text style={styles.fontFamily}>{props.affordability}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    recipeRow: {
        flexDirection: 'row'
    },
    recipeItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow:'hidden', 
        marginVertical: 10
    },
    recipeHeader: {
        height: '85%'
    },
    recipeDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height:'15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    textDefaut:{
        fontFamily: 'open-sans'
    }
});
export default component;