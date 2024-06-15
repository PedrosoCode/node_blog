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
