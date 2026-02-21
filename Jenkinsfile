pipeline {
    agent { label "AGENT-1" }

    stages {

        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Build Application") {
            steps {
                sh 'npm run build'
            }
        }

        stage("Serve Application") {
            steps {
                sh '''
                pkill -f "nginx" || true
                sudo cp -r dist/* /usr/share/nginx/html/
                sudo systemctl restart nginx
                '''
            }
        }
    }
}