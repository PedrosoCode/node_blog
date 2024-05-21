CREATE TABLE tb_produtos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    especificacoes_tecnicas TEXT,
    preco FLOAT NOT NULL
);
