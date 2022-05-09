import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'

const ForecastInfo = (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: `https://openweathermap.org/img/wn/${props?.cityWeather.icon}.png`
                }}
                style={styles.image}
            />
            <View>
                <Text style={styles.feelsLike}>Sensação térmica: {props?.cityWeather.feelsLike}ºC</Text>
                <Text style={styles.sunrise}>
                    Horário nascer do sol: {props?.cityWeather.sunrise.toLocaleTimeString("pt-br")}
                </Text>
                <Text style={styles.sunset}>
                    Horário pôr do sol: {props?.cityWeather.sunset.toLocaleTimeString("pt-br")}
                </Text>
            </View>
        </View>
    )
}

export default ForecastInfo;

const styles = StyleSheet.create({
    container: {
        margin: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '7px',
        padding: '10px'
    },
    image: {
        width: 50,
        height: 50,
        flex: 1
    }
})