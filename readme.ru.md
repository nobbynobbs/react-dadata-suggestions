# react-dadata-suggestions

Еще один реакт компонент для [подсказок дадата](https://dadata.ru/suggestions "official website").

## Getting started

### Установка
`npm i --save react-dadata-suggestions`

[Страница на npm](https://www.npmjs.com/package/react-dadata-suggestions) 

### Пример использования

[![Edit p95804280q](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p95804280q)

```javascript
import React, { Component } from 'react';
import DadataSuggestions from 'react-dadata-suggestions';

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

### Доступные пропсы

#### Параметры

| prop | type | description | required | default |
|:--------------:|:----------------:|:-------------------:|:----------:|:--------:|
|token| string|токен api дадаты|**true**|`''`|
|count|integer|количество подсказок|false|`10`|
|hint|string|подсказка для пользователя|false|`Выберите вариант ниже или продолжите ввод`|
|minChars|integer|минимальная длина строки для запроса|false|`3`|
|geolocation|boolean|Геолокация, приоритет городу пользователя при поиске. Только для адресов.|false|`true`|
|service|string|доступные значения: `address`, `bank`, `fio`, `email` и `party` (сложно объяснить, почему endpoint для поиска организаций называется "party")|false|`address`|
|highlighting|bool|подсветка слов в списке подсказок|false|true|
|suggestionsFormatter (suggestion)|function|пользовательское форматирование подсказок в списке|false||
|selectedSuggestionFormatter (suggestion)|function|пользовательское форматирование выбранной подсказки (для вставки в строку поиска)|false||
|specialRequestOptions|object|дополнительные параметры|false||
|onSelect (suggestion)|function|обработчик выполняемый при выборе подсказки|**true**||
|onChange (query)|function|обработчик, выполяемый при редактировании запроса|false||
|onError (error)|function|обработчик, выполняемый если при обращении к апи произошла ошибка|false||
|onBlur|function|выполняется при уходе фокуса с инпута|false||

> Описание объектов `suggestion` для каждого типа подсказок можно найти в [официальной документации дадаты](https://confluence.hflabs.ru/pages/viewpage.action?pageId=204669100)


## License

MIT License
