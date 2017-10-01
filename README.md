![Calligraphy.js](assets/logo3.png)
____________________


Calligraphy.js is a lightweight JavaScript class that allows you to render text in an animated fashion in the font of your choice, giving them the appearance of hand written calligraphy. You can configure the text to have a color, font, font size, animation type and more to achieve a beautiful handwritten animated text effect in your website.

Available Via:
* [NPM](https://www.npmjs.com/package/calligraphy.js): `npm install calligraphy.js`

## Principles

To get this effect, the script uses opentype js to parse the font you provide and convert it to svg paths. The script automatically manages spaces to give you a beautifully written text. Once this is done, the magic begins. To get the animation effect to the text, the script splits the text into characters and then start drawing the strokes as provided by the svg with a specified delay to give you a seamless transition effect.

The animation always draws elements in the same order as they are defined in the input string.

## Usage

There are no dependencies here. All you need to do is include the script, the element you want your text yo be rendered in and call the constructor.

```js
npm install calligraphy.js --save
```

```html
<script type='text/js' src='node_modules/calligraphy.js/index.js'></script>
<div id='my-div'></div>
<script>
    new Calligraphy('Hello World', '#my-div');
</script>
```

### Constructor

The Calligraphy constructor asks for 3 parameters:

- Input String.
- query selector of DOM element to interact with.<br/>It can be a wrapper element to append an the svg with your text in it.
- Options object

### Options List

| Name       | Type     | Description |
|------------|----------|-------------|
|`fontFile`  | string   | Defines what font will be used: `path of your custom font file. Library provides a default font if you dont want a custom font to be used` |
|`animationType`  | string   | Defines what kind of animation will be used: `delayed`, `sync`, `oneByOne`, `script`, `scenario` or `scenario-sync`. [Default: `delayed`] |
|`fontSize`      | string   | Defines the size of the text you want to be rendered. |
|`fontColor`     | string   | Defines the color, you want the text to be rendered in. |
|`duration`  | integer  | Animation duration, in frames. [Default: `200`] |
|`delay`     | integer  | Time between the drawing of first and last path, in frames (only for `delayed` animations). |

# Calligraphy.js
