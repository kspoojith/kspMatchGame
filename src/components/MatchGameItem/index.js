import './index.css'

const MatchGameItem = props => {
  const {details, onimageselect} = props
  const {id, imageUrl, thumbnailUrl, category} = details
  return (
    <li
      onClick={() => {
        onimageselect(id)
      }}
    >
      <button className="img-but">
        <img src={thumbnailUrl} className="each-image" alt="thumbnail" />
      </button>
    </li>
  )
}

export default MatchGameItem
