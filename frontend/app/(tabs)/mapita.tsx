import React from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';

const MapViewScreen = () => {
    const coordinates = [
      { latitude: 19.4374, longitude: -99.1470 },   // Hidalgo
      { latitude: 19.4361, longitude: -99.1406 },   // Bellas Artes
      { latitude: 19.43555,longitude: -99.13715 },  // Allende
      { latitude: 19.4323, longitude: -99.1324 },   // Zócalo
      { latitude: 19.4248, longitude: -99.1333 },   // Pino Suárez
    ];

    const metroStations = [
      { name: 'Hidalgo',      latitude: 19.4374,  longitude: -99.1470,  image: require('../../assets/images/hidalgo.png')     }, // Hidalgo
      { name: 'Bellas Artes', latitude: 19.4361,  longitude: -99.1406,  image: require('../../assets/images/bellasartes.png') }, // Bellas Artes
      { name: 'Allende',      latitude: 19.43555, longitude: -99.13715, image: require('../../assets/images/allende.png')     }, // Allende
      { name: 'Zocalo',       latitude: 19.4323,  longitude: -99.1324,  image: require('../../assets/images/zocalo.png')      }, // Zócalo
      { name: 'Pino Suarez',  latitude: 19.4248,  longitude: -99.1333,  image: require('../../assets/images/pinosuarez.png')  }, // Pino Suárez
    ];

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 19.4326,
            longitude: -99.1407,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          }}
        >
          
          <Polyline
            coordinates={coordinates}
            strokeColor='#0000FF' // Color
            strokeWidth={5}       // Width
          >
          </Polyline>



          {metroStations.map((station, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
            title={station.name}
          >
            <Image
              source={station.image}
              style={{ width: 35, height: 35 }}
            />
          </Marker>
          ))}

        </MapView>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapViewScreen;