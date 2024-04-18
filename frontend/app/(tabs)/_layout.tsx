import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return <Tabs screenOptions={{
    tabBarStyle : {backgroundColor : 'black'}
  }}>
     <Tabs.Screen
        name="mapa"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marker-alt" size={24} color={color} />
          ),
          headerShown: false,
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
