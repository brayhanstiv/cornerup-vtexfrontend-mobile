// Packages
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

// Componnets
import ProductCard from '../../components/Card/ProductCard';
import { Product } from '../../interfaces/product.model';
import { getOrderFormId } from '../../repositories/cart.repository';
import { getProducts } from '../../repositories/product.repository';

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      await getOrderFormId();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.flexRow}>
      {products.length > 0 ? products.map((item: Product) => (
        <ProductCard key={item.productId} product={item} />
      ))
        : <Text>Loading ...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

export default HomeScreen;