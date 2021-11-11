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
import Modal from "react-native-modal";
import { LogBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFonts } from "expo-font";
import axios from "axios";
import myCardApi from "../api/myCardApi";

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [link, setLink] = useState();
  const [selectedApp, setSelectedApp] = useState(1);


  const [add, setAdd] = useState(true);
  const [result, setResult] = useState();
  const [resultLoading, setResultLoading] = useState(false);

  const [selectedItem, setSeletedItem] = useState();
  let [fontsLoaded] = useFonts({
    text: require("../../assets/fonts/GlacialIndifference-Regular.otf"),
    title: require("../../assets/fonts/GlacialIndifference-Bold.otf"),
  });

  useEffect(() => {
    async function getItems() {
      try {
        setResultLoading(true);
        const res = await myCardApi.get('/read_links.php?user_id=1');
        setResult(res.data);
        console.log(res);
        setResultLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getItems()
  }, []);

  useEffect(() => {
    if (selectedItem && !add) {
      console.log(selectedItem);
      setLink(selectedItem.link);
      setSelectedApp(selectedItem.id);
    }
  }, [selectedItem]);

  const addItem = () => {
    setSelectedApp(1);
    setLink("");
    setModalVisible(false);
  };

  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  /* let data = [
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
  ]; */
  if (fontsLoaded)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>BONJOUR, SYPHAX ☀️</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <FlatList
                data={!resultLoading ? [] : [
                  ...result,
                  {
                    id: "$",
                    link: "",
                    color: "#DDDDDD",
                    icon: "plus",
                  },
                ]}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={(item) => {
                  return item.item.id === "$" ? (
                    <TouchableOpacity
                      onPress={() => {
                        setAdd(true);
                        setSeletedItem();
                        setModalVisible(true);
                      }}>
                      <MyCardItem
                        icon={item.item.icon}
                        color={item.item.color}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <MyCardItem
                        icon={item.item.icon}
                        color={item.item.color}
                      />
                      <View style={styles.editStyle}>
                        <TouchableOpacity
                          style={{ height: 22, width: 22 }}
                          onPress={() =>
                            (data = data.filter((i) => i.id !== item.item.id))
                          }>
                          <Feather name='trash-2' size={22} color='black' />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ height: 22, width: 22, marginLeft: 7 }}
                          onPress={() => {
                            setAdd(false);
                            setSeletedItem(item.item);
                            setModalVisible(true);
                          }}>
                          <Feather name='edit' size={22} color='black' />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
        <Modal
          style={styles.modalStyle}
          isVisible={isModalVisible}
          deviceHeight={Dimensions.get("window").height + 30}
          backdropOpacity={0.2}
          onBackButtonPress={() => {
            setModalVisible(false);
          }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalTitleStyle}>Ajouter un lien!</Text>
            <Text style={styles.labelStyle}>Type d'application</Text>
            <View style={styles.pickerStyle}>
              <Picker
                selectedValue={selectedApp}
                style={styles.modalInputStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedApp(itemValue)
                }>
                <Picker.Item label='Telephone' value='100' />
                <Picker.Item label='Facebook' value='0' />
                <Picker.Item label='Snapchat' value='1' />
                <Picker.Item label='Instagram' value='2' />
              </Picker>
            </View>

            <Text style={styles.labelStyle}>Lien vers votre compte</Text>
            <TextInput
              style={styles.modalInputStyle}
              value={link}
              onChangeText={(value) => setLink(value)}
              placeholder={"Collez le lien !"}
            />
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={() => addItem()}>
              {add ? (
                <Text style={styles.modalTextButtonStyle}>AJOUTER</Text>
              ) : (
                <Text style={styles.modalTextButtonStyle}>ENREGISTRER</Text>
              )}
            </TouchableOpacity>
          </View>
        </Modal>
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
  modalStyle: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: 400,
    bottom: -30,
    left: -20,
    padding: 20,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalTitleStyle: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
    fontFamily: "title",
  },
  modalButtonStyle: {
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "black",
    borderRadius: 5,
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
  },
  modalInputStyle: {
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "black",
    height: 45,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "text",
  },
  modalTextButtonStyle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "text",
  },
  logoBox: {
    width: Dimensions.get("window").width - 40,
    height: 60,
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

export default HomeScreen;
