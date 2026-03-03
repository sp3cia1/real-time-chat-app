import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../../utils";

export function AuthScreen() {
  const [sentEmail, setSentEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Screen</Text>

      {!sentEmail ? (
        <EmailStep onSendEmail={setSentEmail} />
      ) : (
        <CodeStep sentEmail={sentEmail} />
      )}
    </View>
  );
}

interface EmailStepProps {
  onSendEmail: React.Dispatch<React.SetStateAction<string>>;
}
function EmailStep({ onSendEmail }: EmailStepProps) {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (!email) {
      alert("pleaes enter an email");
    }

    onSendEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
      onSendEmail("");
    });
  }

  return (
    <>
      <TextInput
        placeholder="Enter your email!!!"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Button title="Send Email" onPress={handleSubmit} />
      <Button
        onPress={() => db.auth.signInAsGuest()}
        title="Sign in as Guest"
      />
    </>
  );
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
  const [code, setCode] = useState("");

  function handleSubmitCode() {
    if (!code) {
      alert("No code provided!!!");
    }

    db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
    });
  }
  return (
    <>
      <Text>Enter the code we sent you</Text>
      <TextInput
        placeholder="Enter your code!!!"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setCode}
        value={code}
      />
      <Button title="Confirm code" onPress={handleSubmitCode} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {},
  input: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
