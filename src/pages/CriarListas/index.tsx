import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import NovaLista from "../../components/nova-lista";
import { StackParamsList } from "../../routes/app.routes"; // Import StackParamsList

export default function CriarListas() {
    const [nomeLista, setNomeLista] = useState('');
    const [listaNovaLista, setListaNovaLista] = useState<string[]>([]);
    const navigation = useNavigation<NavigationProp<StackParamsList>>(); 

    function handlerAdicionarNovaLista() {
        if (nomeLista.trim() === '') {
            Alert.alert('Erro', 'O nome da lista não pode estar vazio!');
            return;
        }
        setListaNovaLista([...listaNovaLista, nomeLista]);
        setNomeLista('');
        Alert.alert('Sucesso', 'Lista adicionada com sucesso!');
    }

    function handlePressItem(nomeDaLista:string) {
        navigation.navigate('Dashboard'); 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar nova lista</Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome da lista'
                    value={nomeLista}
                    onChangeText={(text) => setNomeLista(text)}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={handlerAdicionarNovaLista}>
                    <FontAwesome name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={listaNovaLista}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePressItem(item)}>
                        <NovaLista nome={item} />
                    </TouchableOpacity>
                )}
                style={styles.lista}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#22272e',
        paddingTop: 28,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
        marginTop: '5%',
        padding: '5%',
        marginBottom: 12,
    },
    containerInput: {
        flexDirection: 'row',
        padding: '5%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 22,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        height: 44,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginRight: 8,
    },
    buttonAdd: {
        width: 50,
        height: 44,
        backgroundColor: '#73f7ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    lista: {
        paddingHorizontal: '5%',
    },
});
