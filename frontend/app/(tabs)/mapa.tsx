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
import ProgressBar from "../ProgressBar";

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stationSelected, setStationSelected] = useState<string>("");
  const [stationSelectedImage, setStationSelectedImage] = useState<any>(null);
  const snapPoints = isOpen ? ["50%"] : [0.1];

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const coordinates = [
    { latitude: 19.4374, longitude: -99.147 }, // Hidalgo
    { latitude: 19.4361, longitude: -99.1406 }, // Bellas Artes
    { latitude: 19.43555, longitude: -99.13715 }, // Allende
    { latitude: 19.4323, longitude: -99.1324 }, // Zócalo
    { latitude: 19.4248, longitude: -99.1333 }, // Pino Suárez
  ];

  const metroStations = [
    {
      name: "Hidalgo",
      latitude: 19.4374,
      longitude: -99.147,
      image: require("../../assets/images/hidalgo.png"),
    }, // Hidalgo
    {
      name: "Bellas Artes",
      latitude: 19.4361,
      longitude: -99.1406,
      image: require("../../assets/images/bellasartes.png"),
    }, // Bellas Artes
    {
      name: "Allende",
      latitude: 19.43555,
      longitude: -99.13715,
      image: require("../../assets/images/allende.png"),
    }, // Allende
    {
      name: "Zocalo",
      latitude: 19.4323,
      longitude: -99.1324,
      image: require("../../assets/images/zocalo.png"),
    }, // Zócalo
    {
      name: "Pino Suarez",
      latitude: 19.4248,
      longitude: -99.1333,
      image: require("../../assets/images/pinosuarez.png"),
    }, // Pino Suárez
  ];

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" />
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
            strokeColor="#0000FF"
            strokeWidth={5}
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
                setStationSelectedImage(station.image);
              }}
            >
              <Image
                source={station.image}
                style={{ width: 37, height: 37, borderRadius: 100 }}
                resizeMode={"cover"}
              />
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
          )}
        >
          <BottomSheetView style={styles.bottomSheet}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.bottomSheetText, styles.bigText]}>
                {stationSelected}
              </Text>
              <Image
                source={stationSelectedImage}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginRight: 20,
                }}
                resizeMode={"cover"}
              />
            </View>
            <View style={styles.line}></View>
            <View style={[styles.minimalistContainer, styles.sectionContainer]}>
  <View style={styles.progressSection}>
    <Text style={[styles.bottomSheetText, styles.smallText]}>
      Direccion Indios Verdes{"\n"}
      Siguiente metro:{" "}
      <Text style={[styles.bottomSheetText]}>7 min</Text>
    </Text>
    <ProgressBar stepCount={4} currStep={2} colorScheme="light" />
  </View>
  <View>
    <Text style={[styles.bottomSheetText, styles.smallTextSecond]}>
      Capacidad:{" "}
    </Text>
    <Text style={[styles.bottomSheetText]}>50%</Text>
  </View>
</View>

          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minimalistContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#303030",
    padding: 10,
    marginBottom: 10,
  },
  sectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressSection: {
    flex: 1,
  },
  
  
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
    fontFamily: "inter-b",

    //alignSelf: "center",
    marginBottom: 7,
    //alignSelf: "center",
  },

  smallText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "normal",
    fontFamily: "inter-r",
    //alignSelf: "center",
    marginTop: 20,
  },
  smallTextSecond: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "normal",
    fontFamily: "inter-r",
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
