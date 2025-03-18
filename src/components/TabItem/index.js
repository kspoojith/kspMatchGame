import './index.css'

const TabItem = props => {
  const {details, isActive, tabselected} = props
  const {tabId, displayText} = details
  return (
    <li>
      <button
        type="button"
        className={`tab-button ${isActive ? 'active-style' : ''}`}
        onClick={() => {
          tabselected(tabId)
        }}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
