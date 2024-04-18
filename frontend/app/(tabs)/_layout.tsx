import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Mapa from "./mapa"

import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return <Tabs screenOptions={{}}>
    <Tabs.Screen name= "mapa" options={{
      headerShown : false,
    }}
    />
    <Tabs.Screen name= "home" options={{
      headerShown : false,
    }}
    />
    <Tabs.Screen name= "data" options={{
      headerShown : false,
    }}
    />
  </Tabs>;
}
