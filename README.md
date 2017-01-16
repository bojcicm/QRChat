# QRChat
[![status](https://img.shields.io/badge/status-online-brightgreen.svg)]()
[![FirebaseApp](https://img.shields.io/badge/FirebaseApp-online-brightgreen.svg)]()
[![ng-serve](https://img.shields.io/badge/ngServe-passing-green.svg)]()

University project, goal is to achieve token excange using qr codes.

User opens web app where qr code is present - `qr-chat/`

Token provider is mobile app, mobile logs into facebook and stores access token - `mobile/`

Local build:

1. `npm install`
2. `ng serve`

Build for prod - [Details](https://coryrylan.com/blog/deploy-angular-2-cli-apps-to-firebase):

1. `ng build --prod`
2. If you **DO NOT** have firebase-tools install them
  1. `npm i -g firebase-tools`
  2. Go to project folder
  3. Login to fb tools `firebase login`
  4. `firebase init`
  5. select project
  6. *do not* use `public/` dir, use `dist/` directory
  7. rewrite all urls
3. run `firebase deploy`
