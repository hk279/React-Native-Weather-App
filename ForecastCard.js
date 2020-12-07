import React from 'react';
import useAxios from 'axios-hooks';
import {StyleSheet} from 'react-native';
import {Body, Card, CardItem, Text, View, Thumbnail, Button} from 'native-base';

const ForecastCard = (props) => {
  //Used in deleting cities to be sent as a param back to the delete function in App.js.
  const id = props.id;

  const city = props.cityName;

  const API_KEY = '4d6823e2179f9a69b7832d81b186488c';
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const url = baseURL + city + '&appid=' + API_KEY + '&units=metric';

  const [{data, loading, error}, refetch] = useAxios(url);

  console.log(data);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text>Error!</Text>;

  const refreshForecast = () => {
    refetch();
  };

  const deleteCity = () => {
    props.deleteCity(id);
  };

  var imageURI =
    'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';

  return (
    <Card>
      <CardItem>
        <Body>
          <View style={styles.titleRow}>
            <Text style={styles.cityName}>{data.name}</Text>
            <Thumbnail
              style={styles.weatherIcon}
              source={{uri: imageURI}}></Thumbnail>
          </View>
          <Text>{data.weather[0].main}</Text>
          <Text>Temperature: {data.main.temp} °C</Text>
          <Text>Feels Like: {data.main.feels_like} °C</Text>
          <View style={styles.buttonRow}>
            <Button
              primary
              rounded
              style={styles.refreshButton}
              onPress={refreshForecast}>
              <Text>Refresh</Text>
            </Button>
            <Button
              danger
              rounded
              style={styles.deleteButton}
              onPress={deleteCity}>
              <Text>Delete</Text>
            </Button>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    margin: 50,
  },
  titleRow: {
    flexDirection: 'row',
  },
  buttonRow: {
    flexDirection: 'row',
    margin: 8,
  },
  cityName: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 3,
  },
  weatherIcon: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  refreshButton: {
    flex: 1,
    margin: 4,
    marginRight: 50,
  },
  deleteButton: {
    flex: 1,
    margin: 4,
    marginLeft: 50,
    alignSelf: 'flex-end',
  },
});

export default ForecastCard;
