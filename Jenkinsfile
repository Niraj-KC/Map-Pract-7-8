pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Niraj-KC/Map-Pract-7-8/'
            }
        }
        stage('Build') {
            steps {
                sh 'echo Building the application...'
                // sh 'npm install'  // or any build command
            }
        }
        stage('Test') {
            steps {
                sh 'echo Running tests...'
                // sh 'npm test'     // or pytest, mvn test, etc.
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo Deploying...'
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
