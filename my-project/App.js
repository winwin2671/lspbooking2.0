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

const App = () => {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://your_backend_server_ip:3000/search',
        {
          destination,
          checkIn,
          checkOut,
        },
      )

      setResults(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Check-in date"
        value={checkIn}
        onChangeText={setCheckIn}
      />
      <TextInput
        style={styles.input}
        placeholder="Check-out date"
        value={checkOut}
        onChangeText={setCheckOut}
      />
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
