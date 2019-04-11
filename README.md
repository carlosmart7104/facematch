## Para obtener una copia del proyecto en local, con git
Moverse a la carpeta donde se desea trabajar y ejecutar en la terminal:
``` bash
git clone https://gitlab.com/tecnologias-hexagono/facematch.git
```

## Requisitos previos
Tener instalado cordova
``` bash
npm i -g cordova
```

Tener instalado quasar cli
``` bash
npm i -g @quasar/cli
```

## Preparando el proyecto
En la carpeta de instalación:
``` bash
npm i // para instalar las dependencias
quasar dev // para desarrollar en navegador ó
quasar dev -m cordova -T android -D // para desarrollar en el dispositivo
```

## Verificando la instalación
Para probar que todo anda bién con cordova, en la carpeta del proyecto, hay una llamada src-cordova.
``` bash
cd src-c* // moverse a esa carpeta
```

Dentro de esa se pueden usar los comandos de cordova, pues de hecho es un proyecto de cordova
``` bash
cordova requirements // para que cordova verifique que las dependencias del proyecto están instaladas
cordova platform ls // lista las plataformas instaladas (android, ios, etc)
cordova platform add android@7.1.1 // ya está instalado pero por si no lo estuviera
cordova plugin ls // lista los plugins, debe haber 3: whitelist, camerastream y permissions
```



Para más información sobre la terminal de cordova, visitar la documentación oficial:
https://cordova.apache.org/docs/en/latest/

Para más información sobre la terminal de quasar, visitar la documentación oficial:
https://v1.quasar-framework.org/quasar-cli/installation

Actualmente el proyecto usa la última versión de @quasar/cli, pero la versión estable del framework:
https://quasar-framework.org/guide/
