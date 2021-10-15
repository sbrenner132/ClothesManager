import { Camera } from "expo-camera";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImaagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

export default ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [permission, setPermission] = useState(false);
  const cameraRef = useRef(null);

  const isFocused = useIsFocused();

  const requestPermission = async () => {
    // camera permissions
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (cameraRef && cameraRef.current) {
      cameraRef.current.resumePreview();
    }

    // file access permissions
    if (Platform.OS !== "web") {
      const { status } = await ImaagePicker.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    }
  };

  useEffect(() => {
    requestPermission();

    // return () => {
    //   if (cameraRef && cameraRef.current) cameraRef.current.pausePreview();
    // };
  });

  const pickImage = async () => {
    const result = await ImaagePicker.launchImageLibraryAsync({
      mediaTypes: ImaagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result);
    }
  };

  if (permission === null || hasPermission === null) {
    return <View />;
  } else if (hasPermission === false || permission === false) {
    return <View />;
  } else if (!isFocused) {
    return <View />;
  } else if (!photo) {
    console.log('here!!')
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (cameraRef) {
                  const data = await cameraRef.current.takePictureAsync();
                  setPhoto(data);
                }
              }}
            >
              <Icon
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                name="circle-thin"
                size={100}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.text}> Choose </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  } else {
    return (
      <View>
        <ImageBackground style={styles.image} source={{ uri: photo.uri }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setPhoto(null);
              }}
            >
              <Text style={styles.text}> Retake </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setPhoto(null);
                navigation.navigate("Manage", { image: photo });
              }}
            >
              <Text style={styles.text}> Select </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
