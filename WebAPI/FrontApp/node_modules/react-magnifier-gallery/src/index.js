import React, {Component} from 'react'
import './index.scss'
import videoPlayIcon from './video-play-icon.png'

export default class Gallery extends Component {
  constructor() {
    super()

    this.previewWidth = 250
    this.previewHeight = 250
    this.state = {
      photos: [],
      selectedPhoto: {},
      lensStyle: {
        display: 'none',
        left: '0px',
        top: '0px',
        width: '0px',
        height: '0px'
      },
      zoomAreaStyle: {
        display: 'none'
      },
      zoomImgStyle: {
        left: '0px',
        top: '0px'
      },
      thumbContainerStyle: {
        left: '0px'
      }
    }

    this.config = {
      moveLength: 0,
      viewNumber: 5,
      stepNumber: 1,
      step: 46
    }
  }

  componentWillMount() {
    const {photos} = this.props
    this.setState({photos: photos}, function () {
      photos.length > 0 && this.setState({selectedPhoto: photos[0]})
      this.preload()
    }.bind(this))
  }

  getCommonSize() {
    let commonSize = {}
    const zoomSrc = document.getElementById('zoomSrc')
    if (zoomSrc) {
      const mask = zoomSrc.getElementsByTagName('div')[0]
      const lens = mask.getElementsByTagName('span')[0]
      commonSize.mask = this.getOffset(mask)
      commonSize.mask.width = mask.offsetWidth
      commonSize.mask.height = mask.offsetHeight
      commonSize.lens = {width: lens.offsetWidth, height: lens.offsetHeight}
    }
    const zoomArea = document.getElementById('zoomArea')
    if (zoomArea) {
      const zoomImg = zoomArea.getElementsByTagName('img')[0]
      commonSize.zoomArea = {width: zoomArea.offsetWidth, height: zoomArea.offsetHeight}
      commonSize.zoomImg = {width: zoomImg.offsetWidth, height: zoomImg.offsetHeight}
    }
    return commonSize
  }

  preload() {
    let images = []
    this.state.photos.forEach((photo, idx) => {
      images[idx] = new Image()
      images[idx].src = photo.full
    })
  }

  getOffset(node) {
    let leftOffset = node.offsetLeft
    let topOffset = node.offsetTop
    while ((node = node.offsetParent) != null) {
      leftOffset += node.offsetLeft
      topOffset += node.offsetTop
    }
    return {'left': leftOffset, 'top': topOffset}
  }

  setStyle(stateName, obj) {
    let stateValue = this.state[stateName]
    Object.keys(obj).forEach((key) => {
      stateValue[key] = obj[key]
    })
    this.setState({stateName: stateValue})
  }

  onPreview(photo) {
    this.setState({selectedPhoto: photo})
  }

  onNext() {
    let currentLeft = this.state.thumbContainerStyle.left.split('px')[0]
    let stride = this.config.step * this.config.stepNumber
    let countLength = (this.state.photos.length - this.config.viewNumber) * stride
    if (this.config.moveLength < countLength) {
      this.setStyle('thumbContainerStyle', {left: parseInt(currentLeft) - stride + 'px'})
      this.config.moveLength += stride
    }
  }

  onPrev() {
    let currentLeft = this.state.thumbContainerStyle.left.split('px')[0]
    let stride = this.config.step * this.config.stepNumber
    if (this.config.moveLength > 0) {
      if (this.config.moveLength > stride) {
        this.setStyle('thumbContainerStyle', {left: parseInt(currentLeft) + stride + 'px'})
        this.config.moveLength -= stride
      } else {
        this.setStyle('thumbContainerStyle', {left: parseInt(currentLeft) + this.config.moveLength + 'px'})
        this.config.moveLength = 0
      }
    }
  }

  onMouseOverHandler() {
    this.setStyle('lensStyle', {display: 'block'})
    this.setStyle('zoomAreaStyle', {display: 'block'})
  }

  onMouseOutHandler() {
    this.setStyle('lensStyle', {display: 'none'})
    this.setStyle('zoomAreaStyle', {display: 'none'})
  }

  onMouseMoveHandler(event) {
    const commonSize = this.getCommonSize()
    let innerArea = {
      width: commonSize.mask.width - commonSize.lens.width,
      height: commonSize.mask.height - commonSize.lens.height
    }
    let x = event.clientX - commonSize.mask.left - commonSize.lens.width / 2
    let y = event.clientY - commonSize.mask.top - commonSize.lens.height / 2
    if (x < 0) {
      x = 0
    } else if (x > innerArea.width) {
      x = innerArea.width
    }
    if (y < 0) {
      y = 0
    } else if (y > innerArea.height) {
      y = innerArea.height
    }

    this.setStyle('lensStyle', {left: x + 'px', top: y + 'px'})
    this.setStyle('zoomImgStyle', {
      left: innerArea.width == 0 ? 0 : -(x / innerArea.width) * (commonSize.zoomImg.width - commonSize.zoomArea.width) + 'px',
      top: innerArea.height == 0 ? 0 : -(y / innerArea.height) * (commonSize.zoomImg.height - commonSize.zoomArea.height) + 'px'
    })
  }

  displayScroll() {
    if (this.props.displaySingle) {
      return ''
    } else {
      return (
        <div className="scroll">
          <a className="prev" onClick={ this.onPrev.bind(this) }>&lt;</a>
          <a className="next" onClick={ this.onNext.bind(this) }>&gt;</a>
          <div className="items">
            <ul id="imgContainer" style={this.state.thumbContainerStyle}>
              {
                this.state.photos.map((photo) => {
                  if(photo.video){
                    return(
                      <li>
                        <img className="video-play-icon" src={videoPlayIcon} onMouseMove={this.onPreview.bind(this, photo)}/>
                      </li>
                    )
                  } else {
                    return (
                      <li><img src={photo.thumb} onMouseMove={this.onPreview.bind(this, photo)}/></li>
                    )
                  }
                })
              }
            </ul>
          </div>
        </div>)
    }
  }

  onLoadMediaHandler(event) {
    const naturalWidth = event.target.naturalWidth ? event.target.naturalWidth : event.target.videoWidth,
      naturalHeight = event.target.naturalHeight ? event.target.naturalHeight : event.target.videoHeight,
      ratio = naturalWidth / naturalHeight
    if (ratio > 1) {
      const width = this.previewWidth > naturalWidth ? naturalWidth : this.previewWidth,
        height = parseInt(this.previewWidth / ratio) > naturalHeight ? naturalHeight : parseInt(this.previewWidth / ratio),
        size = {
          width: width + 'px',
          height: height + 'px',
          top: this.previewWidth * (1 - 1 / ratio) / 2,
          position: 'absolute'
        },
        len = this.previewWidth * this.previewWidth / naturalWidth
      this.setState({selectedPhotoStyle: size, zoomMaskStyle: size})
      this.setStyle('lensStyle', {
        width: len > width ? width : len, height: len > height ? height : len
      })
    } else {
      const width = parseInt(this.previewHeight * ratio) > naturalWidth ? naturalWidth : parseInt(this.previewHeight * ratio),
        height = this.previewHeight > naturalHeight ? naturalHeight : this.previewHeight,
        size = {
          width: width + 'px',
          height: height + 'px',
          left: this.previewHeight * (1 - ratio) / 2,
          position: 'absolute'
        },
        len = this.previewHeight * this.previewHeight / naturalHeight
      this.setState({selectedPhotoStyle: size, zoomMaskStyle: size})
      this.setStyle('lensStyle', {
        width: len > width ? width : len, height: len > height ? height : len
      })
    }
  }

  render() {
    if (this.state.photos.length > 0) {
      return (
        <div className="gallery">
          {this.state.selectedPhoto.video ?
            (
              <div className="preview">
                <video style={this.state.selectedPhotoStyle} src={this.state.selectedPhoto.full} controls="true" onLoadedData={this.onLoadMediaHandler.bind(this)} />
              </div>
            )
            :
            (
              <div className="preview">
                <div id="zoomSrc">
                  <img style={this.state.selectedPhotoStyle} src={this.state.selectedPhoto.full}
                       onLoad={this.onLoadMediaHandler.bind(this)}/>
                  <div className="zoomMask"
                       style={ this.state.zoomMaskStyle }
                       onMouseOver={ this.onMouseOverHandler.bind(this) }
                       onMouseMove={ this.onMouseMoveHandler.bind(this) }
                       onMouseOut={ this.onMouseOutHandler.bind(this) }>
                    <span className="zoomLens" style={this.state.lensStyle}></span>
                  </div>
                </div>
                <div id="zoomArea" style={this.state.zoomAreaStyle}>
                  <img src={this.state.selectedPhoto.full} style={this.state.zoomImgStyle}/>
                </div>
              </div>
            )}
          { this.displayScroll()}
        </div>
      )
    } else {
      return (
        <div className="gallery-empty">
          No Photo
        </div>
      )
    }
  }
}
