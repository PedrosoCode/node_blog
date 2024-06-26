//TODO - mudar o obter para uma stored procedure para melhor manutenção
//TODO - Criar a função de delete

const pool = require('../db/database');
const { enviarEmailPedido } = require('../services/emailService');

const nodemailer = require('nodemailer');

const adicionarAoCarrinho = async (req, res) => {
    try {
      const { produto_id, quantidade } = req.body;
      const usuario_id = req.usuario.id;
  
      // Obter preço do produto
      const produto = await pool.query('SELECT preco FROM tb_produtos WHERE id = $1', [produto_id]);
      if (produto.rows.length === 0) {
        return res.status(404).json('Produto não encontrado');
      }
  
      const preco_unitario = produto.rows[0].preco;
  
      // Verificar se o carrinho já existe para o usuário
      let carrinho = await pool.query('SELECT id FROM tb_compras_carrinho WHERE usuario_id = $1', [usuario_id]);
      let carrinho_id;
  
      if (carrinho.rows.length === 0) {
        // Criar um novo carrinho se não existir
        carrinho = await pool.query('INSERT INTO tb_compras_carrinho (usuario_id) VALUES ($1) RETURNING id', [usuario_id]);
        carrinho_id = carrinho.rows[0].id;
      } else {
        carrinho_id = carrinho.rows[0].id;
      }
  
      const novoItem = await pool.query(
        'INSERT INTO tb_compras_carrinho_itens (carrinho_id, produto_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4) RETURNING *',
        [carrinho_id, produto_id, quantidade, preco_unitario]
      );
  
      res.json(novoItem.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  };

  const atualizarQuantidade = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantidade } = req.body;

        const usuario_id = req.usuario.id;

        // Verificar se o item pertence ao carrinho do usuário
        const itemExistente = await pool.query(
            'SELECT * FROM tb_compras_carrinho_itens WHERE id = $1 AND carrinho_id = $2',
            [itemId, usuario_id]
        );

        if (itemExistente.rows.length === 0) {
            return res.status(404).json('Item não encontrado no carrinho');
        }

        await pool.query(
            'UPDATE tb_compras_carrinho_itens SET quantidade = $1 WHERE id = $2',
            [quantidade, itemId]
        );

        res.json({ message: 'Quantidade do item atualizada no carrinho' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};
  

const obterCarrinho = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const carrinho = await pool.query(
      `SELECT c.*, p.titulo, p.descricao, p.image_path 
       FROM tb_compras_carrinho_itens c 
       JOIN tb_produtos p ON c.produto_id = p.id 
       JOIN tb_compras_carrinho carrinho ON c.carrinho_id = carrinho.id 
       WHERE carrinho.usuario_id = $1`,
      [usuario_id]
    );
    console.log('Carrinho do usuário:', carrinho.rows); // Log para depuração
    res.json(carrinho.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};


const removerDoCarrinho = async (req, res) => {
  try {
    const { itemId } = req.params;
    const usuario_id = req.usuario.id;

    await pool.query(
      'DELETE FROM tb_compras_carrinho_itens WHERE id = $1 AND carrinho_id = $2',
      [itemId, usuario_id]
    );

    res.json('Item removido do carrinho');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

const criarPedido = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;

    // Obter itens do carrinho do usuário
    const carrinho = await pool.query(
      'SELECT * FROM tb_compras_carrinho_itens WHERE carrinho_id = (SELECT id FROM tb_compras_carrinho WHERE usuario_id = $1)',
      [usuario_id]
    );

    if (carrinho.rows.length === 0) {
      return res.status(400).json('Carrinho vazio');
    }

    // Calcular total do pedido
    const total = carrinho.rows.reduce((acc, item) => acc + (item.quantidade * item.preco_unitario), 0);

    // Criar pedido
    const novoPedido = await pool.query(
      'INSERT INTO tb_compras_pedidos (usuario_id, total, status) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, total, 'Pendente']
    );

    const pedido_id = novoPedido.rows[0].id;

    // Inserir itens do pedido
    for (let item of carrinho.rows) {
      await pool.query(
        'INSERT INTO tb_compras_pedidos_itens (pedido_id, produto_id, quantidade, preco_unitario) VALUES ($1, $2, $3, $4)',
        [pedido_id, item.produto_id, item.quantidade, item.preco_unitario]
      );
    }

    // Limpar carrinho
    await pool.query('DELETE FROM tb_compras_carrinho_itens WHERE carrinho_id = (SELECT id FROM tb_compras_carrinho WHERE usuario_id = $1)', [usuario_id]);

    // Obter e-mail do usuário
    const usuario = await pool.query('SELECT email FROM users WHERE id = $1', [usuario_id]);
    const emailUsuario = usuario.rows[0].email;

    // Enviar e-mail para o usuário
    enviarEmailPedido(emailUsuario, pedido_id, carrinho.rows, total);

    res.json(novoPedido.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};


const obterPedidos = async (req, res) => {
  try {
      const usuario_id = req.usuario.id;
      const pedidos = await pool.query(
          'SELECT * FROM tb_compras_pedidos WHERE usuario_id = $1',
          [usuario_id]
      );

      const pedidosComItens = await Promise.all(pedidos.rows.map(async (pedido) => {
          const itens = await pool.query(
              'SELECT i.*, p.titulo, p.descricao, p.image_path FROM tb_compras_pedidos_itens i JOIN tb_produtos p ON i.produto_id = p.id WHERE i.pedido_id = $1',
              [pedido.id]
          );
          return { ...pedido, itens: itens.rows.length > 0 ? itens.rows : [] };
      }));

      res.json(pedidosComItens);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
  }
};

const obterPedidoPorId = async (req, res) => {
  try {
      const { id } = req.params;
      const pedido = await pool.query(
          'SELECT * FROM tb_compras_pedidos WHERE id = $1 AND usuario_id = $2',
          [id, req.usuario.id]
      );

      if (pedido.rows.length === 0) {
          return res.status(404).json('Pedido não encontrado');
      }

      const itens = await pool.query(
          'SELECT i.*, p.titulo, p.descricao, p.image_path FROM tb_compras_pedidos_itens i JOIN tb_produtos p ON i.produto_id = p.id WHERE i.pedido_id = $1',
          [id]
      );

      res.json({ ...pedido.rows[0], itens: itens.rows });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
  }
};

module.exports = {
  adicionarAoCarrinho,
  obterCarrinho,
  removerDoCarrinho,
  criarPedido,
  obterPedidos,
  atualizarQuantidade,
  obterPedidoPorId
};
