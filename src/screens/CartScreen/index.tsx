import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ProductShopping } from '../../interfaces/orderForm.model';
import { applyCoupon, getOrderForm, getOrderFormId, removeShoppingBagItem } from '../../repositories/cart.repository';

const CartScreen = () => {

  const [ofid, setOfid] = useState<string>();
  const [products, setProducts] = useState<ProductShopping[]>();
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const ofid = await getOrderFormId();
      if (ofid) {
        setOfid(ofid);
        const data = await getOrderForm(ofid);
        setProducts(data?.items)
      }
    };
    fetchData();
  }, [products]);

  const removeItem = async (index: number) => {
    if (ofid) {
      await removeShoppingBagItem(ofid, index);
    }
  }

  const applyCode = async (code: string) => {
    if (ofid) {
      await applyCoupon(ofid, code);
      const data = await getOrderForm(ofid);
      setProducts(data?.items);
    }
  }

  return (
    <View style={styles.flexColumn}>
      {products != null ? products.map((item: ProductShopping, index) => (
        <View key={item.skuId} style={styles.container}>
          <Image style={styles.img} source={{ uri: item.imageUrl }} />
          <View >
            <Text>{item.name}</Text>
            <View style={styles.alignHorizontal}>
              <Text style={styles.price}>{item.price / 100}</Text>
              <Text style={styles.sellingPrice}>{item.sellingPrice / 100}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeItem(index)}
            >
              <Text>Remove from Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))
        : <Text>Loading ...</Text>
      }
      <View style={styles.alignHorizontal}>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={(value) => setCode(value)}
          placeholder="Type Code"
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => applyCode(code)}
        >
          <Text>Apply code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  input: {
    flex: 3,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  img: {
    width: 100,
    height: 100
  },
  alignHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 25,
    fontWeight: 'normal',
    color: '#000',
  },
  sellingPrice: {
    fontSize: 15,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  button: {
    backgroundColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5
  }
})

export default CartScreen;