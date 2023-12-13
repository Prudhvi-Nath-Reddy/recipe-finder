pipeline {
    environment {
        docker_image_backend = ""
        docker_image_frontend = ""
        PORT = 5000
        DB_URL = 'mongodb+srv://pru:123@cluster0.rhvlm1b.mongodb.net/'
    }
    agent any
    // tools {
    //     nodejs 'NodeJS'
    // }
    stages {
        stage('Stage 1: Git Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Prudhvi-Nath-Reddy/recipe-finder.git'
            }
        }
        stage('Stage 2: npm testins'){
            steps{
                dir('backend') {
                    sh "npm install"
                    // sh "npm test"
                }
                dir('frontend') {
                    sh "npm install"
                }
                
            }
        }
        stage('Stage 3: Build Docker end Image') {
            steps {
                dir('backend') {
                    script {
                        docker_image_backend = docker.build "prasanthreddy12345/recipe-finder-backend:latest"
                    }
                }
                dir('frontend') {
                    script {
                        docker_image_frontend = docker.build "prasanthreddy12345/recipe-finder-frontend:latest"
                    }
                }
            }
        }

        stage('Stage 4: Push Docker Image to Hub') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        docker_image_backend.push()
                        docker_image_frontend.push()
                    }
                }
            }
        }

        stage('Stage 5: Clean Docker Images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Stage 6: Ansible Deployment'){
            steps{
                ansiblePlaybook colorized: true, 
                credentialsId: 'localhost',
                disableHostKeyChecking: true, 
                installation: 'Ansible', 
                inventory: 'inventory', 
                playbook: 'playbook.yml',     
                extraVars: [
                    DB_URL: DB_URL,
                    PORT: PORT,
                ]
            }
        }
    }
}