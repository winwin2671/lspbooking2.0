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
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cjvslcpxzkwjnrfvfmdn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdnNsY3B4emt3am5yZnZmbWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4MzI0NTIsImV4cCI6MjAxMDQwODQ1Mn0._zfFCngW8vJytf3n6NyV2NcWpUQ5egDmNSr1cOQd4sg',
)

const App = () => {
  const [Floor, setFloor] = useState('')
  const [selectedDate, setselectedDate] = useState('')
  const [Period, setPeriod] = useState('')
  const [purpose, setPurpose] = useState('')
  const [results, setResults] = useState([])
  const [roomdb, setRoom] = useState([])

  const handleSearch = async () => {
    // Construct the query based on selected criteria
    const query = supabase.from('roomdb').select('room').eq('floor', Floor) // Filter by selected floor
    console.log('pressed')
    try {
      // Execute the query
      const { data } = await query

      console.log('Results:', data)
      // Update the results state with the filtered room data
      setResults(data)
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error('Error searching for rooms:', error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Picker
          style={styles.input}
          selectedValue={Floor}
          onValueChange={(itemValue, itemIndex) => {
            // itemValue: the selected value (e.g., '1' for 'Floor 1')
            // itemIndex: the index of the selected item (0 for the first item, 1 for the second, and so on)
            console.log(`Selected value: ${itemValue}`)
            console.log(`Selected index: ${itemIndex}`)
            setFloor(itemValue)
          }}
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

        {results.length === 0 ? (
          <Text>No results found</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => (item ? item.room.toString() : '')}
            renderItem={({ item }) => (
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    {item ? item.room : 'No data'}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
          />
        )}
      </View>
      <Text>LSP room finder</Text>
    </SafeAreaView>
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
