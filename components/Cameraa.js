import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";

export default function Cameraa() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    console.log("Permission is granted", permission?.granted);
  }, [permission]);

  const toggleCameraType = async () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  return (
    <View>
      <Text>Camera Comp {type}</Text>
      <Camera style={styles.camera} type={type} />
      <Button title="Grant Permission" onPress={() => requestPermission()} />
      <Button title="Flip Camera" onPress={toggleCameraType} disabled={permission?.granted ? false : true} />
      <Button title="Go to Home" onPress={() => navigation.push("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: 350,
  },
});