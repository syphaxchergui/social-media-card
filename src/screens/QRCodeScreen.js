import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import QRCode from "react-native-qrcode-generator";
import SafeAreaView from "react-native-safe-area-view";
import { MyCardContext } from "../context/MyCardProvider";
import Modal from "react-native-modal";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";

const QRCodeScreen = () => {
  const { userId } = useContext(MyCardContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  let [fontsLoaded] = useFonts({
    text: require("../../assets/fonts/GlacialIndifference-Regular.otf"),
    title: require("../../assets/fonts/GlacialIndifference-Bold.otf"),
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });
    //console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      //alert(result.uri);
      try {
        let res = await BarCodeScanner.scanFromURLAsync(result.uri);
        if (res.length > 0) {
          alert(res[0].data)
        } else alert('Cette image ne represente pas une QR-Card !')
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setModalVisible(false);
    setScanned(true);
    alert(`Bar code ${data} has been scanned!`);
  };

  if (fontsLoaded)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>MY QR-CARD</Text>
            </View>
            <QRCode
              value={userId}
              size={Dimensions.get("window").width - 45}
              bgColor='black'
              fgColor='white'
            />
            <Text style={styles.explanatoryText}>
              Scanner ce QR Code pour avoir mes coordonnées 📩
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={() => {
                setModalVisible(true);
                setScanned(false);
              }}>
              <Text style={styles.modalTextButtonStyle}>🤳 SCAN QR-CARD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonStyle2}
              onPress={() => {
                pickImage();
              }}>
              <Text style={styles.modalTextButtonStyle2}>
                📲 IMPORTER UNE QR-CARD
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            style={styles.modalStyle}
            isVisible={isModalVisible}
            deviceHeight={Dimensions.get("window").height + 30}
            backdropOpacity={0.4}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}>
            <View style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? null : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
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
  modalButtonStyle: {
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#000",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  modalTextButtonStyle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "title",
  },
  modalButtonStyle2: {
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "black",
  },

  modalTextButtonStyle2: {
    color: "#000",
    fontSize: 16,
    fontFamily: "title",
  },
  explanatoryText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "text",
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 15,
  },
  modalStyle: {
    width: Dimensions.get("window").width - 40,
  },
});

export default QRCodeScreen;
