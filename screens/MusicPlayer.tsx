import { View, StyleSheet, Dimensions, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import SongInfo from '../components/SongInfo'
import SongSlider from '../components/SongSlider'
import Controls from '../components/Controls'
import TrackPlayer, { Track, useTrackPlayerEvents, Event } from 'react-native-track-player'
import { playListData } from '../constants'
const {width} = Dimensions.get('window')

const MusicPlayer = () => {
    const [trackSong, setTrackSong] = useState<Track | null>()

    useEffect(() => {
      Setup()
    }, [])
    
    async function Setup(){
      const track = await TrackPlayer.getActiveTrack()
      setTrackSong(track)
    }

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        if(event.type === Event.PlaybackActiveTrackChanged){
          setTrackSong(event.track)
        }
    })
    
    const renderArtWork = () => {
        return(
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {trackSong?.artwork && (
                        <Image
                        style={styles.albumArtImg}
                        source={{uri: trackSong?.artwork?.toString()}}
                        />
                    )}
                </View>
            </View>
        )
    }

    if(trackSong !== undefined){
      return (
        <View style={styles.container}>
          <FlatList
            horizontal
            data={playListData}
            renderItem={renderArtWork}
            keyExtractor={song => song.id.toString()}
          />
          <SongInfo track={trackSong}/>
          <SongSlider/>
          <Controls/>
        </View>
      )
  }else{
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white"/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },
    listArtWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumContainer: {
      width: 300,
      height: 300,
    },
    albumArtImg: {
      height: '100%',
      borderRadius: 4,
    },
});
export default MusicPlayer