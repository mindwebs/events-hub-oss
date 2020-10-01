<p align="center">
<img src="https://img.shields.io/badge/Hacktoberfest-Friendly-blueviolet?style=for-the-badge">
<img src="https://img.shields.io/github/issues-pr/mindwebs/Events_Hub?label=Pull%20Requests&style=for-the-badge">
<img src="https://img.shields.io/github/issues/mindwebs/Events_Hub?color=db0000&label=Issues&style=for-the-badge">
<img src="https://img.shields.io/github/contributors/mindwebs/Events_Hub?color=blue&style=for-the-badge">
</p>

<h2 align="center">Events Hub</h2>
<p align="center">An all in one Ticket Booking App</p>

<br />

## Introduction
This is an open-source web application that is about an **Event Hosting Platform**, designed to reach a global audience, help you communicate better and increase your network. The application offers a lot of features ranging from hosting and promoting events to booking tickets for the same!

This project is made using Angular, for the frontend & NodeJS-Express for the backend. We have used MongoDB as our database.

Welcoming contributions with :heart:

## Abstract
The purpose of the product is to create a professional website for registering and signing up users and let them book events of their choice in the city of their preference. The user will get an unique QR code which would be generated from the backend after the payment is confirmed from the Payment Portal incorporated in the portal. The admin portal gives a full overview of all the details that could be needed by the admins. There are various levels of admins; the ones incharge of the entire portal who can add or delete events and make any changes to the events & the event admins who can add and view all details relevant to the details of the events they are in charge of.

## Sections of this Project
This project has three layers and folder structured in that way.
- The admin portal front-end is located under the dashboard folder.
- The user portal front-end is located under web folder.
- The backend API stack is located under the api folder.


## How to Contribute
Fork this Repository, Make a Local Instance of MongoDB or create a free atlas account and push that details in /api/config/db.js and create a database Events_Hub under that username in your mongo instance.
You can find the connect URI where you should put the details in username:password@host:port/dbName format.

After implementing the changes you can create a pull request to this repository.

## Access the Live Link
If you wish to test the live application, please write to us at contact@mindwebs.org with the subject heading "Access to Events_Hub Dashboard". Please feed in your complete developer details, so that we can evaluate and give you the access to it. Please don't forget to write the reason of your request of access. If granted, you will be mailed with the email and password to get into the dashboard.

## Project Creators
1. Aayush Agarwal
2. Aishik Deb
3. Akash Roy
4. Dipan Roy

## Instructions
#### Using the Database for development and testing.
For development and testing purposes, we recommend you to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and connect to the application via connection string. Here's how to do that:
- Sign in to your MongoDB Atlas account. If you do not have an account yet, create one [here](https://www.mongodb.com/cloud/atlas/register)
- After logging in, you’ll be prompted to build your first project and cluster (choose the one that's free) by choosing a cloud provider and region. You may leave everything as default. (Be sure to use the `M0` free cluster tier, which is usually selected by default)
- Wait for the cluster to be created. Once done, click on `Connect`
- Connect promt appears, you will be prompted to set up your Internet Protocol (IP) and whitelist your IP address. This is important, as it ensures that only you can access the cluster in the cloud from your IP address.
- Next, you’ll need to create a MongoDB user to access your cluster. Simply enter the new username and password and do not forget it!
- Moving on to `Choose a connection method` tab, choose `Connect Your Application`
- Next, Copy the connection string and hit close
> You now have the connection string that you can add as an environment variable under a key named `ATLAS_URI`

#### How to run the application on localhost
To run the application on local host, open two different terminals - one in the `/api` directory and the other in the `/web` directory
- Make sure you add create the `.env` file in the `/api` directory with your `ATLAS_URI` key value.
- Run `npm i` in both the terminals to install the required packages.
- Run `npm start` in the `/api` directory terminal
- Run `ng serve` in the `/web` directory terminal

## Contribution Guidelines
Before making any contributions, kindly go through the [CONTRIBUTING](https://github.com/mindwebs/Events_Hub/blob/master/CONTRIBUTING.md) and [CODE OF CONDUCT](https://github.com/mindwebs/Events_Hub/blob/master/CODE_OF_CONDUCT.md).
It is recommended to raise issues and send PRs using the provided templates.

## LICENSE
The current project is released under the MIT License. See [LICENSE](https://github.com//mindwebs/Events_Hub/blob/master/LICENSE) for details.

_Thank you!_
