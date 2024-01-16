import { View, StyleSheet, Pressable, Image, Text } from 'react-native'
import React from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import PreviousIcon from '../assets/Previous.png'
import NextIcon from '../assets/Next.png'
import PauseIcon from '../assets/Pause.png'
import PlayIcon from '../assets/Play.png'

export default function Controls() {
    const playBackState = usePlaybackState()

    const skipToNext = async()=>{ await TrackPlayer.skipToNext() }

    const skipToPrevious = async()=>{ await TrackPlayer.skipToPrevious() }
    
    const togglePlayback = async (playback: State) => {
        const currentTrack = await TrackPlayer.getActiveTrack()
        if(currentTrack !== null){
            if(playback === State.Paused || playback === State.Ready){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }
    }
    
  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Image source={PreviousIcon} style={styles.image}/>
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState)}>
        <Image source={playBackState === State.Playing ? PlayIcon : PauseIcon} style={styles.image}/>
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Image source={NextIcon} style={styles.image}/>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    image: {
      width: 40,
      height: 40,
     
      fontSize: 30,
      fontWeight:'bold'
    },
    playButton: {
      marginHorizontal: 24,
    },
  });