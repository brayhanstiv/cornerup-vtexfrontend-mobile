import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const PaymentScreen = () => {

  const navigator = useNavigation<any>();

  return <View style={styles.body}>

    <View style={styles.box}>
      <View style={styles.row}>
        <Ionicons
          name="gift-outline"
          size={30}
          color={'black'}
          style={{ marginRight: 10 }}
        />
        <View>
          <Text style={styles.text}>Gift Card</Text>
          <Text style={styles.text}>MPBS-TXTV-UQMF-YJXE</Text>
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.button} onPress={() => navigator.navigate('Order')}>
      <Text style={{ color: '#fff' }}>Continue</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  box: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  },
  text: {
    fontSize: 15
  },
  button: {
    backgroundColor: '#FF1034',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 15
  }
});

export default PaymentScreen;