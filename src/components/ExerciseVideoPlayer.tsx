import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getYouTubeAppUrl } from '../exerciseVideos';

const ACCENT = '#34d399';
const BG = '#0c1222';

interface Props {
  videoId: string;
  title: string;
  visible: boolean;
  onClose: () => void;
}

export function ExerciseVideoPlayer({ videoId, title, visible, onClose }: Props) {
  const { width } = useWindowDimensions();
  const playerWidth = width - 32;
  const playerHeight = Math.round((playerWidth * 9) / 16);

  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (visible) {
      setError(false);
      setReady(false);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [visible, videoId]);

  const openInYouTube = useCallback(() => {
    Linking.openURL(getYouTubeAppUrl(videoId));
  }, [videoId]);

  const onPlayerError = useCallback(() => {
    setError(true);
    setPlaying(false);
  }, []);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>

        <View style={[styles.playerWrap, { height: playerHeight }]}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorTitle}>In-app playback unavailable</Text>
              <Text style={styles.errorBody}>
                This tutorial can still be watched in the YouTube app.
              </Text>
              <Pressable onPress={openInYouTube} style={styles.youtubeBtnPrimary}>
                <Text style={styles.youtubeBtnPrimaryText}>Open in YouTube</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {!ready && (
                <View style={styles.loading}>
                  <ActivityIndicator color={ACCENT} size="large" />
                </View>
              )}
              <YoutubePlayer
                key={videoId}
                height={playerHeight}
                width={playerWidth}
                play={playing}
                videoId={videoId}
                onReady={() => setReady(true)}
                onError={onPlayerError}
                initialPlayerParams={{
                  controls: true,
                  preventFullScreen: false,
                  rel: false,
                }}
                webViewProps={{
                  androidLayerType: 'hardware',
                }}
              />
            </>
          )}
        </View>

        {!error && (
          <Text style={styles.hint}>Use the player controls to play, pause, or go fullscreen.</Text>
        )}

        {!error && (
          <Pressable onPress={openInYouTube} style={styles.youtubeBtn}>
            <Text style={styles.youtubeBtnText}>Open in YouTube</Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  title: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: { paddingVertical: 4 },
  closeText: { color: ACCENT, fontSize: 16, fontWeight: '700' },
  playerWrap: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: '#000',
  },
  errorBox: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorBody: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  youtubeBtnPrimary: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: ACCENT,
  },
  youtubeBtnPrimaryText: { color: '#042f24', fontSize: 15, fontWeight: '800' },
  hint: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  youtubeBtn: {
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f4d3d',
    backgroundColor: '#132a22',
  },
  youtubeBtnText: { color: ACCENT, fontSize: 15, fontWeight: '700' },
});
