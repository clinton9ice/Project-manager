Taskey | Project Manager
============
[![Current Version](https://img.shields.io/badge/version-1.0.7-green.svg)](https://github.com/clinton9ice/Project-manager.git) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://taskey.nextoli.com.ng/) 

Taskey is project management system which helps users store, update projects and it's state once a task is created or completed. Its sole purpose is to help make user plan's easy and enable them to keep record of total completed or started projects they have done. It is making use of the most secured database as its storage bucket, and has a wonderful authenticated user sign in system using your gmail address or a custom email address.


## Tools Used in this project
- Google icons Design
- Bootstrap 
- Sass
- Vue
- Vuex
- Javascript
- Firebase
- QuilJs Editor


Interesting feature about Vuex

Vuex stores are reactive. When Vue components retrieve state from vuex, they will reactively and efficiently update if the store's state changes.

You cannot directly mutate the store's state. The only way to change a store's state is by explicitly committing mutations. This ensures every state change leaves a track-able record, and enables tooling that helps us better understand our applications.

To understand more about vuex [click here](https://vuex.vuejs.org/guide/)




#### Main components of the project:
- **Collection component:** This is a collection template that contains each project card from the state managment.

- **Project-card component:** This is the component template that holds the data fetched directly from the state projects, and it can loop based on the number of available task
- **Modal component:**  This is the component that holds form for creating new task.
- **Loader component:**  This loader component is responsible for the loading effect throughout the entire page
- **Quil Editor component:**  This is a rich text editor "Quil" made as component to ease the configuration so that it can easily be integrated into apps that needs it.

- **temp/Alert component:** This component is in charge of every alert in the application, it pops up if there is any error or any success calls that was made.

---

## Project Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies used in the project.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Folders
- **assets:** This holds the assets file for the project, it's a place where you can store your styling, plugin tools, images, and others.
- **components:** This holds all the reusable component for the project.
- **layout:** This is the base of the app. It is basically where all views are rendered.
- **router:** This contains files that deals with our routing (linking) system which renders to the page without reloading the whole window document.
- **store:** This folder contains files for our vuex. It is a place where all the tasks that will be created in the project dynamically are stored in the state.
- **views:** This is where the number of pages in the project is stored.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm run serve` to start the application. You will then be able to access it at localhost:8080 if no application is runinng on that but if true then you can as well access it from localhost:8081

---

## Production Build
After you're done editing or adding new features to the project,  you can deploy to production by runnong the following command `npm run build` to setup the file for production mode.