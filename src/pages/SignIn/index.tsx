import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground
} from "react-native";
import { AuthContext } from "../../context/AuthContext";



export default function SignIn() {
    //const [loadingAuth, setLoadingAuth] = useState(false)
    const { signIn, loadingAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin() {
        if (email === '' || senha === '') {
            return
        }

        await signIn({ usuario: email, senha })

    }

    return (
        <View style={styles.container}>
            {/* <ImageBackground
                source={require('../../../assets/list-de-compras.jpg')}
                style={styles.imageBackground}
            ></ImageBackground> */}
            <View style={styles.textContainer}>
                <Text style={styles.seu}>Lista </Text>
                <Text style={styles.pedido}>Aí</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Digite seu email"
                    style={styles.input}
                    placeholderTextColor="#22272e"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    placeholderTextColor="#22272e"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color="#fff" />
                    ) : (
                        <Text style={styles.buutonText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22272e',
        alignSelf: 'flex-end',
        width: '100%'
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row'
    },
    seu: {
        color: 'white',
        fontSize: 45, // Tamanho do texto, se desejar
        fontFamily: 'Verdana',
        fontWeight: 'bold'
    },
    pedido: {
        color: '#FF3F4B',
        fontSize: 45,// Tamanho do texto, se desejar
        fontFamily: 'Verdana',
        marginBottom: 18,
        fontWeight: 'bold'
    },

    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#ededed',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#22272e'
    },
    button: {
        backgroundColor: '#FF3F4B',
        width: '95%',
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buutonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }

})