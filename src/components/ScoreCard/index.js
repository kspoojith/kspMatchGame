import './index.css'

const ScoreCard = props => {
  const {score, playagain} = props
  return (
    <div className="score-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
      />
      <p>YOUR SCORE</p>
      <h1>{score}</h1>
      <div className="but">
        <button
          type="button"
          className="button"
          onClick={() => {
            playagain()
          }}
        >
          <img
            className="play-again"
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          <span>PLAY AGAIN</span>
        </button>
      </div>
    </div>
  )
}

export default ScoreCard
