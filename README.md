# 0xBabyAlien Web Application

Welcome to the official repository for **0xBabyAlien**! This is an interactive web platform featuring crypto whale tracking, a community leaderboard, scanner utilities, and interactive mini-games (Asteroids & LinkMe).

## 🚀 Key Features

- **Whale Radar (`/api/whale-radar.js`)**: Tracks large-volume crypto transactions in real time.
- **Contract & Token Scan (`/api/scan.js`)**: Scanning module to check smart contract or wallet address details.
- **Leaderboard (`/api/leaderboard.js`)**: API endpoint for top user scores and player rankings.
- **Mini-Games & Hub (`/app/`)**:
  - `asteroids.html`: Web-based interactive Asteroids game.
  - `linkme.html`: Community and social link hub.
- **Serverless API Routes (`/api/`)**: Lightweight backend endpoints for data processing and smart contract interactions.

---

## 📁 Directory Structure

```text
0xBabyAlien/
├── 404.html               # Custom error page
├── README.md              # Project documentation
├── api/                   # Serverless API endpoints (Node.js)
│   ├── action-contracts.js
│   ├── index.js
│   ├── leaderboard.js
│   ├── scan.js
│   └── whale-radar.js
├── app/                   # Web apps & mini-games
│   ├── asteroids.html
│   └── linkme.html
├── css/                   # Stylesheets
│   ├── error.css
│   ├── load.css
│   └── style.css
└── img/                   # Image assets
    └── 0xbabyalien.jpeg
