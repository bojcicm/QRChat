# QRChat
[![status](https://img.shields.io/badge/status-online-brightgreen.svg)]()
[![FirebaseApp](https://img.shields.io/badge/FirebaseApp-online-brightgreen.svg)]()
[![ng-serve](https://img.shields.io/badge/ngServe-passing-green.svg)]()

University project, goal is to achieve token excange using qr codes.

User opens web app where qr code is present - `qr-chat/`

Token provider is mobile app, mobile logs into facebook and stores access token - `mobile/`

Local build:
* `npm install`
* `ng serve`

Build for prod:
* `ng build --prod`

* If you *DO NOT* have firebase-tools install them
** `npm i -g firebase-tools`
** Go to project folder
** Login to fb tools `firebase login`
** `firebase init`
** select project
** do not user `public/` dir, user `dist` directory
** rewrite all urls

* firebase deploy