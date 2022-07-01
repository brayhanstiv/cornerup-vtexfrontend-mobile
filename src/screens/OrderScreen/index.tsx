import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const OrderScreen = () => {

  const navigator = useNavigation<any>();

  const data = {
    address: 'Cra 31 # 18 E 34',
    location: 'Neiva - Huila',
    deliveringTo: 'Delivering To',
    instructions: 'Delivery Instructions',
    descripction: 'Yeah do leave at the reception if I am not around',
    contact: 'Delivery Contact',
    payment: 'Payment Method',
    name: 'Julia Roberts',
    phone: '+1 2345 5454',
    giftcard: 'Gift Card',
    code: 'MPBS-TXTV-UQMF-YJXE'
  }

  return <View style={styles.body}>
    <Text style={styles.heading}>{data.deliveringTo}</Text>
    <View style={[styles.box, styles.address, styles.row]}>
      <Ionicons
        name="location-outline"
        size={30}
        color={'black'}
        style={{ marginRight: 10 }}
      />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data.address}</Text>
        <Text style={{ fontWeight: "normal", fontSize: 16 }}>{data.location}</Text>
      </View>
    </View>
    <Text style={styles.heading}>{data.instructions}</Text>
    <View style={[styles.box, styles.delivery]}>
      <Text>{data.descripction}</Text>
    </View>
    <Text style={styles.heading}>{data.contact}</Text>
    <View style={[styles.box, styles.personal]}>
      <Text>{data.name}</Text>
    </View>
    <View style={[styles.box, styles.personal]}>
      <Text>{data.phone}</Text>
    </View>
    <Text style={styles.heading}>{data.payment}</Text>
    <View style={[styles.box, styles.personal]}>
      <View>
        <Text>{data.giftcard}</Text>
        <Text>{data.code}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.button} onPress={() => navigator.navigate('Home')}>
      <Text style={{ color: '#fff' }}>Place Order</Text>
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
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 20,
  },
  address: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  delivery: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  personal: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF1034',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 15
  }
})

export default OrderScreen;