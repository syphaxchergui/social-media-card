import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import SafeAreaView from "react-native-safe-area-view";
import { MyCardContext } from "../context/MyCardProvider";
import { LogBox } from "react-native";
import HistoryItem from "../components/HistoryItem";
import { useNavigation } from "@react-navigation/core";

const HistoryScreen = () => {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  const navigation = useNavigation();
  const { userId } = useContext(MyCardContext);
  let [fontsLoaded] = useFonts({
    text: require("../../assets/fonts/GlacialIndifference-Regular.otf"),
    title: require("../../assets/fonts/GlacialIndifference-Bold.otf"),
  });
  const data = [
    {
      id: "1",
      name: "CHERGUI",
      surname: "Syphax",
      date: new Date(),
    },
    {
      id: "2",
      name: "CHABI",
      surname: "Slimane",
      date: new Date(),
    },
    {
      id: "3",
      name: "CHERGUI",
      surname: "Ines",
      date: new Date(),
    },
  ];

  if (fontsLoaded)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>HISTORIQUE 👀</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("DetailsHistory", {
                        id: item.item.id,
                      });
                    }}>
                    <HistoryItem
                      fullName={item.item.name + " " + item.item.surname}
                      time={item.item.date.toLocaleTimeString()}
                      date={item.item.date.toISOString()}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logoBox: {
    width: Dimensions.get("window").width - 40,
    height: 60,
    borderColor: "#000",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoText: {
    fontFamily: "title",
    fontSize: 22,
  },
});

export default HistoryScreen;
