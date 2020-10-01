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

## Using the Database for development and testing.
For development and testing purposes, we recommend you to use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and connect to the application via connection string. Here's how to do that:
- Sign in to your MongoDB Atlas account. If you do not have an account yet, create one [here](https://www.mongodb.com/cloud/atlas/register)
- After logging in, you’ll be prompted to build your first project and cluster (choose the one that's free) by choosing a cloud provider and region. You may leave everything as default. (Be sure to use the `M0` free cluster tier, which is usually selected by default)
- Wait for the cluster to be created. Once done, click on `Connect`
- Connect promt appears, you will be prompted to set up your Internet Protocol (IP) and whitelist your IP address. This is important, as it ensures that only you can access the cluster in the cloud from your IP address.
- Next, you’ll need to create a MongoDB user to access your cluster. Simply enter the new username and password and do not forget it!
- Moving on to `Choose a connection method` tab, choose `Connect Your Application`
- Next, Copy the connection string and hit close
> You now have the connection string that you can add as an environment variable under a key named `ATLAS_URI`

## How to run the application on localhost
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
