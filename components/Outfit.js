import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, Image, Button, Modal, Pressable, TextInput } from "react-native";
import sendEmail from "../scripts/email";

export default ({ outfit }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [to, setTo] = useState("");

  const sendData = () => {
    const top = outfit.top ? outfit.top.name : "No outfit top";
    const bottom = outfit.bottom ? outfit.bottom.name : "no outfit bottom";
    const headwear = outfit.headwear ? outfit.headwear.name : "no outfit headwear";
    sendEmail(to, 'An outfit has been shared with you!', `Here's the latest fashion trend!\n${top}, ${bottom}, ${headwear}`, {
      cc: 'samuelbrenner@brandeis.edu'
    }).then(() => Alert.alert("Sent!"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Top</Text>
        {outfit.top ? (
          <View>
            <Text>{outfit.top.name}</Text>
            <Image
              source={{ uri: outfit.top.img.uri }}
              style={{ width: 50, height: 100 }}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.item}>
        <Text>Bottom</Text>
        {outfit.bottom ? (
          <View>
            <Text>{outfit.bottom.name}</Text>
            <Image
              source={{ uri: outfit.bottom.img.uri }}
              style={{ width: 50, height: 100 }}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.item}>
        <Text>Headwear</Text>
        {outfit.headwear ? (
          <View>
            <Text>{outfit.headwear.name}</Text>
            <Image
              source={{ uri: outfit.headwear.img.uri }}
              style={{ width: 50, height: 100 }}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.email_button}>
        <Button title="Share via Email" onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter an email to share with</Text>
            <TextInput
              value={to}
              placeholder={"example@gmail.com"}
              style={styles.text_input}
              onChangeText={(text) => setTo(text)}
            />
            <View style={{ paddingBottom: 10, paddingTop: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => { sendData(); setModalVisible(!modalVisible) }}
              >
                <Text style={styles.textStyle}>Send</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flexDirection: "column",
    flex: 3,
  },
  email_button: {
    flex: 2,
    justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});
