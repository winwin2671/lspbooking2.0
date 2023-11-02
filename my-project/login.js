import React from 'react'
import { View, Text, Button } from 'react-native'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://cjvslcpxzkwjnrfvfmdn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdnNsY3B4emt3am5yZnZmbWRuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDgzMjQ1MiwiZXhwIjoyMDEwNDA4NDUyfQ.PJGJyRmABF9ifz4oxp5v-CSonFywIY4mrhcBnznNkjA',
)

function Login({ navigation }) {
  async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <View>
      <Text>Login Page</Text>
      {/* Implement your login UI elements, buttons, and functionality */}
      <Button title="Login with Google" onPress={loginWithGoogle} />
    </View>
  )
}

export default Login
