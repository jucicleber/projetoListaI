// components/NovaLista.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NovaListaProps{
    nome: string;
};

export default function NovaLista({nome}: NovaListaProps){
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{nome}</Text>
        </View>
    );
}
    

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    itemText: {
        color: '#000',
    },
});

