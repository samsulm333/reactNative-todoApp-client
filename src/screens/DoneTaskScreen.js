import React, { useState, useEffect } from "react";
import { API } from "../config/api";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

// import component Task
import Task from "../components/Task";

export default function DoneTaskScreen({ navigation }) {
  const [doneTasks, setDonetasks] = useState([]);

  // get todos with status true / done
  const getTodos = async () => {
    const responseData = await API.get("/todos");

    const data = responseData.data.data.filter(
      (item) => item.status === "true"
    );
    setDonetasks(data);
  };

  // render for flatlist component
  const renderItem = ({ item }) => (
    <Task
      key={item.id}
      text={item}
      onDelete={() => handleButtonDelete(item.id)}
    />
  );

  // delete button function
  const handleButtonDelete = async (todoId) => {
    const id = todoId;
    await API.delete(`todo/${id}`);
  };

  useEffect(() => {
    getTodos();
  }, [doneTasks]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Todo List")}
        style={styles.buttonNavigation}
      >
        <View>
          <Text style={styles.navigationText}>Go Back To Home</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.doneTaskContainer}>
        <FlatList
          data={doneTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonNavigation: {
    height: "8%",
    width: "95%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#03506F",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 10,
  },
  navigationText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  doneTaskContainer: {
    height: "65%",
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
});
