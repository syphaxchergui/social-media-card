import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import MyCardItem from "../components/MyCardItem";
import SafeAreaView from "react-native-safe-area-view";
import { Feather } from "@expo/vector-icons";
import { LogBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/core";

const DetailsHistoryScreen = () => {
  let [fontsLoaded] = useFonts({
    text: require("../../assets/fonts/GlacialIndifference-Regular.otf"),
    title: require("../../assets/fonts/GlacialIndifference-Bold.otf"),
  });
  const navigation = useNavigation();

  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  let data = [
    {
      id: "0",
      link: "facebookfacebook",
      color: "#9BF6FF",
      icon: "facebook-square",
    },
    {
      id: "1",
      link: "snapchatsnapchat",
      color: "#FDFFB6",
      icon: "snapchat-square",
    },
    {
      id: "2",
      link: "instagraminstagram",
      color: "#FFADAC",
      icon: "instagram",
    },
    {
      id: "100",
      link: "0775797375",
      color: "#CAFFBF",
      icon: "phone",
    },
    
  ];
  if (fontsLoaded)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Feather
              onPress={() => navigation.goBack()}
              style={{ position: "absolute", top: 13, left: 20 }}
              name='arrow-left'
              size={25}
              color='black'
            />
            <Text style={styles.logoText}>CHERGUI Syphax</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return (
                    <TouchableOpacity onPress={() => {}}>
                      <MyCardItem
                        icon={item.item.icon}
                        color={item.item.color}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 22,
    opacity: 0.5,
    flexDirection: "row",
  },
  labelStyle: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: "text",
  },
  pickerStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    height: 45,
    marginBottom: 10,
    borderRadius: 5,
  },

  logoBox: {
    width: Dimensions.get("window").width - 40,
    height: 60,
    flexDirection: "row",
    borderColor: "#000",
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  logoText: {
    fontFamily: "title",
    fontSize: 22,
  },
});

export default DetailsHistoryScreen;
