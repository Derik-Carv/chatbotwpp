# chatbotwpp
Chatbot para whatsapp. Entrelaços Crochê.

## Descrição

este projeto busca atender aos requisitos de atendimento ao cliente básico, de acordo com o contexto da empresa de crochê.
se atentando a identificar e tratar a dificuldade de clientes que tem dificuldade na interação automática do cliente,
buscando um alarde ao atendimento humano quando necessário.
quando chegar no ponto do cleinte estar tendo muita diiculdade de atendimento, de inicio será chamado um atendente humano
para tratar do problemas. futuramente será substituído por uma IA, e em casa de solicitação do cliente ou  extrema 
dificuldade, ai sim será intervido por um humano que será chamado pelo próprio sistema de atendimento.

## Para usuários

NADA AQUI AINDA.

## Para desenvolvedores

Tenha o node.js instalado no seu pc, use os comandos de instalação abaixo:

## Verificando se o nodejs já está instalado

```
node -v
npm -v
```

Caso não esteja, siga o passo abaixo de acordo com seu sistema operacional.

## Linux / Unix

```
sudo apt update
sudo apt install curl -y
```
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs -y
```
```
node -v
npm -v
```

## MacOS
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
brew install node
```
```
node -v
npm -v
```

## Windows

No PowerShell:

```
curl -o nodejs.msi https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi
``` 
```
Start-Process msiexec.exe -ArgumentList '/i nodejs.msi /quiet /norestart' -NoNewWindow -Wait
```
```
node -v
npm -v
```


## Controle de versão

Utilize o nvm para instalar as dependencias.
para rodar o projeto e testes é preciso instalar estas versões:

```
nvm install node@v20.13.1
```
```
npm install cors@2.8.5
```
```
npm install ejs@3.1.10
```
```
npm install express@4.21.1
```
```
npm install puppeteer@23.1.1
```
```
npm install qrcode-terminal@0.12.0
```
```
npm install whatsapp-web.js@1.26.0
```
```
npm install wwebjs-mongo@1.1.0
```
