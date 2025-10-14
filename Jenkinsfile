pipeline {
    agent any

    environment {
        SERVICES = "User Post"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Niraj-KC/Map-Pract-7-8/'
            }
        }

        stage('Test Each Service') {
            steps {
                script {
                    def services = SERVICES.split(' ')
                    for (s in services) {
                        dir("${s}") {
                            bat "echo 🚀 Testing ${s} service..."
                            bat 'npm install'
                            bat 'npm test'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo 🚀 Deploying using docker-compose...'
                bat 'docker-compose down'
                bat 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful for all services!'
        }
        failure {
            echo '❌ Build failed during testing or deployment.'
        }
    }
}
