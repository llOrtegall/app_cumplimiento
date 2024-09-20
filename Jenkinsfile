pipeline {
  agent any
    
  tools { nodejs 'node-v22' }

  environment { ENV_MARCACION_CLIENT = credentials('ENV_MARCACION_CLIENT') }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
            def env_client = readFile(ENV_MARCACION_CLIENT)
            writeFile file: './.env', text: env_client
          }
        }
      }

      stage('install dependencies') {
        steps {
          script {
            sh 'yarn'
            sh 'yarn build'
          }
        }
      }

      stage('down docker compose'){
        steps {
          script { sh 'docker compose down' }
        }
      }

      stage('run docker compose'){
        steps {
          script { sh 'docker compose up -d' }
          }
      }
    }
}