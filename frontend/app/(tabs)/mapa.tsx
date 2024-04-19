import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

export default function App() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

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
    <SafeAreaView style={styles.safeArea}>
      <BottomSheetModalProvider>
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
          <TouchableOpacity style={styles.button} onPress={openBottomSheet}>
            <Text style={styles.buttonText}>Botón</Text>
          </TouchableOpacity>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={['15%', '50%', '75%']}
            backgroundComponent={({ style }) => (
              <View style={[style, styles.modalBackground, styles.roundedContainer]} />
            )}
          >
            <View>
              <BottomSheetView style={styles.bottomSheet}>
                <Text style={[styles.bottomSheetText, styles.bigText]}>INDIOS VERDES</Text>
                <View style={styles.line}></View>
              </BottomSheetView>
            </View>
          </BottomSheetModal>

        </View>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    top: 20,
    left: 20,
  },
  buttonText: {
    color: 'white',
  },
  bottomSheet: {
    backgroundColor: 'black',
    padding: 16,
  },
  bottomSheetText: {
    fontSize: 20,
    color: 'white', 
  },
  bigText: {
    fontSize: 30,
    textAlign: 'left', 
    fontWeight : 'bold',
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 100)', 
  },
  roundedContainer: {
    flex: 1,
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
  },
  line: {
    height: 5,
    backgroundColor: '#0570b6', 
    marginTop: 10, 
    marginBottom: 10, 
  },
});