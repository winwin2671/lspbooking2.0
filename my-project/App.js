import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native'
import { ListItem } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker'
import SQLite from 'react-native-sqlite-storage'

// const db = SQLite.openDatabase(
//   {
//     name: 'database',
//     location: 'default',
//   },
//   () => {
//     // Database opened successfully
//     console.log('Database opened ')
//   },
//   // (error) => {
//   //   console.error('Error opening database:', error)
//   // },
// )

const App = () => {
  //bug here

  const [Floor, setFloor] = useState('')
  const [selectedDate, setselectedDate] = useState('')
  const [Period, setPeriod] = useState('')
  const [purpose, setPurpose] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = () => {
    // Construct the SQL query based on the selected values
    const query = `
      SELECT room
      FROM freeclass
      WHERE floor = ?
    `

    // Execute the query with parameters
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [Floor],
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
        <Picker.Item label="Floor 1" value="1" />
        <Picker.Item label="Floor 2" value="2" />
        <Picker.Item label="Floor 3" value="3" />
        <Picker.Item label="Floor 4" value="4" />
        <Picker.Item label="Floor 5" value="5" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={selectedDate}
        onValueChange={(itemValue, itemIndex) => setselectedDate(itemValue)}
      >
        <Picker.Item label="Day" />
        <Picker.Item label="Monday" value="Mon" />
        <Picker.Item label="Tuesday" value="Tue" />
        <Picker.Item label="Wednesday" value="Wen" />
        <Picker.Item label="Thursday" value="Thu" />
        <Picker.Item label="Friday" value="Fri" />
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={Period}
        onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}
      >
        <Picker.Item label="Period" />
        <Picker.Item label="Period 1" value="1" />
        <Picker.Item label="Period 2" value="2" />
        <Picker.Item label="Period 3" value="3" />
        <Picker.Item label="Period 4" value="4" />
        <Picker.Item label="Period 5" value="5" />
        <Picker.Item label="Period 6" value="6" />
        <Picker.Item label="Period 7" value="7" />
        <Picker.Item label="Period 8" value="8" />
        <Picker.Item label="Period 9" value="9" />
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
        keyExtractor={(item) => (item ? item.room.toString() : '')} // Ensure 'room' is unique
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item ? item.room : 'No data'}</ListItem.Title>
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
