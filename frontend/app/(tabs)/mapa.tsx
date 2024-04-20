import React, { useCallback, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import ProgressBar from '../ProgressBar'; 
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stationSelected, setStationSelected] = useState<string>("");

  const snapPoints = isOpen ? ["50%"] : [0.1];

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const coordinates = [
    { latitude: 19.0329, longitude: -98.2687 }, // Terminal Tlaxcalancingo
    { latitude: 19.0335, longitude: -98.2626 }, // 01 Emiliano Zapata
    { latitude: 19.0350, longitude: -98.2583 }, // 02 Casa de Angeles
    { latitude: 19.0363, longitude: -98.2513 }, // 03 Carmen Serdán
    { latitude: 19.0373, longitude: -98.2476 }, // 04 Niño Poblano
    { latitude: 19.0393, longitude: -98.2416 }, // 05 Estrellas del Sur
  ];

  const metroStations = [
    {
      name: "Tlaxcalancingo",
      latitude: 19.0329,
      longitude: -98.2687,
    }, // Terminal Tlaxcalancingo
    {
      name: "Emiliano Zapata",
      latitude: 19.0335,
      longitude: -98.2626,
    }, // 01 Emiliano Zapata
    {
      name: "Casa de Angeles",
      latitude: 19.0350,
      longitude: -98.2583,
    }, // 02 Casa de Angeles
    {
      name: "Carmen Serdán",
      latitude: 19.0363,
      longitude: -98.2513,
    }, // 03 Carmen Serdán
    {
      name: "Pino Suarez",
      latitude: 19.0373,
      longitude: -98.2476,
    }, // 04 Niño Poblano
    {
      name: "Pino Suarez",
      latitude: 19.0393,
      longitude: -98.2416,
    }, // 05 Estrellas del Sur
  ];

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 19.0356,
            longitude: -98.2553,
            latitudeDelta: 0.055,
            longitudeDelta: 0.025,
          }}>
          <Polyline
            coordinates={coordinates}
            strokeColor="orange" // Color
            strokeWidth={5} // Width
          ></Polyline>

          {metroStations.map((station, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              onPress={() => {
                handleSnapPress(0);
                setStationSelected(station.name);
              }}
              >
              <View style={{ width: 37, height: 37, backgroundColor: "white", borderRadius: 100, alignItems: "center", justifyContent: "center"}}>
                <FontAwesome5 
                  name="bus" 
                  size={30} 
                  color="orange" 
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => {
            setIsOpen(false);
          }}
          backgroundComponent={({ style }) => (
            <View
              style={[style, styles.modalBackground, styles.roundedContainer]}
            />
          )}
          handleComponent={() => (
            <View
              style={{
                backgroundColor: "white",
                width: "10%",
                height: 6,
                borderRadius: 6,
                alignSelf: "center",
                marginTop: 15,
              }}
            />
          )}>
          <BottomSheetView style={styles.bottomSheet}>
            <Text style={[styles.bottomSheetText, styles.bigText]}>
              {stationSelected}
            </Text>
            <View style={styles.line}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
            <Text style={[styles.bottomSheetText, styles.smallText]}>
                Direccion Chachapa{"\n"}
                Tiempo para siguiente metro:{" "}
                <Text style={[styles.bottomSheetText]}>7 min</Text>
            </Text>
            </View>
            </View>
            <ProgressBar stepCount={4} currStep={2} colorScheme="light" />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={[styles.bottomSheetText,  styles.smallText]}>Capacidad: </Text>
              <Text style={[styles.bottomSheetText, { marginTop: 15 }]}>50%</Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    top: 20,
    left: 20,
  },
  buttonText: {
    color: "white",
  },
  bottomSheet: {
    padding: 12,
  },
  bottomSheetText: {
    fontSize: 20,
    color: "white",
    fontFamily: "inter-b",
  },
  bigText: {
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
    fontFamily: "inter-sb",
    alignSelf: "center",
  },
  
  smallText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "normal",
    fontFamily: "inter-r",
    //alignSelf: "center",
    marginTop: 20,

  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, .75)",
  },
  roundedContainer: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  line: {
    height: 5,
    backgroundColor: "#0570b6",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
});
