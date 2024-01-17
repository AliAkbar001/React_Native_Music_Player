import { View, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import TrackPlayer, { usePlaybackState } from 'react-native-track-player'
import PreviousIcon from '../assets/Previous.png'
import NextIcon from '../assets/Next.png'
import PauseIcon from '../assets/Pause.png'
import PlayIcon from '../assets/Play.png'

export default function Controls() {
    const playBackState = usePlaybackState()

    const skipToNext = async()=>{ await TrackPlayer.skipToNext() }

    const skipToPrevious = async()=>{ await TrackPlayer.skipToPrevious() }
    
    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex()
        if(currentTrack !== null){
             if(playBackState.state === 'playing'){
                await TrackPlayer.pause()
            }else{ 
                await TrackPlayer.play()
            }
        }
    }
    
  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Image source={PreviousIcon} style={styles.image}/>
      </Pressable>
      <Pressable onPress={togglePlayback}>
        <Image source={playBackState.state === 'playing' ? PauseIcon : PlayIcon} style={styles.image}/>
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
    justifyContent: 'center'
  },
  image: {
    width: 50,
    height: 50,
    margin: 10
  },
  playButton: {
    marginHorizontal: 24,
  },
});