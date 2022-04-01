# Problem 1

## File Structure

```
  /
  |-- config
  |-- controllers
  |-- migrations
  |-- models
  |-- routes
  | data.json
  | index.js
  | petroleum_stats.db
  | README.md
```

## Instructions:

1. Install dependencies:

> npm install

2. Run Migration to Create Table:
   Make sure to `petroleum_stats.db` file exists at root of the project

> node migrations/create_petroleum_stats_table.js

3. Run Data migration script:

> node migrations/data_migrations.js

4. Start server:

> npm start

## APIs:

1. List all data inserted into DB

> /api/index

2. List all data from file `data.json`

> /api/file_data

3. Problem 3: List the total sale of each petroleum

> /api/total_sale

4. Problem 4: List the top 3 countries that have the highest and lowest total sales to date.

> /api/top_country [for highest sale]
> /api/low_country [for lowest sale]

5. Problem 5: List average sales of each petroleum product for 4 years of interval. Note: Do not count zero sales during average calculation

> /api/four_year_average
