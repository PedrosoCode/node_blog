CREATE TABLE
    tb_stc_user_roles (
        id SERIAL PRIMARY KEY,
        role VARCHAR(255) UNIQUE NOT NULL
    )

INSERT INTO tb_stc_user_roles (role)
VALUES ('user'), ('adm');

UPDATE users
SET role_id = (SELECT id FROM tb_stc_user_roles WHERE role = 'user');

UPDATE users
SET role_id = (SELECT id FROM tb_stc_user_roles WHERE role = 'adm')
WHERE username = 'adm';
