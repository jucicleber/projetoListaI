import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ItemLista, { Data } from "../Item-lista";


export default function Lista({nomeLista:string = 'FELADAROSCA'}) {
    const [item, setItem] = useState('');
    const [lista, setLista] = useState<Data[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const newTotal = calcularTotal(lista);
        setTotal(newTotal);
    }, [lista]);

    function handleAdd() {
        if (item.trim() === '') {
            alert('Informe um item para sua lista!');
            return;
        }

        const newItem: Data = {
            key: Date.now(),
            item: item,
            price: 0, // Inicializando preço como 0
            quantidade: 1,
            onIncrementar: function (): void {
                throw new Error("Function not implemented.");
            },
            onDecrementar: function (): void {
                throw new Error("Function not implemented.");
            }
        };

        setLista([...lista, newItem]);
        setItem('');
    }

    function handleDelete(itemKey: number) {
        setLista(lista.filter(item => item.key !== itemKey));
    }

    function handleIncrementar(itemKey: number) {
        const updatedList = lista.map(item => {
            if (item.key === itemKey) {
                return { ...item, quantidade: item.quantidade + 1 };
            }
            return item;
        });
        setLista(updatedList);
    }

    function handleDecrementar(itemKey: number) {
        const updatedList = lista.map(item => {
            if (item.key === itemKey) {
                return { ...item, quantidade: item.quantidade - 1 };
            }
            return item;
        });
        setLista(updatedList);
    }

    function calcularTotal(lista: Data[]) {
        let total = 0;
        lista.forEach(item => {
            total += item.price * item.quantidade;
        });
        return total;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{} </Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do produto'
                    value={item}
                    onChangeText={(text) => setItem(text)}
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <FontAwesome name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={lista}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) => (
                    <ItemLista
                        data={item}
                        deleteItem={() => handleDelete(item.key)}
                        lista={lista}
                        setLista={setLista}
                        onIncrementar={() => handleIncrementar(item.key)}
                        onDecrementar={() => handleDecrementar(item.key)}
                    />
                )}
                style={styles.lista}
            />
            <Text style={styles.total}>Total: R$ <Text>{total.toFixed(2)}</Text></Text>
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
        backgroundColor: '#fff',
        paddingStart: '4%',
        paddingEnd: '4%',
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#fff',
        padding: 8,
        width: '100%',
        marginBottom: 40,
        marginRight: 20 // Ajuste para garantir que o componente tenha 100% de largura
    },
});
