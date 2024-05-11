CREATE TABLE exemplo (
    id serial PRIMARY KEY,
    nome VARCHAR (50),
    idade INT
);

CREATE OR REPLACE FUNCTION add_pessoa(nome VARCHAR, idade INT)
RETURNS void AS $$
BEGIN
    INSERT INTO exemplo(nome, idade) VALUES (nome, idade);
END;
$$ LANGUAGE plpgsql;

SELECT add_pessoa('Gabriel', 20);

select * from exemplo