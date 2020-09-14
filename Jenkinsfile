pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
                sh 'cat "Hello from Pipeline" > test.txt'
            }
        }
    }
}
