import {useState} from 'react'
import './App.scss'

const albums = [
  {
    name: 'Showbiz',
    backColor: 'rgb(14, 99, 162)',
    color: 'black',
    songs: ['Sunburn', 'Muscle Museum', 'Unintended', 'Hate This and I\'ll Love You'],
    img: 'showbiz'
  },
  {
    name: 'Origin of Symmetry',
    backColor: 'rgb(255, 170, 1)',
    color: 'black',
    songs: ['New Born', 'Bliss', 'Space Dementia', 'Hyper Music', 'Plug in Baby',
      'Citizen Erased', 'Micro Cuts', 'Screenager', 'Feeling Good', 'Megalomania', 'Futurism'],
    img: 'origin'
  },
  {
    name: 'Hullabaloo Soundtrack',
    backColor: 'rgb(1, 99, 63)',
    color: 'black',
    songs: ['Yes Please', 'Map of Your Head', 'Nature_1', 'Ashamed', 'The Gallery'],
    img: 'hullabaloo'
  },
  {
    name: 'Absolution',
    backColor: 'rgb(203, 204, 203)',
    color: 'black',
    songs: ['Apocalypse Please', 'Time is Running Out', 'Hysteria', 'Blackout',
      'The Small Print', 'Thoughts of a Dying Atheist', 'Fury'],
    img: 'absolution'
  },
  {
    name: 'Black Holes and Revelations',
    backColor: 'rgb(195, 77, 31)',
    color: 'lightgray',
    songs: ['Take a Bow', 'Supermassive Black Hole', 'Map of the Problematique',
      'Soldier\'s Poem', 'Assassin', 'Exo-Politics', 'Knights of Cydonia'],
    img: 'revelations'
  },
  {
    name: 'The Resistance',
    backColor: 'rgb(77, 89, 194)',
    color: 'black',
    songs: ['Uprising', 'Undisclosed Desires', 'Unnatural Selection', 'MK Ultra', 'Exogeneis'],
    img: 'resistance'
  },
  {
    name: 'The 2nd Law',
    backColor: 'rgb(67, 52, 126)',
    color: 'black',
    songs: ['Supremacy', 'Madness', 'Panic Station', 'Follow me', 'Animals',
      'Big Freeze', 'Unsustainable', 'Isolated System'],
    img: 'law'
  },
  {
    name: 'Drones',
    backColor: 'rgb(132, 56, 26)',
    color: 'lightgray',
    songs: ['Psycho', 'Mercy', 'Reapers', 'The Handler', 'Revolt', 'Aftermath'],
    img: 'drones'
  },
  {
    name: 'Simulation Theory',
    backColor: 'rgb(210, 138, 183)',
    color: 'black',
    songs: ['Algorithm', 'The Dark Side', 'Pressure', 'Break It To Me',
      'Something Human', 'Thought Contagion', 'Get up and Fight', 'Blockades', 'The Void',
      'Algorithm (Alternate Reality)', 'The Dark Side (Alternate Reality)', 'The Void (Acoustic)'],
    img: 'simulation'
  },
  {
    name: 'Will Of The People',
    backColor: 'rgb(254, 210, 154)',
    color: 'black',
    songs: ['Will Of The People', 'Compliance', 'Won\'t Stand Down', 'Kill Or Be Killed'],
    img: 'will'
  }
]

const App = () => {

  const [bgColor, setBgColor] = useState('black')
  const [textColor, setTextColor] = useState('grey')
  const [resultText, setResultText] = useState('Click to get good music')
  const [skips, setSkips] = useState([...Array(albums.length)].fill(false))

  const give = () => {
    if (!skips.includes(false)) {return}
    let randomAlbum = Math.floor(Math.random() * albums.length)
    while (skips[randomAlbum]) {randomAlbum = Math.floor(Math.random() * albums.length)}
    let randomSong = Math.floor(Math.random() * albums[randomAlbum].songs.length)
    let newResultText = albums[randomAlbum].songs[randomSong] + ' - ' + albums[randomAlbum].name

    setResultText(newResultText)
    setBgColor(albums[randomAlbum].backColor)
    setTextColor(albums[randomAlbum].color)

    navigator.clipboard.writeText(newResultText)
  }

  const handleSkip = (e, i) => {
    e.stopPropagation()

    let newSkips = [...skips]

    newSkips[i] = !newSkips[i]
    setSkips(newSkips)
  }

  const toggleAll = (e) => {
    e.stopPropagation()
    if (skips.includes(false)) {
      setSkips(Array(skips.length).fill(true))
    } else {
      setSkips(Array(skips.length).fill(false))
    }
  }

  return (
    <div
      id='appContainer'
      onClick={() => give()}
      style={{backgroundColor: bgColor, cursor: skips.includes(false) ? 'pointer' : 'not-allowed'}}
    >
      <div id='filterPanel' style={{cursor: 'auto'}}>
        {albums?.map((elem, i) => (
          <div
            key={i}
            style={{marginRight: 15}}
            className={'albumCover' + (skips[i] ? ' skipped' : '')}
            onClick={(e) => handleSkip(e, i)}
          >
            <img
              style={{border: '2px solid black'}}
              src={require('./assets/' + elem.img + '.jpg')}
            />
          </div>
        ))}
        <div
          className='albumCover'
          style={{alignItems: 'center', justifyContent: 'center'}}
          onClick={(e) => toggleAll(e)}
        >
          Toggle all
        </div>
      </div>
      <div id='result' style={{color: textColor}}>{resultText}</div>
      <div id='bottomText' style={{color: textColor}}>Result copied to clipboard</div>
    </div>
  )
}

export default App
