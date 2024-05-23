CREATE TABLE tb_produtos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    especificacoes_tecnicas TEXT,
    preco FLOAT NOT NULL
);

INSERT INTO public.tb_produtos(
	id, titulo, descricao, especificacoes_tecnicas, preco)
	VALUES (1, 'testeTitulo','testeDesc','testeEspec', 20);