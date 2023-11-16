import React, { useState, useEffect } from 'react'
import { View, Text, Button, SafeAreaView, StyleSheet } from 'react-native'
import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(
//   'https://cjvslcpxzkwjnrfvfmdn.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdnNsY3B4emt3am5yZnZmbWRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDgzMjQ1MiwiZXhwIjoyMDEwNDA4NDUyfQ.PJGJyRmABF9ifz4oxp5v-CSonFywIY4mrhcBnznNkjA',
// )

function Login({ navigation }) {
  async function loginWithGoogle() {
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    // })

    // //error here
    // if (!error) {
    //   navigation.navigate('Find Your Room')
    // }
    navigation.navigate('Find Your Room')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Sign in with Google" onPress={loginWithGoogle} />
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
})

export default Login
