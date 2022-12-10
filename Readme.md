# Мини-проект «Кометы»

[![build status](https://github.com/sFlcn/comets/actions/workflows/check-and-deploy.yml/badge.svg)](https://github.com/sFlcn/comets/actions/workflows/check-and-deploy.yml)
![GitHub last commit](https://img.shields.io/github/last-commit/sFlcn/comets?logo=git)

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sFlcn/comets)
![GitHub repo size](https://img.shields.io/github/repo-size/sFlcn/comets)

![Comets starter](./build/images/comets-starter-title.svg)

Небольшой пет-проект, работающий в Canvas на JavaScript.

Идея и стилевое оформление [🦊 lisinica-port.tilda.ws](http://lisinica-port.tilda.ws)

![JavaScript](https://img.shields.io/badge/JavaScript-informational?style=flat&logo=JavaScript&logoColor=f7df1e&color=b3b3b3)
![Webpack](https://img.shields.io/badge/Webpack-informational?style=flat&logo=Webpack&logoColor=8dd6f9&color=b3b3b3)

---

## Разработка

- Установка зависимостей: `npm install`
- Сборка: `npm run build`
- Запуск локального сервера: `npm start`

---

## Техническое задание

### О проекте

«Кометы» — страница с анимацией малых небесных тел, вращающихся вокруг планеты и друг друга.

### Функционал

- На странице отображается окно с просторами космоса и планетой на переднем плане.
- Размеры окна приложения подстраиваются под размер устройства пользователя.
- После загрузки необходимых ресурсов появляется логотип и кнопка "старт", после нажатия которой запускается анимация комет/астероидов, летающих по экрану и за его пределами под воздействием притяжения планеты и друг друга.
- После запуска кнопка старта сменяется на кнопку ускорения, увеличивающую скорость анимации.
