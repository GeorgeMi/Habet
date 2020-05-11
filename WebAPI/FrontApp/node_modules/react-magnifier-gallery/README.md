# react-magnifier-gallery [![Build Status](https://travis-ci.org/xiaohuij/react-magnifier-gallery.svg?branch=master)](https://travis-ci.org/xiaohuij/react-magnifier-gallery) 

Friendly for e-commerce product show

## Features
1. Image list show
2. Keep image width-height ratio
3. Support video
4. Provide magnifier

## Installing

```bash
yarn add react-magnifier-gallery
```

You can also still use npm

```bash
npm install react-magnifier-gallery --save
```

Or use directly in your html as UMD component

```html
<script src="https://unpkg.com/react-magnifier-gallery@1.0.0/dist/react-magnifier-gallery.min.js" />
```

## Run demo

```js
yarn start
```
Or
```bash
npm run start
```

Go to http://localhost:8080

## Basic Usage

```js
import Gallery from 'react-magnifier-gallery';

const imgUrl = [
  {thumb: 'https://dummyimage.com/60x40/000/fff', full: 'https://dummyimage.com/1000x800/000/fff.png'},
  {thumb: 'https://dummyimage.com/60x40/5ff011/0011ff', full: 'https://dummyimage.com/1000x800/5ff011/0011ff'},
  {thumb: 'https://dummyimage.com/60x40/0e0ef0/ff0000.png', full: 'https://dummyimage.com/1000x800/0e0ef0/ff0000.png'},
  {thumb: 'https://dummyimage.com/60x40/000/fff', full: 'https://dummyimage.com/1000x800/000/fff.png'},
  {thumb: 'https://dummyimage.com/60x40/5ff011/0011ff', full: 'https://dummyimage.com/1000x800/5ff011/0011ff'},
  {thumb: 'https://dummyimage.com/60x40/0e0ef0/ff0000.png', full: 'https://dummyimage.com/1000x800/0e0ef0/ff0000.png'},
]
const App = () => (
  <div>
    <Gallery photos={imgUrl}/>
  </div>
)
```

## TODO
> Unit tests

> Gallery size customize

> Extract to fine components

> Support online video

## License

MIT
