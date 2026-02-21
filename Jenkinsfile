pipeline {
    agent {
        label "AGENT-1"
    }

    stages {
        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Start Application") {
            steps {
                sh 'nohup npm start > app.log 2>&1 &'
            }
        }
    }
}