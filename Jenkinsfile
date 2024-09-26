pipeline {
    agent any
    environment {
        IMAGE_NAME = 'fr0d0n/medhead-front'
    }
    stages {
        stage('Clean workspace') {
            steps {
                sh 'rm -rf node_modules package-lock.json'
            }
        }
        stage('Build Angular App') {
            steps {
                sh 'npm install'
                sh 'npm run build --prod'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${env.IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
    }
    post {
        always {
            cleanWs() // Nettoyage du workspace après chaque build
        }
    }
}