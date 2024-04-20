import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

const Bus = () => {
  const [buses, setBuses] = useState([]);

  const buses1 = [
    {
      id: 1,
      line: "Línea 1",
      route: "L1-001",
      congestion: 42,
      lastUpdate: "2024-04-12 09:30",
      station: "Tlaxcalancingo",
    },
    {
      id: 2,
      line: "Línea 1",
      route: "L1-002",
      congestion: 87,
      lastUpdate: "2024-04-12 09:35",
      station: "Emiliano Zapata",
    },
    {
      id: 3,
      line: "Línea 1",
      route: "L1-003",
      congestion: 55,
      lastUpdate: "2024-04-12 09:50",
      station: "Casa de Ángeles",
    },
    {
      id: 4,
      line: "Línea 1",
      route: "L1-004",
      congestion: 90,
      lastUpdate: "2024-04-12 10:05",
      station: "Carmen Serdán",
    },
    {
      id: 5,
      line: "Línea 1",
      route: "L1-005",
      congestion: 25,
      lastUpdate: "2024-04-12 10:10",
      station: "Niño Poblano",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Buses</Text>
        <Text
          style={[
            styles.headerText,
            { fontSize: 16, color: "white", fontFamily: "inter-sb" },
          ]}>
          Chachapa - Tlaxcalancingo
        </Text>
      </View>
      <ScrollView>
        {buses1.map((bus) => (
          <View key={bus.id} style={styles.busContainer}>
            <View style={styles.busInfo}>
              <FontAwesome5 name="bus" size={38} color="orange" />

              <Text style={styles.busRoute}>{bus.route}</Text>
            </View>
            <View style={styles.busStatus}>
              <Text style={styles.congestionText}>{bus.station}</Text>
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

export default Bus;

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
    alignItems: "center",
  },
  busInfo: {
    flex: 1,
    alignItems: "center",
    marginRight: "10%",
  },
  busStatus: {
    flex: 1,
    gap: 5,
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
    marginTop: 10,
  },
  congestionText: {
    color: "white",
    fontFamily: "inter-b",
    fontSize: 14,
  },
  updateText: {
    color: "#666",
    fontFamily: "inter-r",
    fontSize: 14,
  },
});
