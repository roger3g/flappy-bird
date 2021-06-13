const sprites = new Image()
sprites.src = 'assets/images/sprites.png'

const hitSound = new Audio()
hitSound.src = 'assets/sound-effects/hit.wav'

const canvas = document.querySelector( 'canvas' )
const context = canvas.getContext( '2d' )

let frames = 0
let GlobalData = {}
let ActiveScreen = {}

const makeCollision = (FlapyBird, Floor) => {
  const flapyBirdPositionY = FlapyBird.positionY + FlapyBird.height
  const floorPositionY = Floor.positionY

  if (flapyBirdPositionY >= floorPositionY) {
    return true
  }

  return false
}

const createFloor = () => {
  const Floor = { 
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    positionX: 0,
    positionY: canvas.height - 112,

    update() {
      const groundMovement = 1
      const repeatOn = Floor.width / 2
      const movement = Floor.positionX - groundMovement
      Floor.positionX = movement % repeatOn
    },

    draw() {
      context.drawImage(
        sprites,
        Floor.spriteX, Floor.spriteY, 
        Floor.width, Floor.height,
        Floor.positionX, Floor.positionY,
        Floor.width, Floor.height
      )

      context.drawImage(
        sprites,
        Floor.spriteX, Floor.spriteY, 
        Floor.width, Floor.height,
        (Floor.positionX + Floor.width), Floor.positionY,
        Floor.width, Floor.height
      )
    }
  }

  return Floor
}

const createFlapyBird = () => {
  const FlapyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    positionX: 10,
    positionY: 50,
    gravity: 0.25,
    speed: 0,
    jumSize: 4.6,

    jump() {
      FlapyBird.speed = - FlapyBird.jumSize
    },

    update() {
      if (makeCollision(FlapyBird , GlobalData.Floor)) {
        hitSound.play()
        switchToScreen(Screens.GAME_OVER)
        return
      }

      FlapyBird.speed += FlapyBird.gravity
      FlapyBird.positionY += FlapyBird.speed
    },

    movement: [
      {spriteX: 0 , spriteY: 0},
      {spriteX: 0 , spriteY: 26},
      {spriteX: 0 , spriteY: 52},
      {spriteX: 0 , spriteY: 26},
    ],

    currentFrame: 0,

    updateCurrentFrame() {
      const frameRange = 10
      const theIntervalHasPassed = frames % frameRange === 0

      if (theIntervalHasPassed) {
        const incrementBase = 1
        const increment = incrementBase + FlapyBird.currentFrame
        const repetitionBasis = FlapyBird.movement.length
        FlapyBird.currentFrame = increment % repetitionBasis
      }
    },

    draw() {
      FlapyBird.updateCurrentFrame()
      const {spriteX , spriteY} = FlapyBird.movement[FlapyBird.currentFrame]

      context.drawImage(
        sprites,
        spriteX, spriteY, 
        FlapyBird.width, FlapyBird.height,
        FlapyBird.positionX, FlapyBird.positionY,
        FlapyBird.width, FlapyBird.height
      )
    }
  }
  return FlapyBird
}

const switchToScreen = newScreen => {
  ActiveScreen = newScreen
  
  if (ActiveScreen.initializes) {
    ActiveScreen.initializes()
  }
}

const createPipes = () => {
  const Pipes = {
    width: 52,
    height: 400,

    floor: {
      spriteX: 0,
      spriteY: 169,
    },

    sky: {
      spriteX: 52,
      spriteY: 169,
    },

    space: 80,

    draw() {
      Pipes.pairs.forEach(pair => {
        const randomPositionY = pair.y
        const pipeSpacing = 90

        const skyPipePositionX = pair.x
        const skyPipePositionY = randomPositionY

        context.drawImage(
          sprites,
          Pipes.sky.spriteX, Pipes.sky.spriteY, 
          Pipes.width, Pipes.height,
          skyPipePositionX, skyPipePositionY,
          Pipes.width, Pipes.height
        )

        const floorPipePositionX = pair.x
        const floorPipePositionY = Pipes.height + pipeSpacing + randomPositionY

        context.drawImage(
          sprites,
          Pipes.floor.spriteX, Pipes.floor.spriteY, 
          Pipes.width, Pipes.height,
          floorPipePositionX, floorPipePositionY,
          Pipes.width, Pipes.height
        )

        pair.pipeSky = {
          x: skyPipePositionX,
          y: Pipes.height + skyPipePositionY
        }

        pair.pipeFloor = {
          x: floorPipePositionX,
          y: floorPipePositionY
        }
      })
    },

    hasCollisionWithFlappyBird( pair ) {
      const flappyHead = GlobalData.FlapyBird.positionY
      const flappyFoot = GlobalData.FlapyBird.positionY + GlobalData.FlapyBird.height

      if ( (GlobalData.FlapyBird.positionX + GlobalData.FlapyBird.width) >= pair.x ) {

        if ( flappyHead <= pair.pipeSky.y ) {
          return true
        }

        if ( flappyFoot >= pair.pipeFloor.y ) {
          return true
        }

        return false
      }

    },
    pairs: [],

    update() {
      const framesPassed100 = frames % 100 === 0

      if ( framesPassed100 ) {
        Pipes.pairs.push( 
          { x: canvas.width, y: -150 * ( Math.random() + 1 ) }
        )
      }

      Pipes.pairs.forEach( pair => {
        pair.x = pair.x -2

        if ( Pipes.hasCollisionWithFlappyBird( pair ) ) {
          hitSound.play()
          switchToScreen( Screens.GAME_OVER )
        }

        if ( pair.x + Pipes.width <= 0 ) {
          Pipes.pairs.shift()
        }
      } )

    }
  }

  return Pipes
}

const createBoard = () => {
  const board = {
    punctuation: 0,

    draw() {
      context.font = '35px "VT323"'
      context.textAlign = 'right'
      context.fillStyle = 'white'
      context.fillText(board.punctuation, canvas.width - 10, 35)
    },

    update() {
      const frameRange = 20
      const theIntervalHasPassed = frames % frameRange === 0
      
      if (theIntervalHasPassed) {
        board.punctuation += 1 
      }
    }
  }
  return board
}

const renderImages = () => {

  ActiveScreen.draw()
  ActiveScreen.update()
  frames += 1
  
  requestAnimationFrame(renderImages)
}

const Background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  positionX: 0,
  positionY: canvas.height - 204,

  draw() {
    context.fillStyle = '#70C5CE'
    context.fillRect(0 , 0 , canvas.width , canvas.height)

    context.drawImage(
      sprites,
      this.spriteX, this.spriteY, 
      this.width, this.height,
      this.positionX, this.positionY,
      this.width, this.height
    )

    context.drawImage(
      sprites,
      this.spriteX, this.spriteY, 
      this.width, this.height,
      (this.positionX + this.width), this.positionY,
      this.width, this.height
    )
  }
}

const GetReadyMessage = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  positionX: (canvas.width / 2) - 174 / 2,
  positionY: 50,

  draw() {
    context.drawImage(
      sprites,
      this.spriteX, this.spriteY, 
      this.width, this.height,
      this.positionX, this.positionY,
      this.width, this.height
    )
  }
}

const GameOverMessage = {
  spriteX: 134,
  spriteY: 153,
  width: 226,
  height: 200,
  positionX: (canvas.width / 2) - 226 / 2,
  positionY: 50,

  draw() {
    context.drawImage(
      sprites,
      this.spriteX, this.spriteY, 
      this.width, this.height,
      this.positionX, this.positionY,
      this.width, this.height
    )
  }
}

const Screens = {
  START: {
    initializes() {
      GlobalData.FlapyBird = createFlapyBird()
      GlobalData.Floor = createFloor()
      GlobalData.Pipes = createPipes()
    },

    draw() {
      Background.draw()
      GlobalData.FlapyBird.draw()
      GlobalData.Floor.draw()
      GetReadyMessage.draw()
    },

    click() {
      switchToScreen(Screens.GAME)
    },

    update() {
      GlobalData.Floor.update()
    }
  },

  GAME: {
    initializes() {
      GlobalData.board = createBoard()
    },
    draw() {
      Background.draw()
      GlobalData.Pipes.draw()
      GlobalData.Floor.draw()
      GlobalData.FlapyBird.draw()
      GlobalData.board.draw()
    },

    click() {
      GlobalData.FlapyBird.jump()
    },

    update() {
      GlobalData.Pipes.update()
      GlobalData.Floor.update()
      GlobalData.FlapyBird.update()
      GlobalData.board.update()
    }
  }
}

Screens.GAME_OVER = {
  draw() {
    GameOverMessage.draw()
  },

  update() {},

  click() {
    switchToScreen(Screens.START)
  }
}

canvas.addEventListener('click', () => {
  if (ActiveScreen.click) {
    ActiveScreen.click()
  }
})

switchToScreen(Screens.START)
renderImages()