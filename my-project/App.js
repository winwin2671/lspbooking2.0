import React, { useState, useEffect } from 'react'
import { View, Button, FlatList, Text, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker'
import SQLite from 'react-native-sqlite-storage'

const App = () => {
  const db = SQLite.openDatabase(
    {
      name: 'database.db',
      location: 'default',
    },
    () => {
      // Database opened successfully
      console.log('Database opened ')
    },
    (error) => {
      console.error('Error opening database:', error)
    },
  )

  const [Floor, setFloor] = useState('')
  const [Date, setDate] = useState('')
  const [Period, setPeriod] = useState('')
  const [purpose, setPurpose] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = () => {
    // Construct the SQL query based on the selected values
    const query = `
      SELECT room
      FROM freeclass
      WHERE floor = ? AND date = ? AND period = ? 
    `

    // Execute the query with parameters
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [Floor, Date, Period],
        (tx, results) => {
          // Extract and set the results to the component's state
          const rows = results.rows
          const data = []
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i))
          }
          setResults(data)
        },
        (error) => {
          console.error('Error querying database:', error)
        },
      )
    })
  }

  return (
    <View style={styles.container}>
      <Picker
        style={styles.input}
        selectedValue={Floor}
        onValueChange={(itemValue, itemIndex) => setFloor(itemValue)}
      >
        <Picker.Item label="Floor" />
        <Picker.Item label="Floor 1" />
        <Picker.Item label="Floor 2" />
        <Picker.Item label="Floor 3" />
        <Picker.Item label="Floor 4" />
        <Picker.Item label="Floor 5" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={Date}
        onValueChange={(itemValue, itemIndex) => setDate(itemValue)}
      >
        <Picker.Item label="Monday" />
        <Picker.Item label="Tuesday" />
        <Picker.Item label="Wednesday" />
        <Picker.Item label="Thursday" />
        <Picker.Item label="Friday" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={Period}
        onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}
      >
        <Picker.Item label="Period" />
        <Picker.Item label="Period 1" />
        <Picker.Item label="Period 2" />
        <Picker.Item label="Period 3" />
        <Picker.Item label="Period 4" />
        <Picker.Item label="Period 5" />
        <Picker.Item label="Period 6" />
        <Picker.Item label="Period 7" />
        <Picker.Item label="Period 8" />
        <Picker.Item label="Period 9" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={purpose}
        onValueChange={(itemValue, itemIndex) => setPurpose(itemValue)}
      >
        <Picker.Item label="Select your Purpose" />
        <Picker.Item label="Meeting" />
        <Picker.Item label="Group work" />
        <Picker.Item label="Lab" />
        <Picker.Item label="Music" />
        <Picker.Item label="Other" />
      </Picker>

      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.room.toString()} // Ensure 'room' is unique
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.room}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
})

export default App
