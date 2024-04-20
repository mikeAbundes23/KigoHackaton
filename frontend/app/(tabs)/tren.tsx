import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const Tren = () => {
  const trains = [
    {
      id: 1,
      line: "Línea 2",
      route: "L2-001",
      congestion: 42,
      lastUpdate: "2024-04-12 09:30",
      station: "Bellas Artes",
    },
    {
      id: 2,
      line: "Línea 2",
      route: "L2-002",
      congestion: 87,
      lastUpdate: "2024-04-12 09:35",
      station: "Zócalo",
    },
    {
      id: 3,
      line: "Línea 2",
      route: "L2-003",
      congestion: 55,
      lastUpdate: "2024-04-12 09:50",
      station: "Allende",
    },
    {
      id: 4,
      line: "Línea 2",
      route: "L2-004",
      congestion: 90,
      lastUpdate: "2024-04-12 10:05",
      station: "Hidalgo",
    },
    {
      id: 5,
      line: "Línea 2",
      route: "L2-005",
      congestion: 25,
      lastUpdate: "2024-04-12 10:10",
      station: "Pino Suárez",
    },
    {
      id: 6,
      line: "Línea 2",
      route: "L2-006",
      congestion: 19,
      lastUpdate: "2024-04-12 10:30",
      station: "Bellas Artes",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Trenes</Text>
        <Text
          style={[
            styles.headerText,
            { fontSize: 16, color: "white", fontFamily: "inter-sb" },
          ]}
        >
          Cuatro Caminos - Tasqueña
        </Text>
      </View>
      <ScrollView>
        {trains.map((train) => (
          <View key={train.id} style={styles.trainContainer}>
            <View style={styles.trainInfo}>
              <FontAwesome name="train" size={38} color="white" />

              <Text style={styles.trainRoute}>{train.route}</Text>
            </View>
            <View style={styles.trainStatus}>
              <Text style={styles.congestionText}>
                Estación: {train.station}
              </Text>
              <Text style={styles.congestionText}>
                Congestión: {train.congestion}%
              </Text>
              <Text style={styles.updateText}>
                Última actualización: {train.lastUpdate}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tren;

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
  trainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
  },
  trainInfo: {
    flex: 1,
    alignItems: "center",
    marginRight: "10%",
  },
  trainStatus: {
    flex: 1,
    alignItems: "center",
  },
  trainLine: {
    color: "#3085C3",
    fontFamily: "inter-sb",
    fontSize: 16,
  },
  trainRoute: {
    color: "white",
    fontFamily: "inter-sb",
    fontSize: 16,
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
