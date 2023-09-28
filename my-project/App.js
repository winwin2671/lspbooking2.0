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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdnNsY3B4emt3am5yZnZmbWRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDgzMjQ1MiwiZXhwIjoyMDEwNDA4NDUyfQ.PJGJyRmABF9ifz4oxp5v-CSonFywIY4mrhcBnznNkjA',
)

const App = () => {
  const [Floor, setFloor] = useState('')
  const [selectedDate, setselectedDate] = useState('')
  const [Period, setPeriod] = useState('')
  const [purpose, setPurpose] = useState('')
  const [results, setResults] = useState([])
  const [roomdb, setRoom] = useState([])

  const handleSearch = async () => {
    const dateperiod = selectedDate + Period

    // Initialize an object to store filter values for each day
    const dayFilters = {
      Mon1: '',
      Mon2: '',
      Mon3: '',
      Mon4: '',
      Mon5: '',
      Mon6: '',
      Mon7: '',
      Mon8: '',
      Mon9: '',
      Tue1: '',
      Tue2: '',
      Tue3: '',
      Tue4: '',
      Tue5: '',
      Tue6: '',
      Tue7: '',
      Tue8: '',
      Tue9: '',
      Wed1: '',
      Wed2: '',
      Wed3: '',
      Wed4: '',
      Wed5: '',
      Wed6: '',
      Wed7: '',
      Wed8: '',
      Wed9: '',
      Thu1: '',
      Thu2: '',
      Thu3: '',
      Thu4: '',
      Thu5: '',
      Thu6: '',
      Thu7: '',
      Thu8: '',
      Thu9: '',
      Fri1: '',
      Fri2: '',
      Fri3: '',
      Fri4: '',
      Fri5: '',
      Fri6: '',
      Fri7: '',
      Fri8: '',
      Fri9: '',
    }

    // Set the filter value based on dateperiod
    if (
      dateperiod === 'Mon1' ||
      dateperiod === 'Mon2' ||
      dateperiod === 'Mon3' ||
      dateperiod === 'Mon4' ||
      dateperiod === 'Mon5' ||
      dateperiod === 'Mon6' ||
      dateperiod === 'Mon7' ||
      dateperiod === 'Mon8' ||
      dateperiod === 'Mon9' ||
      dateperiod === 'Tue1' ||
      dateperiod === 'Tue2' ||
      dateperiod === 'Tue3' ||
      dateperiod === 'Tue4' ||
      dateperiod === 'Tue5' ||
      dateperiod === 'Tue6' ||
      dateperiod === 'Tue7' ||
      dateperiod === 'Tue8' ||
      dateperiod === 'Tue9' ||
      dateperiod === 'Wed1' ||
      dateperiod === 'Wed2' ||
      dateperiod === 'Wed3' ||
      dateperiod === 'Wed4' ||
      dateperiod === 'Wed5' ||
      dateperiod === 'Wed6' ||
      dateperiod === 'Wed7' ||
      dateperiod === 'Wed8' ||
      dateperiod === 'Wed9' ||
      dateperiod === 'Thu1' ||
      dateperiod === 'Thu2' ||
      dateperiod === 'Thu3' ||
      dateperiod === 'Thu4' ||
      dateperiod === 'Thu5' ||
      dateperiod === 'Thu6' ||
      dateperiod === 'Thu7' ||
      dateperiod === 'Thu8' ||
      dateperiod === 'Thu9' ||
      dateperiod === 'Fri1' ||
      dateperiod === 'Fri2' ||
      dateperiod === 'Fri3' ||
      dateperiod === 'Fri4' ||
      dateperiod === 'Fri5' ||
      dateperiod === 'Fri6' ||
      dateperiod === 'Fri7' ||
      dateperiod === 'Fri8' ||
      dateperiod === 'Fri9'
    ) {
      dayFilters[dateperiod] = 'F'
    }

    // Construct the query based on selected criteria
    let query = supabase.from('roomdb').select('room')

    // Check if a floor value is selected, and include it in the filter if it is
    if (Floor) {
      query = query.eq('floor', Floor)
    }

    // Add the combined value filters for all days
    for (const day in dayFilters) {
      if (dayFilters[day]) {
        query = query.eq(day, dayFilters[day])
      }
    }

    console.log('pressed')
    console.log(query)
    try {
      // Execute the query
      const { data } = await query
      console.log('floor:', Floor)
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
          onValueChange={(itemValue) => setselectedDate(itemValue)}
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
          onValueChange={(itemValue) => setPeriod(itemValue)}
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
      <Text>----LSP room finder----</Text>
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
