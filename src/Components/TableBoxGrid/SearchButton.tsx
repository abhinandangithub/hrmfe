// SearchButton.tsx
import React from 'react'
import Icon from './icon/index'

interface SearchButtonProps {
  onClick: () => void
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => (
  <button
    className="btn bg-white ml-3"
    onClick={onClick}
    style={{ border: '1px solid #a1a19a ' }}
    type="button" // Adding the type attribute
  >
    <Icon icon="material-symbols:search" className="text-dark " />
  </button>
)

export default SearchButton
