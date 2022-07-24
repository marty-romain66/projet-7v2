Prérequis : Nodejs, cli React, Serveur sql


Installation du backend : 

Cloner le dépot
cd back-p7
npm i 

Allez dans le dossier config et remplir le password de votre serveur sql dans les fichier config.json et db.js
Executer le commande 

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npm start 

Le serveur est lancer ! 


Installation du frontend : 


Cloner le le dépot 
cd front-p7
npm i 
npm start 






