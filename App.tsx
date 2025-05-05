import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatlog] = useState<String[]>([]);

  const handleSend = () => {
    if (message.trim() === '') return;

    const updateLog = [...chatLog, `Jag: ${message}`];
    setChatlog(updateLog);
    setMessage('');

    setTimeout(() => {
      let botResponse = '';

      const lower = message.toLowerCase();

      if(lower.includes('klippa') || lower.includes('frisör')) {
        botResponse = `Petra: Här är några frisörer i Ängelholm du kan ringa: \n
        -G:son & Co: 070-7716054\n
        -Saras Hårstudio: 0431-10700\n
        -Studio Stil: 0431-410301`;
      } else if (
        lower.includes('sjuksköterska') ||
        lower.includes('ssk') ||
        lower.includes('medicin') 
      ) {
        botResponse = 'Petra: Du kan ringa eller skicka sms till sjuksköterskan på nummer 070-123456 eller skriva mail till: ssk@engelholmse';
      } else {
        botResponse = `Petra: Prova söka igen så jag kan hjälpa dig`;
      }
      setChatlog(prevLog => [...prevLog, botResponse]);
    }, 1000);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.chatArea}>
        {chatLog.map((msg, index) => (
          <Text key={index} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
        style={styles.input}
        placeholder="Tryck här för att skriva ett meddelande..."
        placeholderTextColor="#333"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Skicka" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#d0e8d0',
  },
  chatArea: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 10,
    color: '#333'
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fef5e7',
    borderRadius: 6,
    padding: 10,
    color: '#eee',
  },
});


