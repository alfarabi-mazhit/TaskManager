import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function BottomNavigation() {
  const styles = StyleSheet.create({
    icon: {
      backgroundColor: "#fff",
      padding: 10,
      paddingHorizontal: 15,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3A49F9",
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.icon}>
              <Ionicons name="home-sharp" size={32} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.icon}>
              <Ionicons name="calendar" size={32} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
