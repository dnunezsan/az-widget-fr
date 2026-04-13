pipeline {
    agent any
    
    stages {
        stage('Procesar Cambio') {
            steps {
                script {
                    // Lógica robusta para obtener el email
                    def targetEmail = env.CHANGE_AUTHOR_EMAIL
                    
                    if (!targetEmail || targetEmail == 'null') {
                        targetEmail = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
                    }

                    echo "Notificando al autor: ${targetEmail}"

                    // Aquí insertas tu lógica de envío de correo
                    // emailext (
                    //     to: "${targetEmail}",
                    //     subject: "Build ${currentBuild.currentResult}: PR #${env.CHANGE_ID}",
                    //     body: "Tu cambio ha sido procesado. Detalles en: ${env.BUILD_URL}"
                    // )
                }
            }
        }
    }
}
