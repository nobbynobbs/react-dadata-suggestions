# react-dadata-suggestions

Just another one React component for [dadata suggestions](https://dadata.ru/suggestions "official website").

## Getting started

### Installation
`npm i --save react-dadata-suggestions`

[page on npm](https://www.npmjs.com/package/react-dadata-suggestions) 

### Basic usage

[![Edit p95804280q](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p95804280q)

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

### Available props

#### Options

| prop | type | description | required | default |
|:--------------:|:----------------:|:-------------------:|:----------:|:--------:|
|token| string|api token|**true**|`''`|
|count|integer|maximal suggestions count in list|false|`10`|
|deferRequestBy|integer|delay in milliseconds before each request|false|`300`|
|placeholder|string| |false|`''`|
|hint|string|hint for user in suggestions list|false|`Выберите вариант ниже или продолжите ввод`|
|minChars|integer|minimal length of query for requesting to api|false|`3`|
|geolocation|boolean|priority to user city. Works for address suggestions only.|false|`true`|
|service|string|available values: `address`, `bank`, `fio`, `email` and `party` (I don't know why, but api for searching of the companies is called "party")|false|`address`|
|highlighting|bool|highlight matched words in suggestions|false|`true`|
|receivePropsBehaveLikeOnChange|bool|see below| false| `false` |
|suggestionsFormatter (suggestion)|function|custom formatter for items in suggestions list|false||
|selectedSuggestionFormatter (suggestion)|function|the same as previous for selected suggestion (result will be placed in query string)|false||
|specialRequestOptions|object|additional data for request body|false||
|onSelect (suggestion)|function| be called when user select the address from suggestions|**true**||
|onChange (query)|function|be called when user typing something in input field| false||
|onError (error)|function|will be called if api request failed|false||
|onBlur|function|will be called on focus out|false||

> The structure of `suggestion` object can be found in [official dadata api documentation](https://confluence.hflabs.ru/pages/viewpage.action?pageId=204669100)

- `receivePropsBehaveLikeOnChange` - change the behavior of `componentWillReceiveProps` life-cycle hook. By default this handler just resets the state of component. If this prop is set to `true` `componentWillReceiveProps` will behave exactly like `onChange` handler do. Probably it must be the only behavior, but the first implementation was keeped as default for backward compability reasons.


## License

This project is licensed under the MIT License
