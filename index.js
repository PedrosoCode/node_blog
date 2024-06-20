//FIXME  - quando o front apaga uma imagem, apenas seus metadados são removidos do SQL, sendo que o arquivo permanece armazenado
//TODO - usar Salt nas contas de usuário para que senhas iguais não tenham a mesma hash
//TODO - Reorganizar a estrutura de pasta por módulos, semelhante a organização no frontend. Para melhor navegação e visualização
//REVIEW - verificar uma forma mais dinâmica de usar a URL da API

require('dotenv').config(); // Garanta que isso está no topo do arquivo principal
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3042;

const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const userRoutes = require('./src/routes/userRoutes');
const imageRoutes = require('./src/routes/imageRoutes');
const footerRoutes = require('./src/routes/footerRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const damageTypesRoutes = require('./src/routes/damageTypesRoutes');
const weaponRoutes = require('./src/routes/weaponRoutes');
const { verificarToken } = require('./src/middlewares/authMiddleware');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Servir arquivos estáticos da pasta uploads


const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// Adicione a rota estática "Hello, World!"
app.get('/helloworld', (req, res) => {
  res.send('Hello, World!');
});

// Use as rotas
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);
app.use('/api', userRoutes);
app.use('/api', imageRoutes); 
app.use('/api', footerRoutes); 
app.use('/api', productRoutes); 
app.use('/api', cartRoutes);
app.use('/api', damageTypesRoutes);
app.use('/api', weaponRoutes);



// Exemplo de rota protegida
app.get('/dados-protegidos', verificarToken, (req, res) => {
  res.send('Acesso aos dados protegidos.');
});

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).send("Desculpe, não encontramos essa rota!");
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo quebrou!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
