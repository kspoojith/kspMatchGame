import './index.css'
import {Component} from 'react'
import TabItem from '../TabItem'
import MatchGameItem from '../MatchGameItem'
import ScoreCard from '../ScoreCard'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      activeTabId: tabsList[0].tabId,
      displayImage: imagesList[0].id,
      status: 'Playing',
      score: 0,
      sec: 60,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prev => ({
        sec: prev.sec > 0 ? prev.sec - 1 : prev.sec,
        status: prev.sec > 0 ? prev.status : 'finish',
      }))
    }, 1000)
  }

  tabselected = id => {
    this.setState({activeTabId: id})
  }

  onimageselect = id => {
    const {imagesList} = this.props
    const {displayImage} = this.state

    if (displayImage === id) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        displayImage:
          imagesList[Math.floor(Math.random() * imagesList.length)].id,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({status: 'finish'})
    }
  }

  playagain = () => {
    const {imagesList} = this.props

    clearInterval(this.timerId)
    this.startTimer()

    this.setState({
      displayImage: imagesList[0].id,
      score: 0,
      sec: 60,
      status: 'Playing',
    })
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTabId, displayImage, score, sec, status} = this.state
    const filteredImageList = imagesList.filter(
      each => each.category === activeTabId,
    )
    const displayImageUrl = imagesList.filter(each => each.id === displayImage)
    const displayImageUrll = imagesList.find(each => each.id === displayImage)
    return (
      <div className="game-display">
        <div className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul className="score-details" type="none">
            <li className="score-item">
              <p>Score:</p>
              <p className="highlight">{score}</p>
            </li>
            <li className="score-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png "
                alt="timer"
              />
              <p className="highlight">
                {sec < 10 ? '0' : ''}
                {sec} sec
              </p>
            </li>
          </ul>
        </div>
        {status === 'Playing' ? (
          <div className="game-box">
            {displayImageUrll && (
              <img
                src={displayImageUrll.imageUrl}
                className="display-img"
                alt="match"
              />
            )}
            <ul className="tabs-section" type="none">
              {tabsList.map(each => (
                <TabItem
                  key={each.tabId}
                  details={each}
                  isActive={each.tabId === activeTabId}
                  tabselected={this.tabselected}
                />
              ))}
            </ul>
            <ul className="images-section" type="none">
              {filteredImageList.map(each => (
                <MatchGameItem
                  key={each.id}
                  details={each}
                  onimageselect={this.onimageselect}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="scorecard">
            <ScoreCard score={score} playagain={this.playagain} />
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
