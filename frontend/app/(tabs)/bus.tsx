import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { TrenService } from "@/services/tren.service";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";

interface Bus {
  idtren: number;
  linea: number;
  estacion: number;
  concurrencia: number;
  fecha: string;
  capacidad: number;
  matricula: string;
  sentido: string;
}

const Bus = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [fetchInterval, setFetchInterval] = useState<any>(null);

  const trenService = new TrenService();

  const fetchBuses = async () => {
    const buses = await trenService.getAllTrenes();

    console.log(buses);

    setBuses(buses);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBuses();
      const intervalId = setInterval(fetchBuses, 9000);
      setFetchInterval(intervalId);

      return () => clearInterval(fetchInterval);
    }, [])
  );

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
        {buses.map((bus) => {
          const estacion =
            bus.estacion === 1
              ? "Tlaxcalancingo"
              : bus.estacion === 2
              ? "Emiliano Zapata"
              : bus.estacion === 3
              ? "Casa de los Angeles"
              : bus.estacion === 4
              ? "Carmen Serdán"
              : "Niño Poblano";

          const direccion = bus.sentido === "I" ? "Ida" : "Vuelta";

          const congestion = (bus.concurrencia / bus.capacidad) * 100;

          return (
            <View key={bus.idtren} style={styles.busContainer}>
              <View style={styles.busInfo}>
                <FontAwesome5 name="bus" size={38} color="orange" />

                <Text style={styles.congestionText}>{estacion}</Text>
              </View>
              <View style={styles.busStatus}>
                <Text style={[styles.congestionText, { color: "white" }]}>
                  {direccion}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <Text
                    style={[
                      styles.congestionText,
                      { color: "white", marginTop: 0 },
                    ]}>
                    Congestión:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.congestionText,
                      { color: "orange", marginTop: 0 },
                    ]}>
                    {congestion.toFixed(2)}%
                  </Text>
                </View>
                <Text style={styles.updateText}>{bus.fecha}</Text>
              </View>
            </View>
          );
        })}
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
    marginTop: 15,
  },
  updateText: {
    color: "#666",
    fontFamily: "inter-r",
    fontSize: 14,
  },
});
