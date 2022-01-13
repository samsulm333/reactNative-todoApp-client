import React, { useState, useEffect } from "react";
import { API } from "../config/api";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
} from "react-native";

// import component Task
import Task from "../components/Task";

export default function HomeScreen({ navigation }) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const getTodos = async () => {
    const responseData = await API.get("/todos");

    const task = responseData.data.data.filter(
      (item) => item.status === "false"
    );
    setTaskItems(task);
  };

  // Button Done Todo - edit Status
  const handleButtonDone = async (todoId) => {
    const id = todoId;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const body = { status: "true" };
    await API.patch(`todo/${id}`, body, config);
  };

  // Button Delete Todo
  const handleButtonDelete = async (todoId) => {
    const id = todoId;
    await API.delete(`todo/${id}`);
  };

  // Add Todo
  const handleAddTask = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = {
        title: task,
      };

      await API.post("/add-todo", body, config);
    } catch (err) {
      console.log(err);
    }
    Keyboard.dismiss();
    setTask(null);
  };

  const renderItem = ({ item }) => (
    <Task
      key={item.id}
      text={item}
      buttonDone={() => handleButtonDone(item.id)}
      onDelete={() => handleButtonDelete(item.id)}
    />
  );

  useEffect(() => {
    getTodos();
  }, [taskItems]);

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonNavigation}
        onPress={() => navigation.navigate("Complete Task")}
      >
        <View>
          <Text style={styles.navigationText}>Go to Complete Task</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.taskContainer}>
        <FlatList
          data={taskItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.inputTaskWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Add Todo Here"
          value={task}
          style={styles.textInput}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableOpacity>
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
  taskContainer: {
    height: "65%",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  inputTaskWrapper: {
    height: "25%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#03506F",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#03506F",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#03506F",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 30,
    justifyContent: "center",
    color: "white",
  },
});
