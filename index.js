const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Dados temporários (em memória) para os produtos
let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 150 }
];

// ROTAS

// 1. CREATE - Adiciona um novo produto
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = {
    id: products.length + 1, // ID auto-incrementado
    name,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 2. READ - Obtém todos os produtos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// 3. READ (com ID) - Obtém um produto por ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// 4. UPDATE - Atualiza um produto por ID
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  product.name = name || product.name;
  product.price = price || product.price;
  res.json(product);
});

// 5. DELETE - Deleta um produto por ID
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products.splice(productIndex, 1);
  res.status(204).send(); // Retorna 204 No Content ao deletar
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

