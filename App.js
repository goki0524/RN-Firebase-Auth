import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import * as firebase from 'firebase';
import firebaseConfig from './config/firebase/firebaseConfig.json';

export default class App extends React.Component {
  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
              />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </Item>

          <Button style={{marginTop: 50}}
            full
            rounded
            success
          >
            <Text>ログイン</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});
