import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const trains = [
    {
      id: 1,
      line: "Línea 2",
      route: "Pino Suárez",
      congestion: 65,
      lastUpdate: "2024-04-12 10:30",
      image: require("../../assets/images/hidalgo.png"),
    },
    {
      id: 2,
      line: "Línea 2",
      route: "Zócalo",
      congestion: 80,
      lastUpdate: "2024-04-12 10:25",
      image: require("../../assets/images/bellasartes.png"),
    },
    {
      id: 3,
      line: "Línea 2",
      route: "Allende",
      congestion: 50,
      lastUpdate: "2024-04-12 10:20",
      image: require("../../assets/images/allende.png"),
    },
    {
      id: 4,
      line: "Línea 2",
      route: "Bellas Artes",
      congestion: 30,
      lastUpdate: "2024-04-12 10:15",
      image: require("../../assets/images/zocalo.png"),
    },
    {
      id: 5,
      line: "Línea 2",
      route: "Hidalgo",
      congestion: 70,
      lastUpdate: "2024-04-12 10:10",
      image: require("../../assets/images/pinosuarez.png"),
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
            { fontSize: 18, color: "white", fontFamily: "inter-r" },
          ]}>
          Cuatro Caminos - Tasqueña
        </Text>
      </View>
      <ScrollView>
        {trains.map((train) => (
          <View key={train.id} style={styles.trainContainer}>
            <View style={styles.trainInfo}>
              <Image
                source={train.image}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text style={styles.trainRoute}>{train.route}</Text>
            </View>
            <View style={styles.trainStatus}>
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
    fontFamily: "inter-sb",
    fontSize: 24,
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
    fontSize: 18,
  },
  trainRoute: {
    color: "white",
    fontFamily: "inter-sb",
    fontSize: 18,
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
