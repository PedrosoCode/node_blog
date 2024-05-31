-- Criação da tabela de carrinho de compras
CREATE TABLE IF NOT EXISTS public.tb_compras_carrinho
(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES public.users(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de itens do carrinho de compras
CREATE TABLE IF NOT EXISTS public.tb_compras_carrinho_itens
(
    id SERIAL PRIMARY KEY,
    carrinho_id INTEGER REFERENCES public.tb_compras_carrinho(id) ON DELETE CASCADE,
    produto_id INTEGER REFERENCES public.tb_produtos(id),
    quantidade INTEGER NOT NULL,
    preco_unitario DOUBLE PRECISION NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de pedidos
CREATE TABLE IF NOT EXISTS public.tb_compras_pedidos
(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES public.users(id),
    total DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de itens do pedido
CREATE TABLE IF NOT EXISTS public.tb_compras_pedidos_itens
(
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES public.tb_compras_pedidos(id) ON DELETE CASCADE,
    produto_id INTEGER REFERENCES public.tb_produtos(id),
    quantidade INTEGER NOT NULL,
    preco_unitario DOUBLE PRECISION NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
