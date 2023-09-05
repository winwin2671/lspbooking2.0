import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native'
import axios from 'axios'
import { ListItem } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker'

const App = () => {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    try {
      const response = await axios.post('database.db', {
        destination,
        checkIn,
        checkOut,
      })

      setResults(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Picker
        style={styles.input}
        selectedValue={checkOut}
        onValueChange={(itemValue, itemIndex) => setCheckOut(itemValue)}
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
        selectedValue={checkOut}
        onValueChange={(itemValue, itemIndex) => setCheckOut(itemValue)}
      >
        <Picker.Item label="Monday" />
        <Picker.Item label="Tuesday" />
        <Picker.Item label="Wednesday" />
        <Picker.Item label="Thursday" />
        <Picker.Item label="Friday" />
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={checkOut}
        onValueChange={(itemValue, itemIndex) => setCheckOut(itemValue)}
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
        selectedValue={checkOut}
        onValueChange={(itemValue, itemIndex) => setCheckOut(itemValue)}
      >
        <Picker.Item label="Select a Purpose" />
        <Picker.Item label="Meeting" />
        <Picker.Item label="Group Project" />
        <Picker.Item label="Lab Work" />
        <Picker.Item label="Other" />
      </Picker>

      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
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
