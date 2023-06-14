import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ScrollView } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import HeaderContent from '../components/header';

const Homee = () => {
  const navigation = useNavigation();
 

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.maquina);

  const fetchData = () => {
    fetch('http://172.26.36.227:3000/')
      .then((res) => res.json())
      .then((results) => {
        dispatch({ type: 'ADD_DATA', payload: results });
        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch((err) => {
        Alert.alert('Something went wrong');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = ({ item }) => {
    return (

        <Card style={styles.card}>
          <Card.Title title={`ID: ${item._id}`} />
          <Card.Content>
            <Text>Nome: {item.nome}</Text>
            <Text>Localização: {item.localizacao}</Text>
          </Card.Content>
        </Card>
     
    );
  };

  return (
    <View style={styles.container}>
      <HeaderContent />
     
      <View style={styles.cardContainer}>
          <FlatList
            data={data}
            renderItem={renderCard}
            keyExtractor={(item) => item._id}
            onRefresh={fetchData}
            refreshing={loading || false}
          />
      </View>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateMachine')}
        theme={{ colors: { accent: '#00BF63' } }}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    marginTop: 130, // Altura do headerContent
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00BF63',
  },
});

export default Homee;