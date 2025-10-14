pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Niraj-KC/Map-Pract-7-8/'
            }
        }
        stage('Testing User-Service'){
            steps{
                cd './User'
            }
        }
        stage('Build') {
            steps {
                bat 'echo Building the application...'
                sh 'npm install'  // or any build command
            }
        }
        stage('Test') {
            steps {
                bat 'echo Running tests...'
                sh 'npm test'     // or pytest, mvn test, etc.
            }
        }
        stage('Deploy') {
            steps {
                bat 'echo Deploying...'
                // e.g., run docker build, docker push, ssh to server, or kubectl apply
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
