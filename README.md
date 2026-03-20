# az-widget-fr

# 🚀 Azure DevOps Widget: Hola Mundo

Este proyecto es una extensión para dashboards de Azure DevOps. Sigue estos pasos para configurar tu entorno y publicar actualizaciones.

## 🛠 1. Requisitos Previos

Antes de empezar, asegúrate de tener instalado lo siguiente:

* **Node.js (LTS):** [Descargar aquí](https://nodejs.org/). (Incluye `npm`).
* **TFX-CLI:** La herramienta oficial de Microsoft para empaquetar extensiones.
    ```bash
    npm install -g tfx-cli
    ```

---

## 📥 2. Configuración Inicial del Proyecto

Si acabas de clonar el repositorio o estás empezando de cero:

1.  **Instalar dependencias de Node:**
    ```bash
    npm install
    ```
2.  **Preparar el SDK (Paso Crítico):**
    Asegúrate de que el archivo `VSS.SDK.min.js` esté en la ruta correcta para que el HTML lo encuentre:
    * Crea la carpeta: `mkdir -p home/sdk/scripts`
    * Copia el archivo: 
        * **Windows:** `copy node_modules\vss-web-extension-sdk\lib\VSS.SDK.min.js home\sdk\scripts\`
        * **Mac/Linux:** `cp node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js home/sdk/scripts/`

---

## 🏗 3. Compilación y Empaquetado

Cada vez que hagas un cambio en el código (HTML, CSS o JS), debes generar un nuevo archivo `.vsix`:

1.  **Subir la versión:** Edita el archivo `vss-extension.json` y aumenta el número en `"version": "1.0.X"`. **Azure DevOps no aceptará una versión que ya exista.**
2.  **Crear el paquete:**
    ```bash
    tfx extension create --manifest-globs vss-extension.json
    ```
    *Esto generará un archivo con extensión `.vsix` en la raíz de tu carpeta.*

---

## 🚢 4. Publicación y Actualización

1.  Ve al **Marketplace Publisher Portal**: [https://marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)
2.  Busca tu extensión y haz clic en los tres puntos `...`.
3.  Selecciona **Update**.
4.  Sube el nuevo archivo `.vsix` generado.
5.  **Importante:** Espera a que el estado cambie a "Verified".

---

## 🔍 5. Verificación en el Dashboard

Para ver los cambios reflejados:
1.  Ve a tu Dashboard en Azure DevOps.
2.  Presiona **`Ctrl + F5`** para limpiar la caché del navegador.
3.  Si el widget sigue sin actualizarse, verifica en `Organization Settings > Extensions` que la versión instalada sea la correcta.

---

## 📁 Estructura del Proyecto

```text
├── vss-extension.json    # Manifiesto de la extensión
├── hello-world.html      # Código de tu widget
├── home/
│   └── sdk/
│       └── scripts/
│           └── VSS.SDK.min.js  # SDK extraído de node_modules
├── img/                  # Iconos y capturas de pantalla
└── node_modules/         # Dependencias (no se suben al Marketplace)
```
