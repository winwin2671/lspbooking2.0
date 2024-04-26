import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cjvslcpxzkwjnrfvfmdn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdnNsY3B4emt3am5yZnZmbWRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDgzMjQ1MiwiZXhwIjoyMDEwNDA4NDUyfQ.PJGJyRmABF9ifz4oxp5v-CSonFywIY4mrhcBnznNkjA',
)

// const [text, onChangeText] = React.useState('')

function Login({ navigation }) {
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',

      options: {
        emailRedirectTo: navigation.navigate('Find Your Room'),
      },
    })
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Sign Up with Email" onPress={signUpNewUser} />
        <hr></hr>
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        /> */}
        <Button title="Login with Email" onPress={signInWithEmail} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default Login
