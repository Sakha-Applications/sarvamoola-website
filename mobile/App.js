import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CONTACT_EMAIL, content } from './src/content';
import { colors, fonts } from './src/theme';

function Button({ label, onPress, bg, fg, border }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: pressed ? 'transparent' : bg, borderColor: border },
      ]}
    >
      {({ pressed }) => (
        <Text style={[styles.btnText, { color: pressed ? border : fg }]}>{label}</Text>
      )}
    </Pressable>
  );
}

export default function App() {
  const scrollRef = useRef(null);
  const offsets = useRef({});
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const mark = (key) => (e) => {
    offsets.current[key] = e.nativeEvent.layout.y;
  };
  const goTo = (key) => {
    scrollRef.current?.scrollTo({ y: offsets.current[key] ?? 0, animated: true });
  };

  const openInitiative = (item) => {
    if (!item.url) {
      Alert.alert(item.name, 'The link for this initiative has not been added yet.');
      return;
    }
    Linking.openURL(item.url).catch(() =>
      Alert.alert('Could not open link', 'Please try again later.')
    );
  };

  const sendEmail = async () => {
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Missing details', 'Please fill in your name, email and message.');
      return;
    }
    const subject = `Message from ${name.trim()} via the Sarvamoola app`;
    const body = `${message.trim()}\n\n${name.trim()}\n${email.trim()}`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('No email app found', `Please write to ${CONTACT_EMAIL} directly.`);
    }
  };

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.paper} />
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand} accessibilityRole="header">Sarvamoola</Text>
          <View style={styles.nav}>
            <Pressable onPress={() => goTo('what')} hitSlop={8}><Text style={styles.navLink}>About</Text></Pressable>
            <Pressable onPress={() => goTo('initiatives')} hitSlop={8}><Text style={styles.navLink}>Initiatives</Text></Pressable>
            <Pressable onPress={() => goTo('contact')} hitSlop={8}><Text style={styles.navLink}>Contact</Text></Pressable>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Hero */}
            <View style={styles.hero}>
              <Text style={styles.h1}>Sarvamoola{'\n'}Foundation</Text>
              <Text style={styles.lede}>{content.lede}</Text>
            </View>

            {/* What we do */}
            <View style={styles.what} onLayout={mark('what')}>
              <Text style={styles.h2}>What we do</Text>
              {content.whatWeDo.map((p, i) => (
                <Text key={i} style={styles.body}>{p}</Text>
              ))}
            </View>

            {/* Initiatives */}
            <View style={styles.initiatives} onLayout={mark('initiatives')}>
              <Text style={[styles.h2, { color: colors.onTeal }]}>Our initiatives</Text>
              <Text style={styles.initIntro}>Two initiatives grow from the same root.</Text>
              {content.initiatives.map((item) => (
                <View key={item.key} style={[styles.panel, { borderTopColor: item.accent }]}>
                  <Text style={styles.h3}>{item.name}</Text>
                  <Text style={styles.panelText}>{item.intro}</Text>
                  <Button
                    label={`Visit ${item.name}`}
                    onPress={() => openInitiative(item)}
                    bg={item.accent}
                    fg={colors.teal}
                    border={item.accent}
                  />
                </View>
              ))}
            </View>

            {/* Contact */}
            <View style={styles.contact} onLayout={mark('contact')}>
              <Text style={styles.h2}>Contact us</Text>
              <Text style={styles.body}>
                Questions, ideas or want to work with us? Write to{' '}
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}`)}
                >
                  {CONTACT_EMAIL}
                </Text>
                .
              </Text>

              <Text style={styles.label}>Your name</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={set('name')}
                autoComplete="name"
                textContentType="name"
              />
              <Text style={styles.label}>Your email</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={set('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                value={form.message}
                onChangeText={set('message')}
                multiline
                textAlignVertical="top"
              />
              <Button
                label="Send email"
                onPress={sendEmail}
                bg={colors.teal}
                fg="#ffffff"
                border={colors.teal}
              />
              <Text style={styles.note}>This opens your email app with the message ready to send.</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>© {new Date().getFullYear()} Sarvamoola Foundation</Text>
              <Text style={styles.footerText}>{CONTACT_EMAIL}</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const pad = 22;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: colors.paper },
  scrollContent: { backgroundColor: colors.paper },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: pad,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  brand: { fontFamily: fonts.display, fontSize: 20, color: colors.ink },
  nav: { flexDirection: 'row', gap: 16 },
  navLink: { fontSize: 14, fontWeight: '500', color: colors.ink },

  hero: { paddingHorizontal: pad, paddingTop: 56, paddingBottom: 44 },
  h1: { fontFamily: fonts.display, fontSize: 46, lineHeight: 50, color: colors.teal, letterSpacing: -0.5 },
  lede: { marginTop: 20, fontSize: 18, lineHeight: 27, color: colors.muted },

  what: {
    paddingHorizontal: pad,
    paddingVertical: 40,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  h2: { fontFamily: fonts.display, fontSize: 30, lineHeight: 34, color: colors.ink, marginBottom: 14 },
  h3: { fontFamily: fonts.display, fontSize: 26, color: colors.onTeal },
  body: { fontSize: 16.5, lineHeight: 26, color: colors.ink, marginBottom: 12 },

  initiatives: { backgroundColor: colors.teal, paddingHorizontal: pad, paddingVertical: 44 },
  initIntro: { fontSize: 16, color: colors.onTealMuted, marginBottom: 28 },
  panel: { borderTopWidth: 2, paddingTop: 20, marginBottom: 34, alignItems: 'flex-start' },
  panelText: { fontSize: 16, lineHeight: 25, color: colors.onTealMuted, marginTop: 10, marginBottom: 0 },

  contact: { paddingHorizontal: pad, paddingVertical: 44 },
  link: { fontWeight: '700', textDecorationLine: 'underline', color: colors.ink },
  label: { fontSize: 15, fontWeight: '500', color: colors.ink, marginTop: 14, marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#9fb0a8',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 16,
    color: colors.ink,
  },
  textarea: { minHeight: 120 },
  note: { marginTop: 12, fontSize: 13.5, color: colors.muted },

  btn: {
    borderWidth: 2,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  btnText: { fontSize: 16, fontWeight: '600' },

  footer: {
    paddingHorizontal: pad,
    paddingVertical: 22,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    gap: 4,
  },
  footerText: { fontSize: 13.5, color: colors.muted },
});
