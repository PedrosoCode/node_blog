# Guia de Instalação e Configuração da VM

## Passos Iniciais

1. Instalar o Ubuntu Server.
2. Pré-definir a instalação do PostgreSQL.
3. Aceitar as configurações padrão.

## Após a Instalação da VM

### Atualização do Sistema

1. Logar com o usuário.
2. Atualizar os pacotes:
   `sudo apt update`
   `sudo apt upgrade`

### Instalação do Nginx

1. Instalar o Nginx:
   `sudo apt install nginx`
2. Iniciar o serviço Nginx e habilitar para iniciar automaticamente na inicialização:
   `sudo systemctl start nginx`
   `sudo systemctl enable nginx`

### Instalação do Git

1. Instalar o Git para clonar os projetos de front e back:
   `sudo apt update`
   `sudo apt install git`

### Instalação do Node.js

1. Instalar o Node.js:
   `sudo apt install nodejs`
   `sudo apt update`
   `sudo apt upgrade`
2. Instalar o NVM para atualizar o Node.js para a versão 20 (provavelmente a versão padrão será 18):
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
   `source ~/.nvm/nvm.sh`
3. Instalar a versão 20 do Node.js:
   `nvm install 20`
4. Verificar a versão instalada do Node.js:
   `node -v`

### Clonando os Projetos

1. Clonar os projetos:
   `git clone https://github.com/PedrosoCode/node_blog`
   `git clone https://github.com/PedrosoCode/app_blog`

### Executando os Projetos

1. Entrar no diretório do projeto `node_blog` e instalar as dependências:
   `cd node_blog`
   `npm install`
2. Executar o backend:
   `node index.js &`
3. Testar um GET estático com o comando curl:
   `curl http://localhost:3042/helloworld`

### Verificação e Finalização de Processos

1. Verificar se a API está rodando:
   `ps aux | grep node`
2. Parar um processo:
   `kill (numero do processo)`

### Ajustes no Terminal

1. Se o teclado ficar transparente, execute:
   `reset`

### Instalação do PostgreSQL

1. Instalar o PostgreSQL:
   `sudo apt install postgresql postgresql-contrib -y`
2. Iniciar o serviço PostgreSQL e habilitar para iniciar automaticamente:
   `sudo systemctl start postgresql`
   `sudo systemctl enable postgresql`
3. Por padrão, o PostgreSQL cria um usuário chamado postgres. Você precisará configurar uma senha para este usuário:
   `sudo -u postgres psql`
4. Dentro do prompt do PostgreSQL, execute o seguinte comando para definir uma senha para o usuário postgres:
   `\password postgres`

### Acessar o PostgreSQL

1. Você pode acessar o PostgreSQL usando o comando psql com o usuário postgres:
   `sudo -u postgres psql`

### Criar um Novo Banco de Dados e Usuário

1. Crie um novo banco de dados:
   `CREATE DATABASE nome_do_banco;`
2. Crie um novo usuário:
   `CREATE USER nome_do_usuario WITH PASSWORD 'senha_do_usuario';`
3. Conceda privilégios ao novo usuário no banco de dados:
   `GRANT ALL PRIVILEGES ON DATABASE nome_do_banco TO nome_do_usuario;`

Como já configuramos o banco (em partes), precisamos de um meio de transferir o TAR de BKP para a VM, para isso vamos usar Secure Copy e SSH:

   `sudo apt install openssh-client -y`
   `sudo systemctl start ssh`
   `sudo systemctl enable ssh`
   `ip a` para coletar o IP de ambas as máquinas

No terminal da máquina original, tente conectar à VM usando SSH com o endereço IP correto (suponha que o IP da VM seja 192.168.1.100):

   `ssh gabriel@192.168.1.100`
Nota: Substitua 192.168.1.100 pelo endereço IP real da sua VM.

Exemplo de transferência de arquivo da máquina original para a VM - OBS: faça isso enquanto não estiver em uma sessão SSH, caso esteja, execute um `exit`:

   `scp /home/gabriel/gits/sharedVM/bkp_blog gabriel@192.168.1.116:/home/gabriel/bkps/`

Exemplo de conexão de sessão SSH:

   `ssh gabriel@192.168.1.116`

Como a VM não tem uma GUI, é melhor conectar a ela usando o pgAdmin direto da máquina original. Para fazermos a conexão, podemos seguir esses passos:

Configuração do PostgreSQL para Conexões Remotas
Encontrar e Editar `postgresql.conf`:

Primeiro, encontre o arquivo `postgresql.conf`:

   `sudo find / -name postgresql.conf`
Em seguida, edite o arquivo:

   `sudo nano /etc/postgresql/14/main/postgresql.conf`
Alterar `listen_addresses` para permitir todas as interfaces:

   `listen_addresses = '*'`
Salve as mudanças (Ctrl+O, Enter) e saia (Ctrl+X).

Encontrar e Editar `pg_hba.conf`:

Primeiro, encontre o arquivo `pg_hba.conf`:

   `sudo find / -name pg_hba.conf`
Em seguida, edite o arquivo:

   `sudo nano /etc/postgresql/14/main/pg_hba.conf`
Adicione a seguinte linha para permitir conexões de qualquer IP com autenticação MD5:

   `host all all 0.0.0.0/0 md5`
Salve as mudanças (Ctrl+O, Enter) e saia (Ctrl+X).

Reiniciar o PostgreSQL:

Reinicie o serviço PostgreSQL para aplicar as mudanças:

   `sudo systemctl restart postgresql`
Verificar o Status do PostgreSQL:

Verifique se o PostgreSQL está rodando corretamente:

   `sudo systemctl status postgresql`

## Para dar restore no Banco

Copiamos o arquivo para a pasta temp, enquanto como usuário comum, isso é necessário pois o usuário do postgres não possui acesso a home do usuário comum onde provavelmente o arquivo está localizado 

`cp ~/bkps/bkp_blog /tmp/`

Após isso, logamos com o usuário do postgres como `sudo -i -u postgres`

Para restaurar o banco, podemos usar o seguinte comando `pg_restore --clean -U postgres -d MyBlogDB /tmp/bkp_blog`

Ao conectar a VM pela máquina original, no pgadmin podemos rodar um `select * from users`, ou simplesmente verificar o esquema de tabelas, para confirmar se o restore funcionou.


## Programas a Instalar

- Nginx
- Git
- Node.js
- PostgreSQL

## Comandos Interessantes de Saber

### Atualização de Pacotes

   `sudo apt update`
   `sudo apt upgrade`

### Gerenciamento de Serviços

   `sudo systemctl start <service>`
   `sudo systemctl enable <service>`

### Verificação de Processos

   `ps aux | grep <process>`
   `kill <process_id>`

### Ajustes no Terminal

   `reset`

## TODO

- Instalar e usar as Guest Additions do VirtualBox para permitir copiar e colar entre máquinas.
