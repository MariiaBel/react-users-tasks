# Фронтенд-клиент для управления пользователями и задачами

Исполнитель: [Мария](https://t.me/MariiaBel)

Demo: [GithubPage](https://mariiabel.github.io/react-users-tasks/dist)

Использованные технологии: React • React Router • TS • JSONPlaceholder API • Axios • CSS • Vite

Работа с API:

-   Пользователи: GET https://jsonplaceholder.typicode.com/users

-   Задачи: GET https://jsonplaceholder.typicode.com/todos?userId={id}

-   Добавление задачи: POST https://jsonplaceholder.typicode.com/todos

-   Обновление статуса: PATCH https://jsonplaceholder.typicode.com/todos/:id

## Функциональность

&check; Страница со списком пользователей.

-   &check; Отображает список пользователей (имя, email).

-   &check; Клик по пользователю открывает страницу с его задачами.

&check; Страница задач пользователя.

-   &check; Отображает список задач пользователя (название, статус "В процессе" / "Готово").

-   &check; Возможность добавлять новые задачи.

-   &check; Возможность изменять статус задачи.

-   &check; Кнопка "Назад" для возврата к списку пользователей.

&check; Работа с API.

&check; Фильтрация задач по статусу.

&check; Удаление задач (DELETE).

Drag & Drop для изменения порядка задач.

&check; Анимации.

## Запуск приложения

```
npm i
nmp run dev
```
