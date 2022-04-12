export const hotWordsOption = {
  series: [{
    type: 'wordCloud',
    left: 'center',
    top: 'center',
    width: '90%',
    height: '90%',
    right: null,
    bottom: null,
    gridSize: 10,
    sizeRange: [12, 40],
    rotationRange: [-45, 45],
    shape: 'circle',
    drawOutOfBound: true,
    layoutAnimation: true,
    textStyle: {
      color: '#3C5DA4'
    },
    emphasis: {
      focus: 'self',
      textStyle: {
        textShadowBlur: 10,
        textShadowColor: '#ddd'
      }
    },
    data: []
  }]
}
