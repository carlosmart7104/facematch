## Para obtener una copia del proyecto en local, con git
Moverse a la carpeta donde se desea trabajar y ejecutar en la terminal:
``` bash
git clone https://gitlab.com/tecnologias-hexagono/facematch.git
```

## Requisitos previos
Se asume que Android Studio está instalado para compilar la aplicación
Se asume que nodejs y npm se encuentran instalados también


Instalar cordova
``` bash
npm i -g cordova
```

Instalar quasar cli
``` bash
npm i -g @quasar/cli
```

## Preparando el proyecto
En la carpeta del proyecto:
``` bash
npm i // para instalar las dependencias
```

## Verificando la instalación
Para probar que todo anda bién con cordova, en la carpeta del proyecto, hay una llamada src-cordova.
``` bash
cd src-c* // moverse a esa carpeta
```

Dentro de esa se pueden usar los comandos de cordova, pues de hecho es un proyecto de cordova
``` bash
cordova requirements // para que cordova verifique que las dependencias del proyecto están instaladas y configuradas
cordova platform ls // lista las plataformas instaladas (android, ios, etc)
cordova platform add android@7.1.1 // ya está instalado pero por si no lo estuviera
cordova plugin ls // lista los plugins, debe haber 3: whitelist, camerastream y android-permissions
```

## Desarrollo
Para arrancar el proyecto en modo interactivo (con debug lints y hotreload)
``` bash
quasar dev // para desarrollar en navegador ó
quasar dev -m cordova -T android // para desarrollar en el dispositivo, se puede agregar -D para forzar a iniciar en un dispositivo físico
```

## Producción
Para compilar un release del proyecto (un apk que no depende del servidor de quasar)
``` bash
quasar build -m cordova -T android
```
** La aplicación resultante deberá ser firmada para poder distribuirla **


Para más información sobre la terminal de cordova, visitar la documentación oficial:
https://cordova.apache.org/docs/en/latest/

Para más información sobre la terminal de quasar, visitar la documentación oficial:
https://v1.quasar-framework.org/quasar-cli/installation

Actualmente el proyecto usa la última versión de @quasar/cli, pero la versión estable del framework:
https://quasar-framework.org/guide/
