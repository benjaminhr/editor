# Shared Markdown Editor

![alt](https://i.imgur.com/gtQXj0u.gif)

Built with NodeJS with dependencies such as Redis, ShareJS (0.6.3) , and Express.

# Getting Started

1. Clone the repo and `cd` into it.

2. `npm install` (or yarn equivalent)

3.  `npm install --save share@0.6.3` - this specific version of ShareJS is required. 

4. Redis server running whichever way you wish to do that - my suggestion is to `brew install redis` and then run `redis server` paired with `redis-cli` in another tab/window.

4. `npm run dev` will get the projecting running on `localhost:8080`

# Test

1. `npm test` to run mocha unit test
