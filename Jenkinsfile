pipeline {
    agent any
    stages {
        stage('Debug Variables') {
            steps {
                script {
                    // Esto imprimirá todas las variables de entorno para que las veas en el log
                    sh 'printenv | sort' 
                    
                    if (env.CHANGE_ID) {
                        echo "--- DATOS DEL PULL REQUEST ---"
                        echo "ID: ${env.CHANGE_ID}"
                        echo "Autor: ${env.CHANGE_AUTHOR}"
                        echo "Correo"
                        echo "Email: ${env.CHANGE_AUTHOR_EMAIL}"
                    } else {
                        echo "ADVERTENCIA: No se detectó un ambiente de Pull Request."
                        echo "Rama actual: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
