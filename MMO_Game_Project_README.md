
# My MMO Game Project - Tools & Architecture

## Project Overview
This is a browser-based persistent world MMO inspired by D&D, classic MUDs, and player-driven economies.
Players live as ordinary adventurers in a dynamic world with a day/night cycle, a living calendar, evolving markets, and town politics.

Tech focus:
- 100% open source stack
- Fully controllable by me from the start
- Designed for eventual seasonal events and scalable world simulation

## Architecture Overview
[ Browser Client ]
   ↓
[ FastAPI Server ]
   ↓
[ Postgres + Redis ]

- Python runs the world simulation tick, NPC schedules, market adjustments, player data.
- FastAPI serves JSON APIs and WebSocket events to the client.
- Postgres stores all persistent data: players, towns, inventories, economy.
- Redis caches hot data like market prices, active sessions, and quick NPC lookups.

## Tool & Tech Stack

### Backend
| Tool            | Purpose                                     | Links |
|-----------------|---------------------------------------------|-------|
| Python 3.11+    | Main programming language                   | https://www.python.org/ |
| FastAPI         | Async web server for APIs & websockets       | https://fastapi.tiangolo.com/ |
| SQLAlchemy      | ORM for Postgres models                     | https://www.sqlalchemy.org/ |
| asyncpg         | Async driver for PostgreSQL                 | https://github.com/MagicStack/asyncpg |
| Redis           | In-memory cache for market/session data     | https://redis.io/ |
| APScheduler     | Scheduled world ticks (or Celery for future) | https://apscheduler.readthedocs.io/ |

### Database & Data Tools
| Tool              | Purpose                 | Links |
|-------------------|-------------------------|-------|
| PostgreSQL        | Primary data store      | https://www.postgresql.org/ |
| pgAdmin / TablePlus / DBeaver | DB browsing | https://www.pgadmin.org/ / https://tableplus.com/ / https://dbeaver.io/ |
| RedisInsight      | Visual Redis browser    | https://redis.com/redis-enterprise/redis-insight/ |

### Frontend
| Tool             | Purpose                             | Links |
|------------------|-------------------------------------|-------|
| HTML5 / CSS3     | Base UI, text-heavy panels, dark mode | |
| Vanilla JS       | Dynamic updates, market prices, time | |
| Optional React / Vue | For modular UIs, later         | https://reactjs.org/ / https://vuejs.org/ |
| Phaser.js        | If we later add tile-based maps     | https://phaser.io/ |

### DevOps & Infrastructure
| Tool                 | Purpose                       | Links |
|----------------------|-------------------------------|-------|
| Git / GitHub          | Version control & issues     | https://git-scm.com/ / https://github.com/ |
| Docker / Docker Compose | Local stack (Postgres, Redis, Python server) | https://www.docker.com/ |
| Nginx / Caddy        | HTTPS reverse proxy (future)  | https://nginx.org/ / https://caddyserver.com/ |
| GitHub Actions       | CI/CD for tests & linting     | https://github.com/features/actions |

### Graphics & UI Assets
| Tool                | Purpose                  | Links |
|----------------------|--------------------------|-------|
| GIMP / Krita         | Image editing, icons     | https://www.gimp.org/ / https://krita.org/ |
| Kenney Assets        | Free UI icons & textures | https://kenney.nl/assets |
| Game-Icons.net       | Icon overlays for UI     | https://game-icons.net/ |
| Google Fonts         | Open source fonts        | https://fonts.google.com/ |

### Design & Documentation
| Tool                | Purpose                  | Links |
|----------------------|--------------------------|-------|
| Obsidian / Markdown  | Worldbuilding, quests, lore | https://obsidian.md/ |
| draw.io / Excalidraw | Diagrams (tick loop, DB schema) | https://app.diagrams.net/ / https://excalidraw.com/ |
| Trello / GitHub Projects | Kanban for dev tasks | https://trello.com/ |

## Quick Setup Goals
### Local dev environment
- Clone repo, set up Python venv
- docker-compose up to launch Postgres + Redis
- Run FastAPI dev server, connected to DB
- Hit /api/world to get day, hour, season JSON

### Frontend
- Simple HTML page with time & market display
- Connect to API via fetch or websocket

## Planned future upgrades
- Season system: affects prices, NPC behavior
- Player houses & shops: persistent ownership
- Full day/night visual theming (UI colors shift with hour)
- Live event broadcasts via websockets: "Bandits spotted near Redhaven!"

## Why this stack
- Fully open source, with huge community support
- Easy to debug & extend
- Can scale horizontally with more Python workers & DB replicas
- You own your world 100%
