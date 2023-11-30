import React, { useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Appbar, List, IconButton, Checkbox } from "react-native-paper";
import { ListaCompraContext } from "../contexts/ListaDeCompraContext";

const Feira = ({ navigation }) => {
  const { itensDaFeira, excluirItem, marcarConcluido } = useContext(ListaCompraContext);

  const remover = (id) => {
    excluirItem(id);
  };

  const handleCheckboxToggle = (id, concluido) => {
    marcarConcluido(id, !concluido);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.navigate("NovaHome")} />
        <Appbar.Content title="Lista da Feira" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        {itensDaFeira.map((item) => (
          <List.Item
            key={item.id}
            title={item.produto}
            description={`Quantidade: ${item.quantidade}`}
            right={() => (
              <View style={styles.buttonsContainer}>
                <Checkbox
                  status={item.concluido ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckboxToggle(item.id, item.concluido)}
                />
                <IconButton
                  icon="delete"
                  color="red"
                  onPress={() => remover(item.id)}
                />
              </View>
            )}
            onPress={() => handleCheckboxToggle(item.id, item.concluido)}
            style={styles.listItem}
          />
        ))}
        <IconButton
          icon="plus"
          style={styles.btnFab}
          onPress={() => navigation.navigate("AdicionarFeira")}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnFab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
  listItem: {
    paddingVertical: 10,
  },
});

export default Feira;
