pipeline {
    agent any
    stages {
        stage('Test Email Variable') {
            steps {
                script {
                    if (env.CHANGE_ID) { // Si es un PR
                        echo "El ID del PR es: ${env.CHANGE_ID}"
                        echo "El autor es: ${env.CHANGE_AUTHOR}"
                        echo "El email del autor es: ${env.CHANGE_AUTHOR_EMAIL}"
                    } else {
                        echo "Esto no es un Pull Request, es la rama ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
