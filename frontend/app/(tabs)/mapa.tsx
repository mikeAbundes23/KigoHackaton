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
import ProgressBar from "../../components/ProgressBar";
import { FontAwesome5 } from "@expo/vector-icons";

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stationSelected, setStationSelected] = useState<string>("");

  const snapPoints = isOpen ? ["55%"] : [0.1];

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  const coordinates = [
    { latitude: 19.0329, longitude: -98.2687 }, // Terminal Tlaxcalancingo
    { latitude: 19.0335, longitude: -98.2626 }, // 01 Emiliano Zapata
    { latitude: 19.035, longitude: -98.2583 }, // 02 Casa de Angeles
    { latitude: 19.0363, longitude: -98.2513 }, // 03 Carmen Serdán
    { latitude: 19.0373, longitude: -98.2476 }, // 04 Niño Poblano
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
      latitude: 19.035,
      longitude: -98.2583,
    }, // 02 Casa de Angeles
    {
      name: "Carmen Serdán",
      latitude: 19.0363,
      longitude: -98.2513,
    }, // 03 Carmen Serdán
    {
      name: "Niño Poblano",
      latitude: 19.0373,
      longitude: -98.2476,
    }, // 04 Niño Poblano
  ];

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 19.035,
            longitude: -98.2583,
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
              }}>
              <View
                style={{
                  width: 37,
                  height: 37,
                  backgroundColor: "white",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <FontAwesome5 name="bus" size={30} color="orange" />
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={[styles.bottomSheetText, styles.bigText]}>
                {stationSelected}
              </Text>
              <FontAwesome5 name="bus" size={45} color="orange" />
            </View>

            <View style={styles.line}></View>
            <View style={[styles.minimalistContainer, styles.sectionContainer]}>
              <View style={styles.progressSection}>
                <Text style={[styles.bottomSheetText, styles.smallText]}>
                  Direccion Chacapa{"\n"}
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
            <View style={[styles.minimalistContainer, styles.sectionContainer]}>
              <View style={styles.progressSection}>
                <Text style={[styles.bottomSheetText, styles.smallText]}>
                  Direccion Tlaxcalancingo{"\n"}
                  Siguiente metro:{" "}
                  <Text style={[styles.bottomSheetText]}>2 min</Text>
                </Text>
                <ProgressBar stepCount={4} currStep={3} colorScheme="light" />
              </View>
              <View>
                <Text style={[styles.bottomSheetText, styles.smallTextSecond]}>
                  Capacidad:{" "}
                </Text>
                <Text style={[styles.bottomSheetText]}>22%</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  // Función para manejar la acción del botón
                }}>
                <Text
                  style={[
                    styles.buttonText,
                    { fontWeight: "bold", color: "white" },
                  ]}>
                  Check More Info
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#cf6209", //#b95504
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "stretch",
    width: "90%",
    alignItems: "center",
    height: 45,
    justifyContent: "center",
  },

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
    backgroundColor: "orange",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
});
