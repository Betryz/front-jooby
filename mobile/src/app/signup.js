import {View, StyleSheet, Text, TextInput, Alert} from 'react-native'
import { useState } from "react"
import Button from '../components/Button'
import { useRouter } from 'expo-router'


export default function SignUp(){

    const router = useRouter()

    const [txtName, setTxtName] = useState('')
    const [txtEmail, setTxtEmail] = useState('')
    const [txtAvatar, setTxtAvatar] = useState('')
    const [txtPass, setTxtPass] = useState('')

    const handleCreateAccount = async () => {
        const user = {
            name: txtName,
            email: txtEmail,
            avatar: txtAvatar,
            pass: txtPass,
        }
    
        const response = await fetch('http://localhost:5000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })

        if(response.ok){
            const data = await response.json()
            Alert.alert('Usuário Criado com Sucesso!')
            setTxtName('')
            setTxtEmail('')
            setTxtAvatar('')
            setTxtPass('')
            router.back()
        } else {
            const data = await response.json()
            Alert.alert('Erro ao Criar Usuário')
            console.log(data?.error)
        }
        return
    }

    return( 
        <View style={styles.container}>
          <Text>Name:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtName}
            value={txtName}
            placeholder='Digite seu nome...'
            placeholderTextColor='#555555'
          />
          <Text>Email:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtEmail}
            value={txtEmail}
           
          />
          <Text>Avatar URL:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtAvatar}
            value={txtAvatar}
            keyboardType='url'
          />
          <Text>Senha:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={setTxtPass}
            value={txtPass}
            secureTextEntry={true}
        
          />
        <Button onPress={handleCreateAccount}>Cadastrar</Button>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#ffffd7',
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  color: 'black'
  }
})