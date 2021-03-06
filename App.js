import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase'
import firebaseConfig from './config/firebase/firebaseConfig.json'


firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentWillMount() {

    firebase.auth().onAuthStateChanged((user)=>{
      if(user != null){
        console.log(user)
      }
    })
  }

  signUpUser = (email, password) => {
    try {
      if(this.state.password.length < 6){
        alert("パスワードは6文字以上で登録してください。")
        return
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (e) {
      console.warn(e)
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        alert("ログインしました。")
        console.log(user)
      })
      .catch((e) => {
        alert("ログインできませんでした。EmailまたはPasswordが有効ではありません。")
        console.warn(e)
      })
    }
    catch (e) {
      console.warn(e)
    }
  }

  async loginWithFacebook() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('1256727811162657', { permissions: ['public_profile'] })

    if(type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((e) => {
        console.warn(e)
      })
    }
  }

  getCurrentUser = () => {
    try {
      const user = firebase.auth().currentUser
      console.log(user)
      return(user)
    }
    catch (e) {
      console.warn(e)
    }
  }

  signOut = () => {
    try {
      const user = this.getCurrentUser()
      if(user){
        firebase.auth().signOut()
        .then(() => {
          alert("ログアウトしました。")
          console.log("SignOut")
        })
        .catch((e) => {
          alert("ログアウトできませんでした。")
          console.warn(e)
        })
      }
    }
    catch (e) {
      console.warn(e)
    }
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
                onChangeText={(email)=> this.setState({email})}
              />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password)=> this.setState({password})}
            />
          </Item>

          <Button style={{marginTop: 50}}
            full
            rounded
            success
            onPress={()=> this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{color: 'white'}}>ログイン</Text>
          </Button>

          <Button style={{marginTop: 70}}
            full
            rounded
            primary
            onPress={()=> this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{color: 'white'}}>新規アカウント作成</Text>
          </Button>

          <Button style={{marginTop: 20}}
            full
            rounded
            primary
            onPress={()=> this.loginWithFacebook()}
          >
            <Text style={{color: 'white'}}>Facebookで新規登録</Text>
          </Button>

          <Button style={{marginTop: 20}}
            full
            rounded
            light
            onPress={()=> this.getCurrentUser()}
          >
            <Text>ユーザー情報取得</Text>
          </Button>


          <Button style={{marginTop: 20}}
            full
            rounded
            light
            onPress={()=> this.signOut()}
          >
            <Text>ログアウト</Text>
          </Button>

        </Form>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
})
