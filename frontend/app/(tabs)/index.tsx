import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

const Home = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.200:8081/api/auth/estacion/all")
      .then((response) => response.json())
      .then((data) => setLines(data));

    console.log(lines);
  }, []);

  const buses = [
    {
      id: 1,
      line: "Línea 1",
      route: "Tlaxcalancingo",
      congestion: 65,
      lastUpdate: "2024-04-12 10:30",
    },
    {
      id: 2,
      line: "Línea 1",
      route: "Emiliano Zapata",
      congestion: 80,
      lastUpdate: "2024-04-12 10:25",
    },
    {
      id: 3,
      line: "Línea 1",
      route: "Casa de Angeles",
      congestion: 50,
      lastUpdate: "2024-04-12 10:20",
    },
    {
      id: 4,
      line: "Línea 1",
      route: "Carmen Serdán",
      congestion: 30,
      lastUpdate: "2024-04-12 10:15",
    },
    {
      id: 5,
      line: "Línea 1",
      route: "Niño Poblano",
      congestion: 70,
      lastUpdate: "2024-04-12 10:10",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Estaciones</Text>
        <Text
          style={[
            styles.headerText,
            {
              fontSize: 16,
              color: "white",
              fontFamily: "inter-sb",
            },
          ]}>
          Tlaxcalancingo - Chachapa
        </Text>
      </View>
      <ScrollView>
        {buses.map((bus) => (
          <View key={bus.id} style={styles.busContainer}>
            <View style={styles.busInfo}>
              <FontAwesome5 name="bus" size={36} color="orange" />
              <Text style={styles.busRoute}>{bus.route}</Text>
            </View>
            <View style={styles.busStatus}>
              <Text style={styles.congestionText}>
                Congestión: {bus.congestion}%
              </Text>
              <Text style={styles.updateText}>
                Última actualización: {bus.lastUpdate}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#3085C3",
    fontFamily: "inter-b",
    fontSize: 20,
  },
  busContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
  },
  busInfo: {
    flex: 1,
    alignItems: "center",
    marginRight: "10%",
  },
  busStatus: {
    flex: 1,
    alignItems: "center",
  },
  busLine: {
    color: "#3085C3",
    fontFamily: "inter-sb",
    fontSize: 16,
  },
  busRoute: {
    color: "white",
    fontFamily: "inter-sb",
    fontSize: 16,
    marginTop: 15,
  },
  congestionText: {
    color: "white",
    fontFamily: "inter-r",
    fontSize: 16,
  },
  updateText: {
    color: "#666",
    fontFamily: "inter-r",
    fontSize: 14,
    marginTop: 5,
  },
});
