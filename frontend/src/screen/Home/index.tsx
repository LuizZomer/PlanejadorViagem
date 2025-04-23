import React from 'react'
import { View } from 'react-native'
import { authStore } from '../../shared/stores/auth/authStore'
import { Text } from '@rneui/base'

export const Home = () => {
    const user = authStore((store) => store.user)
  return (
    <View><Text>{user?.username}</Text></View>
  )
}
