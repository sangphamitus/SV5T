import React from 'react'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function SortBtn({ status }) {
  return (
    <FontAwesomeIcon
      icon={status === 0 ? faSort : status === 1 ? faSortDown : faSortUp}
    />
  )
}
