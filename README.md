# iFunny API  

Unofficial API Wrapper for iFunny  

![image](https://user-images.githubusercontent.com/17960677/99189452-38af1a80-2787-11eb-9ab7-1fb7b21522b2.png)

## Example

```js
var Ifunny = require("node-ifunny");
var ifunny = new Ifunny();

(async function() {
  await ifunny.login(email,password);
  // or
  await ifunny.addToken(token);
  // To use existing access token (recommended)

  await ifunny.postimg(image_url);

  await ifunny.postvid(vid_url);
})();
```

## Contributing

Thank you for your interest in contributing, If you feel like there's something missing or any new feature can be added, just create a PR and I will see the rest.

## Help

You can contact me on social media, Everything about me can be found [here](https://theabbie.github.io)

## Installation

### Requirements

* Node.Js installed

### Dev Dependencies

* Axios

## Credits

* [iFunny](https://ifunny.co) For making an excellent platform

## Contact

Contact me anywhere, just visit [my portfolio](https://theabbie.github.io)

## License

This project is licensed under MIT License, See [LICENSE](/LICENSE) for more information.

