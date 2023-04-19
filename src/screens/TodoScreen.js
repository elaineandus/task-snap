import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, ScrollView, View, StatusBar, TouchableOpacity, AsyncStorage } from "react-native";
import { COLORS } from "../constants/theme";
import { Ionicons } from '@expo/vector-icons';

const TodoScreen = () => {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    // Load the todos from AsyncStorage
    AsyncStorage.getItem('todos').then((data) => {
      if (data) {
        setTodos(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    // Save the todos to AsyncStorage whenever it changes
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input !== '') {
      setTodos([...todos, { text: input, key: Date.now(), checked: false }]);
      setInput('');
    }
  };

  const checkTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != id);
    });
  };

  const editTodo = (id) => {
    setEditingId(id);
    const todo = todos.find((todo) => todo.key === id);
    setEditedText(todo.text);
  };

  const saveTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.key === id);
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].text = editedText;
    setTodos(updatedTodos);
    setEditingId(null);
    setEditedText('');
  };
  
  return (
    <ScrollView style={{ backgroundColor: COLORS.blue}} >
      <StatusBar backgroundColor={COLORS.secondary} />
      
      <View style={{ paddingTop: 10 }} >
        <View>
          <Text style={{ marginTop: 20, paddingTop: 25, paddingLeft: 25, fontSize: 24, fontWeight: "bold", color: COLORS.white }} >Today's tasks
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        {todos.map((todo) => (
          <TouchableOpacity onPress={() => checkTodo(todo.key)} key={todo.key}>
            <View style={[styles.todo, { borderColor: COLORS.neutral, borderWidth: 0, padding: 13, borderRadius: 10, backgroundColor: COLORS.white, }]}>
              <Ionicons
                name={todo.checked ? 'checkbox-sharp' : 'square-outline'}
                size={24}
              />
              {editingId === todo.key ? (
                <TextInput
                  style={styles.editInput}
                  value={editedText}
                  onChangeText={(text) => setEditedText(text)}
                />
              ) : (
                <Text style={[styles.text, { textDecorationLine: todo.checked ? 'line-through' : 'none' }]}>
                  {todo.text}
                </Text>
              )}
              <View style={{ flex: 1 }} />
              {editingId === todo.key ? (
                <TouchableOpacity onPress={() => saveTodo(todo.key)}>
                  <View style={styles.buttonInner}>
                    <Ionicons
                      name="save-outline"
                      size={24}
                      color={COLORS.neutral}
                      style={styles.editIcon}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => editTodo(todo.key)}>
                  <View style={styles.buttonInner}>
                    <Ionicons
                      name="create-outline"
                      size={24}
                      color={COLORS.neutral}
                      style={styles.editIcon}
                    />
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteTodo(todo.key)}>
                <View style={styles.buttonInner}>
                  <Ionicons 
                    name="trash-outline" 
                    size={24} 
                    color={COLORS.neutral} 
                    style={styles.trashIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task on your list"
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={() => addTodo()}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <View style={styles.addButtonInner}>
            <Ionicons name="add" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
    
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  inputContainer: {
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    fontSize: 15,
    shadowColor: COLORS.neutral,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.neutral,
  },
  addButton: {
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.white,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonInner: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  addButtonInner: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    marginLeft: 15,
    fontSize: 17,
    color: COLORS.neutral,
  },
  
});
