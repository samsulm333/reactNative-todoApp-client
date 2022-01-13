import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ text, buttonDone, onDelete }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        {text.status === "false" ? (
          <TouchableOpacity style={styles.buttonDone} onPress={buttonDone}>
            <View>
              <Text style={styles.doneText}>Done</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.circular}></View>
        )}

        <Text style={styles.itemText}>{text.title}</Text>
      </View>

      <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
        <View>
          <Text style={styles.deleteText}>x</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  buttonDone: {
    width: 50,
    height: 40,
    backgroundColor: "green",
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  doneText: {
    color: "white",
    fontWeight: "bold",
  },
  circular: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  itemText: {
    maxWidth: "80%",
  },
  buttonDelete: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    paddingBottom: 5,
  },
  deleteText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
  },
});
export default Task;
