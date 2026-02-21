pipeline{
    agent{
        label "AGENT-1"
    }

    stages{
        stage("Build"){
            steps{
                sh 'npm install'
            }
        }
    }
post {
    always {
        sh 'echo build is succefull'
    }
}

}