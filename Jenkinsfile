pipeline {
    agent any
    stages {
        stage('Debug Variables') {
            steps {
                script {
                    // Esto imprimirá todas las variables de entorno para que las veas en el log
                    sh 'printenv | sort' 

                    
                    // Intentamos obtenerlo de la variable, si no, lo sacamos del autor del commit
                    def prEmail = env.CHANGE_AUTHOR_EMAIL
                    
                    if (!prEmail || prEmail == 'null') {
                        echo "La variable CHANGE_AUTHOR_EMAIL es nula, extrayendo de git log..."
                        // %ae obtiene el email del autor del commit actual
                        prEmail = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
                    }
                
                    echo "--- FINAL DESTINATION ---"
                    echo "Email a notificar: ${prEmail}"

                    
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

