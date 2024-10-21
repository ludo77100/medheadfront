pipeline {
    agent any
    environment {
        IMAGE_NAME = 'fr0d0n/medhead-front'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
    }
    stages {
        stage('Install Xvfb') {
            steps {
                sh 'apt-get update && apt-get install -y xvfb'
            }
        }
        stage('Clean workspace') {
            steps {
                sh 'rm -rf node_modules package-lock.json'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Cypress Tests') {
            steps {
                sh 'xvfb-run npx cypress run'
            }
        }
        stage('Build Angular App') {
            steps {
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
        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials-id', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                        sh "docker push ${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
                    }
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