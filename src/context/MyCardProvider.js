import React, { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyCardContext = React.createContext();

export const MyCardProvider = (props) => {
  const [isLogged, setIsLogged] = useState();
  const [userId, setUserId] = useState("1234abcd");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const value = await AsyncStorage.getItem("@userID");
        const name = await AsyncStorage.getItem("@userName");
        if (value !== null) {
          // value previously stored
          if (value === "#") {
            setIsLogged(false);
            setIsLoading(false);
          } else {
            setUserId(value);
            //verifyUser(value);
          }
        } else setIsLoading(false);

        if (name !== null) setUserName(name);
      } catch (e) {
        // error reading value
        console.log(e);
      }
    }
    getData();
  }, []);


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@userID", value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeName = async (value) => {
    try {
      await AsyncStorage.setItem("@userName", value);
    } catch (e) {
      console.log(e);
    }
  };


  const signIn = (uId, uName) => {
    setIsLogged(true);
    setUserId(uId);
    setUserName(uName);
    storeData(uId);
    storeName(uName);
  };

  const signOut = () => {
    setIsLogged(false);
    storeData("#");
    storeName("");
    saveTokenToDatabase("", userId).then(() => setUserId(""));
  };


  const contextValue = {
    isLogged,
    userId,
    userName,
    isLoading,
    signIn,
    signOut,

  };
  return (
    <MyCardContext.Provider value={contextValue}>
      {props.children}
    </MyCardContext.Provider>
  );
};
