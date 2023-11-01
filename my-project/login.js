import React from 'react'
import { View, Text, Button } from 'react-native'
import { SupabaseClient } from '@supabase/supabase-js' // Import your SupabaseClient

function Login({ navigation }) {
  async function loginWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <View>
      <Text>Login Page</Text>

      <Button title="Login with Google" onPress={loginWithGoogle} />
    </View>
  )
}

export default Login
