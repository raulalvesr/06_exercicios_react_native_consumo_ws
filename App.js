import {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {API_KEY, API_LANG, API_UNIT} from "@env";
import {fetch} from "react-native/Libraries/Network/fetch";
import ForecastInfo from "./components/ForecastInfo";

export default function App() {
    const [cityName, setCityName] = useState("");
    const [cityWeather, setCityWeather] = useState(undefined);
    const [shouldShowForecastInfo, setShouldShowForecastInfo] = useState(false);

    const getCityLatAndLon = function () {
        const apiUri = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&lang=${API_LANG}&appid=${API_KEY}`;
        return fetch(apiUri)
            .then((response) => response.json())
            .then((json) => {
                const lat = json[0].lat;
                const lon = json[0].lon;

                return [lat, lon];
            });
    }

    const setCurrentCityWeatherInfo = async function () {
        try {
            const [lat, lon] = await getCityLatAndLon();
            const apiUri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=${API_LANG}&units=${API_UNIT}&appid=${API_KEY}`;
            return fetch(apiUri)
                .then((response) => response.json())
                .then((json) => {
                    const currentWeather = {
                        sunrise: new Date(json.current.sunrise * 1000),
                        sunset: new Date(json.current.sunset * 1000),
                        icon: json.current.weather[0].icon,
                        feelsLike: json.current.feels_like
                    }

                    setCityWeather(currentWeather);
                    setShouldShowForecastInfo(true);
                })
                .catch((error) => {
                    setShouldShowForecastInfo(false);
                    console.error(error);
                });
        } catch (error) {
            setShouldShowForecastInfo(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.inputField}
                    placeholder="Nome da cidade"
                    value={cityName}
                    onChangeText={setCityName}
                />
                <Button title="Buscar" onPress={setCurrentCityWeatherInfo}/>
            </View>
            {shouldShowForecastInfo ? <ForecastInfo cityWeather={cityWeather}/> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        padding: 12,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 4,
        textAlign: 'center'
    }
});
