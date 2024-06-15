processo de vinculação a uma VM

--> passos iniciais
1 > instalar o ubuntu server
2 > pré definir a instalação do postgre
3 > aceitar as configurações padrão

após a instalação da vm e logar com o usuário

dar sudo apt update
dar sudo apt upgrade

instalar o NGIX 
$ sudo apt install nginx

Após a instalação, inicie o serviço Nginx e habilite-o para iniciar automaticamente na inicialização.

$ sudo systemctl start nginx
$ sudo systemctl enable nginx

instalar git para poder clonar os projetos de front e back

$ sudo apt update
$ sudo apt install git

instalar o node

$ sudo apt install nodejs
$ sudo apt update
$ sudo apt upgrade

instalar o nvm para poder atualizar o node para a versão 20, muito provavelmente ele terá vindo por padrão em uma versão 18 <

$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ source ~/.nvm/nvm.sh

entrar no node_blog e dar um npm install para pegar todas as dependencias

$ nvm install 20

para ter certeza, pode ser verificado com node -v a versão 

dar clone nos projetos 

https://github.com/PedrosoCode/node_blog

https://github.com/PedrosoCode/app_blog


programas a instalar
NGINX

comandos interessantes de saber

pacotes a instalar


//TODO - instalar e usar guest additions do VB para permitir copiar e colar entre máquinas

