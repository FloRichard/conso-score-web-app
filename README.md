# conso-score-web-app

This repository is the platform of conso-score used to calculate the scores.

It is a platform that put in relation sellers and producers.

Producers can input their products with the associated carbon footprint for each product.

Sellers can choose their producers and their products to calculate the associated conso scores and apply the tax on the selling price of the product.

## Requirements

To make the application working, you need to have :

- npm installed
- The [conso-score-back-office](https://github.com/FloRichard/conso-score-back-office) service running on port `9092`
- The [conso-score-user-manager](https://github.com/FloRichard/conso-score-user-manager) service running on port `9093`
- The [conso-score-bdd](https://github.com/FloRichard/conso-score-bdd) running

## Launch the application

To launch the application, run `npm start dev` at the root of the project.
