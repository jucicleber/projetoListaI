import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text'; // Importando o componente TextInputMask

export interface Data {
  key: number,
  item: string,
  price: number,
  quantidade: number,
  onIncrementar: () => void,
  onDecrementar: () => void
}

export default function ItemLista({ data, deleteItem, lista, setLista, onIncrementar, onDecrementar }: {
  data: Data,
  deleteItem: () => void,
  lista: Data[],
  setLista: React.Dispatch<React.SetStateAction<Data[]>>,
  onIncrementar: () => void,
  onDecrementar: () => void
}) {
  const [checked, setChecked] = useState(false);
  const [price, setPrice] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const handleDeleteItem = () => {
    const updatedList = lista.filter(item => item.key !== data.key);
    setLista(updatedList);
  };


  const handleIncrement = () => {
    onIncrementar();
    setQuantidade(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantidade > 1) {
      onDecrementar();
      setQuantidade(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
        <FontAwesome name="trash" size={25} color="#22272e" />
      </TouchableOpacity>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text, checked && styles.textChecked]}>{data.item}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
          <FontAwesome name="minus" size={15} color="#22272e" />
        </TouchableOpacity>
        <Text style={styles.quantityInput}>{quantidade.toString()}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
          <FontAwesome name="plus" size={15} color="#22272e" />
        </TouchableOpacity>
      </View>
      <TextInputMask
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$',
          suffixUnit: ''
        }}
        value={(parseFloat(price.replace('R$', '').replace(',', '.')) ).toFixed(2)} //* quantidade Multiplica o preço pela quantidade
        onChangeText={(text) => setPrice(text)}
        onBlur={() => {
          const newPrice = parseFloat(price.replace('R$', '').replace(',', '.'));
          const updatedList = lista.map(item => {
            if (item.key === data.key) {
              return { ...item, price: newPrice };
            }
            return item;
          });
          setLista(updatedList);
        }}
      />
      <CheckBox
        style={styles.checkbox}
        checked={checked}
        onPress={() => setChecked(!checked)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(196,196,196,0.20)',
    marginTop: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    paddingLeft: '5%',
    paddingRight: '2%'
  },
  checkbox: {
    paddingLeft: '5%',
    paddingRight: '2%'
  },
  text: {
    flex: 1,
    marginLeft: 12,
    textAlign: 'left'
  },
  textChecked: {
    textDecorationLine: 'line-through',
  },
  input: {
    width: 70,
    backgroundColor: '#fff',
    height: 21,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginLeft: 6,
    fontSize: 12
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityButton: {
    width: 20,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginLeft: 4,
  },
  quantityInput: {
    width: 30,
    backgroundColor: '#fff',
    height: 21,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginLeft: 4,
    textAlign: 'center'
  }
});
