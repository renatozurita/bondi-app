import { Text, StyleSheet, View, Button, Platform } from "react-native";
import React, { Component } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notify({ title, seconds }) {
  async function scheduleNotification() {
    if (!(await askPermissions())) {
      alert("No tengo permisos para enviar notificaciones :(");
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Aviso de bus",
        body: "Está llegando el bondi, compa",
        data: { message: "se va el bondi!" },
      },
      trigger: { seconds: seconds },
    });
  }
  return <Button title={title} onPress={scheduleNotification}></Button>;
}

async function askPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return true;
}

const styles = StyleSheet.create({});
