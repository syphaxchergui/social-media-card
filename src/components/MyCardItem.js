import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const MyCardItem = ({ color, icon }) => {
  return  icon  != 'plus' ? (
    <View
      style={{
        height: 190,
        width: Dimensions.get("window").width / 2 - 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
        marginVertical: 10,
        marginHorizontal: 10,
      
      }}>
      <FontAwesome name={icon} size={75} color='black' />
    </View>
  ) : (
    <View
      style={{
        height: 190,
        width: Dimensions.get("window").width / 2 - 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color,
        marginVertical: 10,
        opacity: 0.5,
        marginHorizontal: 10,
     
      }}>
      <Ionicons
        name='ios-add'
        size={100}
        color='black'
    
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyCardItem;
