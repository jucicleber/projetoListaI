import React, { useContext, useState } from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { AuthContext } from "../../context/AuthContext";
import Lista from "../../components/lista";

export default function Dashboard() {
    //const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    //const { signOut } = useContext(AuthContext)

    return (
        //<SafeAreaView style={styles.container}>
        <Lista nomeLista=""/>
        //</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    inputNumeroMesa: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'
    },

    inputNomeCliente: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        marginBottom: 18
    },

    button: {
        marginVertical: 12,
        width: '90%',
        backgroundColor: '#3fffa3',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#101026'
    }
})