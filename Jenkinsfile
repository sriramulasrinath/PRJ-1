pipeline {
    agent { label "AGENT-1" }

    stages {

        stage("Stop Old App") {
            steps {
                sh "pkill -f 'node' || true"
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Start Application") {
            steps {
                sh 'nohup npm run dev -- --host 0.0.0.0 > app.log 2>&1 &'
            }
        }
    }
}