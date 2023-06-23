# Notas

Este es el componente frontend de la aplicación, como toda app moderna que se alimente de un servicio, el backend es el responsable de encapsular toda la lógica del negocio.

## Cómo está estructurado este proyecto

### Frontend

Se basa primordialmente en el trabajo previo realizado por el equipo de AdminLTE - React, sin embargo, aún cuando este proyecto está desarrollado con la versión 18.2.0 de React y algunas características experimentales, el ruteo lo hace a la anigüita y no empleando las nuevas capacidades de React Router y su extensvivo empleo de las API's y hooks, por ello toda esta parte tuvo que ser re-escrita.

Asimismo el proyecto original depende de algunas capacidades de VITE que, con los nuevos anuncios de React, donde VITE pasa a segundo plano, al igual que Create React App como las maneras predefinidas de crear un proyecto en React, aún cuando el proyecto en aparienccia se ve un poco más sucio, no quise depender de estas capacidades que tal vez en el futuro, dependiendo del giro de la tecnología queden obsoletas o depreciadas en un corto plazo.

Fuera de ahí todo el código base es esencialmente el mismo, solo cambian los detalles de la implementación en el logeo nativo de la app y quité la opción de Single Sign On con Facebook, ya que el carácter de las aplicaciones administrativas es más profesional y no está pensadas para ser utilizadas con redes sociales, a no ser que se trate de aplicaciones de marketing y aún así tengho mis dudas.

Por lo demás y ante mi falta de experiencia en el desarrollo de Frontend, gran parte de mi labor acá fue de-construir cómo esta el desarrollo realizado y comentar todas aquellas parte interdependientes y este es el objetivo principal, para así dar una idea muy clara de como está construido el administrador de COATI B2B y puedas poner manos a la obra inmediatamente después de haber leído esta pequeña guía.

#### Estructura general de la app

Siguiendo el tutorial propuesto por el equipo de React Router, el punto de entrada a la app es el archivo main.tsx y se eliminó el omnipresente App.tsx así como todos sus archivos relacionados. En el main.tsx se envuelve la aplicación dentro de un Reducer Store, que permite compartir la enorme cantidad de configuraciones fácilmente a través de toda la aplicación.

Asimismo se seleccionó, para los mensajes emergentes la librería Toast, la cual también se encuentra configurada en main.tsx, las configuraciones de cómo se mostrarán estos mensajes no son configurables desde la interfaz del usuario, si requieres realizar un cambio tendrás que editar sus valores directamente en el código.

Como habrás notado inmediatamente, el ruteo también se lleva a cabo por este archivo, siguiendo en todo momento los lineamiento de la nueva forma de hacerlo con React Router.

El peso de toda la interfaz de la aplicación cuando los usuarios están logeados lo realiza el archivo Root.tsx, para las rutas públicas intervienen varios archivos, los cuales podrás identificar fácilmente en main.tsx

Dentro del propio Root.tsx se llama a la función de callBack getAppTemplate la cuál se encarga de renderizar todas las partes del frontend, su contenido es fácilemnte identificable y no requiere de una descrpción más profunda.

#### Store Reducer

Es el encargado de almacenar todas las configuraciones y se subdivide en dos archivos, uno para la autenticación de los usuarios (auth.ts) y otro para la propia interfaz gráfica (ui.ts). Todas estas configuraciones son consumidas a través de las funciones useDispatch, useSelector de React Redux, por lo que no tendrás problema alguno para identificarlas ya que emplean la nomenclatura

``` JavaScript
useSelector((state: any) => state.ui.navbarVariant)  
```

Comprendiendo esta parte, te será muy fácil leer de corrido el código, además que todo ahí donde creí necesario añadir un comentario para identificar que hace cada sección del código, lo hice.

#### Traducciones

La aplicación puede mostrarse, por el momento en dos idionmas, Inglés americano y español latinoaméricano, esto lo logra encapsulando todos los textos mostrados en los archivos translation.json que a su vez se encuentran hospedados dentro del directorio source/locales. Para distinguir cual es cual se emplea el código internacional de 2 letras definido por la W3C, así _en_ es inglés y _es_ es español.

Si necesitas alterar o añadir una traducción sólo sigue el mismo estándar para añadir y buscar más textos.

#### Header.tsx

Se componde de varios submodulos para renderizar cada uno de sus  

### Backend

Es mi primer intento de hacer algo serio con microservicios, docker, etc. para el frontend se han utilizado los siguientes componentes:

