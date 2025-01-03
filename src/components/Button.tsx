import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

//type ButtonProps = TouchableOpacityProps; //usamos quando queremos pegar tudo da interface, se quisermos adicionar um atributo usamos o de baixo:

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({title, ...rest} : ButtonProps){
  return (
    <TouchableOpacity 
    style={styles.button} 
    activeOpacity={.7} 
    {...rest}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A370F7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
})