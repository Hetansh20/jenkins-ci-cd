
pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-deployment-dashboard'
        CONTAINER_NAME = 'devops-dashboard'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code downloaded successfully'
            }
        }

        stage('Install and Test') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      node:22-alpine \
                      sh -c "npm ci && npm test"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true

                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      --restart unless-stopped \
                      -p 3000:3000 \
                      ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    for i in $(seq 1 15); do
                        if curl -fsS http://localhost:3000/health; then
                            exit 0
                        fi
                        sleep 2
                    done

                    echo "Application health check failed"
                    docker logs ${CONTAINER_NAME}
                    exit 1
                '''
            }
        }
    }
}
