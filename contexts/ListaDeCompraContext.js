import React, { createContext, useState } from 'react';

const ListaCompraContext = createContext();

const ListaCompraProvider = ({ children }) => {
  const [itens, setItens] = useState([]);
  const adicionarItem = (produto, quantidade) => {
    const novoItem = {
      id: Math.random().toString(36).substring(7),
      produto,
      quantidade,
      concluido: false,
    };
    setItens((prevItens) => [...prevItens, novoItem]);
  };
  
  const editarItem = (id, novoProduto, novaQuantidade) => {
    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, produto: novoProduto, quantidade: novaQuantidade } : item
      )
    );
  };
  
  const marcarConcluido = (id) => {
    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, concluido: true } : item
      )
    );
  };
  
  const excluirItem = (id) => {
    setItens((prevItens) =>
      prevItens.filter((item) => item.id !== id)
    );
  };

  return (
    <ListaCompraContext.Provider
      value={{ itens, adicionarItem, marcarConcluido, excluirItem, editarItem }}
    >
      {children}
    </ListaCompraContext.Provider>
  );
};

export default ListaCompraProvider;
export { ListaCompraContext };

