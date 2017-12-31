# react-dadata-suggestions

Just another one React component for [dadata suggestions](https://dadata.ru/suggestions "official website").

## Getting started

### Basic usage

[![Edit p95804280q](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/p95804280q)

```
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

### Available props

#### Options
* `token` - string, api token, required
* `count` - integer, limit for list of suggestions. Optional. Default value is `10`, maximum is `20`. 
* `hint` - string, hint for user in suggestions list. Optional. Default value `Выберите вариант ниже или продолжите ввод`
* `minChars` - integer, minimum length of query for requesting to api. Optional, default `3`
* `geolocation` - boolean, priority to user city. Optional, default `true`. Works for address suggestions only.
* `service` - string, optional, default value `address`, available values:
  * `address`
  * `bank`
  * `fio`
  * `party` - I don't know why, but api for searching of the companies is called "party"
  * `email`

* `suggestionsFormatter(suggestion)` - function, custom formatter for items in suggestions list. Optional.
* `selectedSuggestionFormatter(suggestion)` - the same for selected suggestion (result will be placed in query string). Optional.

#### Callbacks
* `onSelect(suggestion)` - be called when user select the address from suggestions. **Required!**
The structure of `suggestion` can be found in [official documentation](https://confluence.hflabs.ru/pages/viewpage.action?pageId=204669107)
* `onChange(query)` - be called when user typing something in input field. Optional.

## License

This project is licensed under the MIT License
