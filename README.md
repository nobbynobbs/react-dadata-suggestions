# react-dadata-suggestions

React-компонент для [подсказок dadata](https://dadata.ru/suggestions "official website").

## С чего начать

### Установка
`npm i --save react-dadata-suggestions`

[страница на npm](https://www.npmjs.com/package/react-dadata-suggestions)

### Использование

[Песочница](https://codesandbox.io/embed/p95804280q)

```javascript
import React, { Component } from 'react';
import DadataSuggestions from 'react-dadata-suggestions';
import "react-dadata-suggestions/dist/styles.css";

const token = 'your_token';

class App extends Component {
  render() {
    return (
      <DadataSuggestions
        token={ token }
        onSelect={ (suggestion) => console.log(suggestion) }
      />
    );
  }
}

export default App;

```

### Настройка

#### Пропсы

| prop | type | description | required | default |
|:--------------:|:----------------:|:-------------------:|:----------:|:--------:|
|token| string|ваш api токен|**true**|`''`|
|count|integer|максимальное количество подсказок в списке|false|`10`|
|deferRequestBy|integer|задержка перед запросом в мс|false|`300`|
|placeholder|string| |false|`''`|
|hint|string|подсказка для пользователя в выпадающем списке|false|`Выберите вариант ниже или продолжите ввод`|
|minChars|integer|минимальная длина запроса для обращения к api|false|`3`|
|geolocation|boolean|Приоритет городу пользователя, только для адресов|false|`true`|
|service|string|Доступные значения: `address`, `bank`, `fio`, `email`, `party`|false|`address`|
|highlighting|bool|подсветка совпавших слов в подсказках|false|`true`|
|receivePropsBehaveLikeOnChange|bool|см. ниже| false| `false` |
|value|object|экземпляр подсказки|false|null|
|name|string|имя инпута|false|null|
|readOnly||отметить инпут как readonly|false||
|disabled||отметить инпут как disabled|false||
|suggestionsFormatter (suggestion)|function|кастомный форматтер для подсказок в списке|false||
|selectedSuggestionFormatter (suggestion)|function|кастомный форматтер для выбранной подсказки (результат будет установле в качестве строки запроса)|false||
|specialRequestOptions|object|дополнительные параметры для тела запроса|false||
|onSelect (suggestion)|function|обработчик выбора подсказки|**true**||
|onChange (query)|function|обработчик изменения запроса| false||
|onError (error)|function|обработчик ошибки обращения к api|false||
|onBlur|function|вызывается когда фокус пропадает с элемента|false||
|onFocus|function|вызывается при установке фокуса на элемент|false||

> Структуру `подсказки` можно подсмотреть в [официальной документации к api dadata](https://confluence.hflabs.ru/pages/viewpage.action?pageId=204669100)

- `receivePropsBehaveLikeOnChange` - только для версий < 2.0.
  Изменяет поведение`componentWillReceiveProps`. По умолчанию при обновлении пропсов
  просто сбрасывается стейт, если же значение установлено в `true`, то
  поведение `componentWillReceiveProps` совпадает с поведением `onChange`.
  С версии 2.0 это единственный вариант поведения.

#### Подсветка совпадений

Для кастомизации подсветки переопределите класс `.suggestions-highlighting`.

## License

This project is licensed under the MIT License
