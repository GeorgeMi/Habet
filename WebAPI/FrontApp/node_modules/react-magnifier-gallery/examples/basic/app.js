import React from 'react'
import { render } from 'react-dom'
import Gallery from '../../src/index'

const imgUrl = [
  {thumb: 'https://dummyimage.com/60x40/000/fff', full: 'https://dummyimage.com/1000x800/000/fff.png'},
  {thumb: 'https://dummyimage.com/60x40/5ff011/0011ff', full: 'https://dummyimage.com/1000x800/5ff011/0011ff'},
  {full: './demo.mp4', video: true},
  {thumb: 'https://dummyimage.com/60x40/000/fff', full: 'https://dummyimage.com/1000x800/000/fff.png'},
  {thumb: 'https://dummyimage.com/60x40/5ff011/0011ff', full: 'https://dummyimage.com/1000x800/5ff011/0011ff'},
  {thumb: 'https://dummyimage.com/60x40/0e0ef0/ff0000.png', full: 'https://dummyimage.com/1000x800/0e0ef0/ff0000.png'},
  {thumb: 'https://dummyimage.com/60x40/000/fff', full: 'https://dummyimage.com/1000x800/000/fff.png'},
  {thumb: 'https://dummyimage.com/60x40/0e0ef0/ff0000.png', full: 'https://dummyimage.com/1000x800/0e0ef0/ff0000.png'},
]
const App = () => (
  <div>
    <Gallery photos={imgUrl}/>
  </div>
)
render(<App />, document.getElementById('container'))
