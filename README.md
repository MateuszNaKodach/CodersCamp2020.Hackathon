# CodersCamp2020 Hackathon Project
## Integramic - poznaj swój zespół i ulepsz codzienną współpracę!

### Frontend

#### Netlify Deployment

URL: https://integramic.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/b58805a5-da13-46ca-8d7c-50d62b0577c0/deploy-status)](https://app.netlify.com/sites/integramic/deploys)

### Backend

[Swagger REST API Docs](https://coderscamp2020-hackathon.herokuapp.com/rest-api-docs/)

## Overview

**TourDeFoos is an application to organize and manage tournaments - in this case it's dedicated especially for foosball tournaments.**

**It was created as a final project of CodersCamp course.**


## Our Crew

Mentor **[Mateusz Nowak](https://github.com/nowakprojects)**

- [Anna Lamperska](https://github.com/lamparina)
- [Piotr Rynio](https://github.com/PiotrWR)
- [Paweł Szambelan](https://github.com/Szambelan)
- [Tomasz Dworniczak](https://github.com/tomdworniczak)


## Main functionalities

1. Tournament organisation
2. Creating players profiles (regardless of tournaments) and sending them confirmation emails via NodeMailer.
3. Tournament registration
4. Tournament tables module responsible for enable/disable tables during tournament
5. Division into teams and assignment to teams
6. Division of matches between teams - making tournament tree
7. Matches module responsible for starting and finishing matches


## Dependencies

The following technologies were used:

#### Backend:
- Node.js
- Express
- Database: MongoDB / in memory save
- TypeScript
- Docker
- Nodemailer
- Jest
- MailHog
- Stryker
- Heroku
- Swagger
- Docker

Our backend application follows the **TDD approach** and is almost **fully covered** by tests. The architecture has been designed according to the **DDD (Domain-driven design)**.

#### Frontend:
- React
- React-DOM
- Router
- Hooks (useState, useEffect, useContext,useHistory)
- Material-UI
- Axios

The architecture has been designed according to the **Atomic Design approach**. Application follows th **Mobile First Design.**

#### Other:
- Code Review in every Pull Request (and 2 Approve to merge)
- Event Storming & Event Modeling
- Domain-Driven Design (DDD)
- Git
- GitHub
- IntelliJ
- Miro
- Figma
- Swagger
- Docker
- EasyRetro
- We used to daily every day and remote-meeting every week!


## Event Modeling

During this project used EventStorming, followed by Event Modeling to model our application flow and for task division.
We used for it miro web app.
[Link to Miro Board](https://miro.com/app/board/o9J_lOEebqI=/?moveToWidget=3074457356075616433&cot=14).

![image](https://user-images.githubusercontent.com/31566345/111337374-537e9680-8676-11eb-861e-b1b358bfc0ab.png)

## Running the project

Running this project locally

###### From the repo:

1. Clone this project locally
2. Run `npm install` in your bash/command line
3. Go to `/backend` in your bash/command line and Run `npm run start:dev` in your bash/command line
4. Go to `/frontend` in your bash/command line and Run `npm run start` in your bash/command line

## Development
1. Execute `docker-compose -f docker-compose.dev.yaml up` in main project catalog -  this will run the application in watch mode and all required dependencies.
2. Now following urls should be available:
   - REST API SWAGGER  |   http://localhost:5000/rest-api-docs/
   - FRONTEND (REACT)  |   https://localhost:3000

