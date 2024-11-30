import {BsSearch} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
  const {searchInput, enterSearchInput, changeSearchInput} = props

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput() // Trigger search when Enter is pressed
    }
  }

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  const onSearchIconClick = () => {
    enterSearchInput() // Trigger search when search icon is clicked
  }

  return (
    <div className="search-input-container">
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput} // For Enter key search
      />
      <button className="search-btn" testid="searchButton"><BsSearch className="search-icon" onClick={onSearchIconClick} /></button>
      {' '}
      {/* For click search */}
    </div>
  )
}

export default ProductsHeader
