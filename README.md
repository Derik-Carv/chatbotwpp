# chatbotwpp
Chatbot de de atendimento via WhatsApp, para o setor de T.I. da Oyamota Brasil S.A.

## Descrição

este projeto busca atender aos requisitos de atendimento à chamados, de acordo com o contexto da empresa de crochê.
se atentando a identificar e tratar a dificuldade dos colaboradores que tem dificuldade na interação automática do cliente,
buscando um alarde ao atendimento humano quando necessário.
caso chegue ao ponto do colaborador estar tendo muita diiculdade de atendimento, de inicio será chamado um atendente da área de T.I.
para tratar do problemas. futuramente será substituído por uma IA, e em casa de solicitação da direção ou extrema 
dificuldade de interação dos colaboradores.

## Para usuários

NADA AQUI AINDA.

## Para desenvolvedores

Todas as dependências abaixo são criciais apra o funcionamento do script no seu pc, use os comandos de instalação abaixo:

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

Baixe o instalador no site official do [NodeJs](https://nodejs.org/en).

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

[NodeJs](https://nodejs.org/en)
```
npm install node@v20.13.1
```
[Biblioteca WwebJs]
```
npm install ejs@3.1.10
```
```
npm install whatsapp-web.js@1.26.0
```
```
npm install wwebjs-mongo@1.1.0
```
[Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
```
npm install express@4.21.1
```
[QR Code terminal](https://www.npmjs.com/package/qrcode-terminal)
```
npm install qrcode-terminal@0.12.0
```

```
npm install ping@0.4.4
```
```
npm install xlsx@0.18.5
```
