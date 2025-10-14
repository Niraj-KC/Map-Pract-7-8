pipeline {
    agent { label 'windows' }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Niraj-KC/Map-Pract-7-8/'
            }
        }

        stage('Testing User-Service') {
            steps {
                dir('User') {
                    bat 'echo Inside User directory'
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                bat 'echo Building the application...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'echo Running tests...'
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Deploying with docker-compose...'
                bat 'docker-compose down'
                bat 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Build and Deployment Successful!'
        }
        failure {
            echo '❌ Build Failed!'
        }
    }
}
