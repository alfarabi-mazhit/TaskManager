import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskType } from "@/types/TaskType";
import { useTaskContext } from "@/contexts/TaskContext";

const selectors = [
  { name: "My Tasks" },
  { name: "In-progress" },
  { name: "Completed" },
];

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { tasks, updateTaskStatus, deleteTask } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      if (selectedIndex === 0) return true; // All tasks
      if (selectedIndex === 1) return task.status === "in-progress"; // In-progress
      if (selectedIndex === 2) return task.status === "completed"; // Completed
      return false;
    });
    setFilteredTasks(filteredTasks);
  }, [tasks, selectedIndex]);

  const SelectorItem = ({
    selector,
    index,
  }: {
    selector: { name: string };
    index: number;
  }) => {
    const isSelected = selectedIndex === index;
    return (
      <TouchableOpacity
        onPress={() => setSelectedIndex(index)}
        style={[styles.selector, isSelected && { backgroundColor: "#E5EAFC" }]}
      >
        <Text>{selector.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F5FF" }}>
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ color: "#2E3A59", fontSize: 46, fontWeight: "700" }}>
          Hello!
        </Text>
        <Text style={{ color: "#2E3A59", fontSize: 20 }}>Have a nice day.</Text>
        <View style={styles.selectorContainer}>
          {selectors.map((selector, index) => (
            <SelectorItem key={index} selector={selector} index={index} />
          ))}
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#2E3A59",
            marginBottom: 30,
          }}
        >
          Progress
        </Text>

        {filteredTasks.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 20,
                gap: 20,
                flexDirection: "row",
              }}
            >
              <LinearGradient
                colors={["#9C2CF3", "#3A49F9"]}
                style={{
                  alignSelf: "flex-start",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="leaf" size={28} color={"#fff"} />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#242736", fontWeight: "700" }}>
                  {task.name}
                </Text>
                <Text style={{ color: "#AEAEB3" }}>
                  {new Date(task.startDate).toLocaleString()}
                </Text>
                <Text style={{ color: "#AEAEB3" }}>
                  {new Date(task.endDate).toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={() => {
                  Alert.alert("Options", task.description + "\nChoose status", [
                    {
                      text: "Start",
                      onPress: () => updateTaskStatus(task.id, "in-progress"),
                    },
                    {
                      text: "Finish",
                      onPress: () => updateTaskStatus(task.id, "completed"),
                    },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => {
                        Alert.alert(
                          "Delete?",
                          "Are you sure to delete this task",
                          [
                            {
                              text: "Yes",
                              style: "destructive",
                              onPress: () => deleteTask(task.id),
                            },
                            { text: "No", style: "cancel" },
                          ]
                        );
                      },
                    },
                    { text: "Cancel", style: "cancel" },
                  ]);
                }}
              >
                <Entypo name="dots-three-vertical" size={24} color="#D8DEF3" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 52,
    marginBottom: 32,
  },
  selector: {
    borderRadius: 75,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cardLinearGradient: {
    width: 250,
    height: 250,
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "600",
  },
  cardDeadline: { color: "#fff", fontSize: 14 },
  taskContainer: {
    marginBottom: 20,
  },
});
