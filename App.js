import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import ForecastCard from './ForecastCard';

const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleAdd = () => {
    setCities([...cities, {id: cities.length, name: cityName}]);
    toggleDialog();
  };

  const deleteCity = (id) => {
    var newArray = cities.filter((city) => city.id !== id);
    setCities(newArray);
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log('Cities saving error!');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities');
      if (value !== null) {
        setCities(JSON.parse(value));
      }
    } catch (e) {
      console.log('Cities loading error!');
    }
  };

  // load cities when app starts
  useEffect(() => {
    getData();
  }, []);

  // save cities if cities state changes
  useEffect(() => {
    storeData();
  }, [cities]);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Weather App</Title>
        </Body>
        <Right>
          <Button success rounded>
            <Text onPress={toggleDialog}>ADD</Text>
          </Button>
        </Right>
      </Header>
      <ScrollView style={styles.citiesList}>
        {cities.map((city) => (
          <ForecastCard
            cityName={city.name}
            key={city.id}
            id={city.id}
            deleteCity={deleteCity}
          />
        ))}
      </ScrollView>
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <Dialog.Input
          placeholder="Name of the city"
          onChangeText={(text) => setCityName(text)}></Dialog.Input>
        <Dialog.Button label="Add" onPress={handleAdd}></Dialog.Button>
        <Dialog.Button label="Cancel" onPress={toggleDialog}></Dialog.Button>
      </Dialog.Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  citiesList: {
    margin: 10,
  },
});

export default App;
