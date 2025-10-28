# Microservices Demo Project

A microservices-based application demonstrating user management, post creation, email notifications, and monitoring capabilities using modern technologies and Docker containerization.

## Architecture

The project consists of the following microservices:

- **User Service** (Port 3001): Handles user management operations
- **Post Service** (Port 3002): Manages blog posts
- **Email Service**: Processes email notifications using Kafka
- **UI** (Port 80): Flutter web application for the frontend
- **API Gateway** (Port 8000): Kong gateway for routing and API management
- **Monitoring Stack**: 
  - Prometheus (Port 9090)
  - Grafana (Port 3010)
  - cAdvisor (Port 8081)
  - Node Exporter (Port 9100)

## Technologies Used

- Backend: Node.js with Express
- Frontend: Flutter Web
- Message Queue: Apache Kafka
- API Gateway: Kong
- Monitoring: Prometheus & Grafana
- Containerization: Docker & Docker Compose
- CI/CD: Jenkins

## Prerequisites

- Docker and Docker Compose
- Node.js 18+
- Flutter SDK
- Jenkins (for CI/CD)

## Getting Started

1. Clone the repository:
```sh
git clone <repository-url>
cd <project-directory>
```

2. Set up environment variables:
```sh
# EmailService/.env
EMAIL=your-email@gmail.com
APP_PASS=your-app-password
```

3. Start the services:
```sh
docker-compose up -d
```

4. Access the applications:
- Frontend UI: http://localhost
- Kong Admin API: http://localhost:8001
- Grafana: http://localhost:3010 (admin/admin)
- Prometheus: http://localhost:9090

## API Endpoints

### User Service
- `GET /api/v1/users` - List all users
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Post Service
- `GET /api/v1/posts` - List all posts
- `POST /api/v1/posts` - Create new post
- `PUT /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post

## Development

### Running Tests
```sh
# For User Service
cd User && npm test

# For Post Service
cd Post && npm test

# For UI
cd ui && flutter test
```

### Building UI
```sh
cd ui
flutter build web
```

## Monitoring

- The project includes comprehensive monitoring using:
  - Prometheus for metrics collection
  - Grafana for visualization
  - cAdvisor for container metrics
  - Node Exporter for host metrics

Access the Grafana dashboard at http://localhost:3010 to view:
- Container CPU usage
- Memory consumption
- Network I/O
- System metrics


## Service Overview

### User Service
- Manages user authentication and authorization
- Handles user profile management
- Stores user data in MongoDB
- Implements JWT-based authentication
- Exposes RESTful APIs for user operations
- Built with Node.js and Express

### Post Service
- Manages blog post creation and management
- Handles post metadata and content
- Implements CRUD operations for posts
- Communicates with User Service for author verification
- Uses MongoDB for post storage
- Built with Node.js and Express

### Email Service
- Handles asynchronous email notifications
- Consumes Kafka events for email triggers
- Supports various email templates
- Uses SMTP for email delivery
- Implements retry mechanism for failed deliveries
- Built with Node.js and nodemailer

### UI Service
- Provides web-based user interface
- Implements responsive design
- Handles client-side state management
- Integrates with all backend services
- Built with Flutter Web
- Features material design components

### API Gateway (Kong)
- Routes requests to appropriate services
- Handles request/response transformation
- Implements rate limiting
- Manages API authentication
- Provides API analytics
- Enables service discovery

### Monitoring Services

#### Prometheus
- Collects metrics from all services
- Implements service health monitoring
- Stores time-series data
- Provides query language (PromQL)
- Handles alerting rules

#### Grafana
- Visualizes monitoring data
- Provides customizable dashboards
- Implements alert notifications
- Shows real-time metrics
- Supports multiple data sources

#### cAdvisor
- Monitors container resources
- Tracks container performance
- Provides container metrics
- Analyzes resource usage patterns

#### Node Exporter
- Collects host-level metrics
- Monitors system resources
- Tracks hardware statistics
- Provides OS-level metrics


## CI/CD Pipeline

The project includes a Jenkins pipeline that:
1. Checks out the code
2. Runs tests for each service
3. Builds and deploys services using Docker Compose

## License

[MIT License](LICENSE)