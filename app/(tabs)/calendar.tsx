import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert, // Импортируем Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTaskContext } from "@/contexts/TaskContext";

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const { addTask } = useTaskContext();

  const DatePicker = React.memo(({ label, value, mode, onChange }: any) => (
    <View style={styles.datePickerColumn}>
      <Text style={[styles.inputLabel, { color: "#BFC8E8" }]}>{label}</Text>
      <DateTimePicker
        value={value}
        mode={mode}
        display="default"
        onChange={onChange}
      />
    </View>
  ));

  const datePickers = [
    {
      label: "Start Date",
      mode: "date",
      value: startDate,
      setState: setStartDate,
    },
    { label: "End Date", mode: "date", value: endDate, setState: setEndDate },
    {
      label: "Start Time",
      mode: "time",
      value: startTime,
      setState: setStartTime,
    },
    { label: "End Time", mode: "time", value: endTime, setState: setEndTime },
  ];

  const handleDateChange = (event: any, selectedDate: any, setState: any) => {
    if (selectedDate) {
      setState(selectedDate);
    }
  };

  const getFullDateTime = (date: any, time: any) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
  };

  const saveTask = async () => {
    if (!taskName.trim()) {
      Alert.alert("Error", "Please, enter task name.");
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      startDate: getFullDateTime(startDate, startTime),
      endDate: getFullDateTime(endDate, endTime),
      status: "pending",
    };

    try {
      addTask(taskData as any);
      setTaskDescription("");
      setTaskName("");
      navigation.goBack();
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#9C2CF3", "#3A49F9", "#fff"]}
      style={styles.container}
    >
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Feather
              name="arrow-left"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Create a Task</Text>
            <Feather name="arrow-right" size={24} color="transparent" />
          </View>
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#fff"
                editable={true}
                value={taskName}
                onChangeText={setTaskName}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.datePickerContainer}>
            {datePickers.map(({ label, value, mode, setState }) => (
              <DatePicker
                key={label}
                label={label}
                value={value}
                mode={mode}
                onChange={(event: any, date: any) =>
                  handleDateChange(event, date, setState)
                }
              />
            ))}
          </View>
          <View style={styles.border} />
          <Text style={[styles.inputLabel, { color: "#BFC8E8" }]}>
            Description
          </Text>
          <TextInput
            style={[styles.input, styles.inputDescription]}
            placeholder=""
            placeholderTextColor="#000"
            editable={true}
            multiline={true}
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <View style={styles.border} />
          <TouchableOpacity style={{ marginTop: 80 }} onPress={saveTask}>
            <LinearGradient
              colors={["#9C2CF3", "#3A49F9"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create Task</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 1300,
  },
  headerContainer: {
    height: 300,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
    gap: 10,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  inputDescription: {
    backgroundColor: "#efefef",
    color: "#000",
    paddingLeft: 15,
    borderRadius: 10,
    paddingVertical: 10,
    minHeight: 60,
  },
  bottomContainer: {
    minHeight: "100%",
    marginHorizontal: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    padding: 15,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    rowGap: 15,
  },
  datePickerColumn: {
    width: "50%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  border: {
    borderColor: "#BFC8E8",
    borderWidth: 0.5,
    marginVertical: 30,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    borderRadius: 75,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 24 },
});
