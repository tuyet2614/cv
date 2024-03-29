import React, { useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const tracks = [
    {
        id: 1,
        url: require('../component/images/abideby.mp3'),
        title: 'Blues Beat',
    },
    {
        id: 2,
        url: require('../tracks/tracks_country.mp3'),
        title: 'Blues Beat',
    },
];


const TestMusic = () => {
    const setUpTrackPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(tracks);
            console.log('Tracks added');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        TrackPlayer.updateOptions({
            stopWithApp: false,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
            ],
        });
        setUpTrackPlayer();

        return () => TrackPlayer.reset();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => TrackPlayer.pause()}>
                    <Text style={styles.text}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => { TrackPlayer.play() }}>
                    <Text style={styles.text}>Play</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => TrackPlayer.skipToPrevious()}>
                    <Text style={styles.text}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => TrackPlayer.skipToNext()}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    btn: {
        backgroundColor: '#ff0044',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: 160,
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
});

export default TestMusic;