// Packages
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Models
import { Product } from '../../../interfaces/product.model';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { rootStackParams } from '../../../types/screens.type';
import { addShoppingBagItem, getOrderFormId, _getNewOrderFormId } from '../../../repositories/cart.repository';

type Props = {
  product: Product;
}

const ProductCard = ({ product }: Props) => {

  const { navigate } = useNavigation<NativeStackNavigationProp<rootStackParams>>();
  const [ofid, setOfid] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const orderFormId = await getOrderFormId();
      if (orderFormId) {
        setOfid(orderFormId);
      }
    };

    fetchData();
  }, []);

  const addItem = async () => {
    if (ofid) {
      await addShoppingBagItem(ofid, product.items[0].itemId, 1)
    }
  }

  return (
    <View style={styles.card}>
      <Image style={styles.img} source={{ uri: product.items[0].images[0].imageUrl }} />
      <Text>{product.productName}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={addItem}
      >
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 0.48,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ccc',
  },

})

export default ProductCard;