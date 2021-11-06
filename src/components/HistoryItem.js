import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const HistoryItem = ({ fullName, date, time }) => {
  let format = date.split("T")[0].split("-");
  let [fontsLoaded] = useFonts({
    text: require("../../assets/fonts/GlacialIndifference-Regular.otf"),
    title: require("../../assets/fonts/GlacialIndifference-Bold.otf"),
  });

  if (fontsLoaded)
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.nameStyle}>{fullName}</Text>
          <Text style={styles.dateStyle}>
            Scanné le{" "}
            {format[2] + "-" + format[1] + "-" + format[0] + " " + time}
          </Text>
        </View>
        <View>
          <Ionicons name='open-outline' size={24} color='black' />

        </View>
      </View>
    );
  else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    height: 75,
    padding: 20,
    flexDirection: "row",
  },
  nameStyle: {
    fontFamily: "title",
    fontSize: 16,
    marginBottom: 3,
  },
  dateStyle: {
    fontFamily: "text",
    fontSize: 14,
  },
});

export default HistoryItem;
