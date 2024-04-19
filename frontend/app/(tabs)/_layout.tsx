import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "#666",
          borderTopWidth: 0.2,
        },
      }}
      initialRouteName="mapa">
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="home" size={26} color={color} />
          ),
          tabBarLabelStyle: { fontFamily: "inter-r", fontSize: 11 },
          tabBarLabel: "Inicio",
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="location" size={26} color={color} />
          ),
          headerShown: false,
          tabBarLabelStyle: { fontFamily: "inter-r", fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
