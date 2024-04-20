import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { EstacionService } from "@/services/estacion.service";
import { useFocusEffect } from "expo-router";

interface Estacion {
  idestacion: number;
  numero_estacion: number;
  concurrencia: number;
  concurrencia_maxima: number;
  fecha: string;
}

const Home = () => {
  const [lines, setLines] = useState<Estacion[]>([]);
  const [fetchInterval, setFetchInterval] = useState<any>(null);

  const trenService = new EstacionService();

  const fetchLines = async () => {
    const lines = await trenService.getAll();

    setLines(lines);
  };

  // Utiliza useFocusEffect para ejecutar el fetch cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      fetchLines();
      const intervalId = setInterval(fetchLines, 9000);
      setFetchInterval(intervalId);

      // Al salir de la pantalla, limpiar el intervalo
      return () => clearInterval(fetchInterval);
    }, [])
  );

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
        {lines.map((line) => {
          const nombre =
            line.numero_estacion === 1
              ? "Tlaxcalancingo"
              : line.numero_estacion === 2
              ? "Emiliano Zapata"
              : line.numero_estacion === 3
              ? "Casa de los Angeles"
              : line.numero_estacion === 4
              ? "Carmen Serdán"
              : "Niño Poblano";

          return (
            <View key={line.idestacion} style={styles.busContainer}>
              <View style={styles.busInfo}>
                <FontAwesome5 name="bus" size={36} color="orange" />
                <Text style={styles.busRoute}>{nombre}</Text>
              </View>
              <View style={styles.busStatus}>
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <Text style={styles.congestionText}>Congestión: </Text>
                  <Text
                    style={[styles.congestionText, { fontFamily: "inter-b" }]}>
                    {line.concurrencia}
                  </Text>
                </View>
                <Text style={styles.updateText}>{line.fecha}</Text>
              </View>
            </View>
          );
        })}
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
