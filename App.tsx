import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateWorkout } from './src/generateWorkout';
import type { InspirationKind, WorkoutRoutine } from './src/types';

const ACCENT = '#34d399';
const BG = '#0c1222';
const CARD = '#151d33';
const MUTED = '#94a3b8';
const BORDER = '#273352';

const KINDS: { key: InspirationKind; label: string; hint: string }[] = [
  { key: 'sport', label: 'Sport', hint: 'e.g. basketball, swimming, boxing' },
  { key: 'celebrity', label: 'Celebrity', hint: 'e.g. actor, musician, public figure' },
  { key: 'character', label: 'Fictional character', hint: 'e.g. superhero, anime lead, book hero' },
];

function HomeBody() {
  const insets = useSafeAreaInsets();
  const [kind, setKind] = useState<InspirationKind>('sport');
  const [name, setName] = useState('');
  const [variation, setVariation] = useState(0);
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);

  const hint = useMemo(() => KINDS.find((k) => k.key === kind)?.hint ?? '', [kind]);

  const onGenerate = () => {
    const next = variation + 1;
    setVariation(next);
    setRoutine(generateWorkout(kind, name, next));
  };

  const onNewVariation = () => {
    const next = variation + 1;
    setVariation(next);
    setRoutine(generateWorkout(kind, name, next));
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.kicker}>InspireFit</Text>
          <Text style={styles.title}>Workouts from what motivates you</Text>
          <Text style={styles.lede}>
            Pick a sport, a celebrity, or a fictional character. We’ll shape sets, density, and movement patterns to match that vibe.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Inspiration type</Text>
        <View style={styles.row}>
          {KINDS.map((item) => {
            const active = kind === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setKind(item.key)}
                style={({ pressed }) => [
                  styles.chip,
                  active && styles.chipActive,
                  pressed && styles.chipPressed,
                ]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>Who or what inspires this session?</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={hint}
          placeholderTextColor="#64748b"
          style={styles.input}
          autoCapitalize="words"
          autoCorrect
          returnKeyType="done"
        />

        <Pressable
          onPress={onGenerate}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
        >
          <Text style={styles.primaryBtnText}>Generate routine</Text>
        </Pressable>

        {routine && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTitle}>{routine.headline}</Text>
                <Text style={styles.resultSub}>{routine.subtitle}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaBadge}>{routine.focusLabel}</Text>
              <Text style={styles.metaTime}>~{routine.estimatedMinutes} min</Text>
            </View>

            {routine.sections.map((sec) => (
              <View key={sec.title} style={styles.block}>
                <Text style={styles.blockTitle}>{sec.title}</Text>
                {sec.exercises.map((ex) => (
                  <View key={ex.name + ex.detail} style={styles.exercise}>
                    <Text style={styles.exerciseName}>{ex.name}</Text>
                    <Text style={styles.exerciseDetail}>{ex.detail}</Text>
                  </View>
                ))}
              </View>
            ))}

            <Pressable
              onPress={onNewVariation}
              style={({ pressed }) => [styles.secondaryBtn, pressed && styles.secondaryBtnPressed]}
            >
              <Text style={styles.secondaryBtnText}>Shuffle another variation</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <HomeBody />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: BG },
  safe: { flex: 1, backgroundColor: BG },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  hero: { marginBottom: 24 },
  kicker: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 10,
  },
  lede: {
    color: MUTED,
    fontSize: 16,
    lineHeight: 24,
  },
  sectionLabel: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 22,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
  },
  chipActive: {
    borderColor: ACCENT,
    backgroundColor: '#132a22',
  },
  chipPressed: { opacity: 0.85 },
  chipText: { color: MUTED, fontSize: 14, fontWeight: '600' },
  chipTextActive: { color: ACCENT },
  input: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 18,
  },
  primaryBtn: {
    backgroundColor: ACCENT,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryBtnPressed: { opacity: 0.9 },
  primaryBtnText: { color: '#042f24', fontSize: 17, fontWeight: '800' },
  resultCard: {
    marginTop: 28,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  resultHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  resultTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  resultSub: { color: MUTED, fontSize: 15, lineHeight: 22 },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    marginBottom: 18,
  },
  metaBadge: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    minWidth: 120,
  },
  metaTime: { color: MUTED, fontSize: 13, fontWeight: '600' },
  block: { marginBottom: 18 },
  blockTitle: {
    color: '#e2e8f0',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
    paddingBottom: 8,
  },
  exercise: {
    marginBottom: 14,
    paddingLeft: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#334155',
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  exerciseName: { color: '#f8fafc', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  exerciseDetail: { color: MUTED, fontSize: 14, lineHeight: 20 },
  secondaryBtn: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
  },
  secondaryBtnPressed: { opacity: 0.85 },
  secondaryBtnText: { color: '#e2e8f0', fontSize: 15, fontWeight: '700' },
});
