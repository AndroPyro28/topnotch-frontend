import React, {useRef} from 'react'
import { useLayoutEffect } from 'react';
import {FilterContainer} from "./components"
function FilterData({ dateSetter }) {
  const maxDate = useRef()
  const {setFilterDateFrom, setFilterDateTo} = dateSetter;

  useLayoutEffect(() => {
  

    maxDate
  }, [])
  return (
    <FilterContainer>
      from
        <input type="datetime-local" onChange={(e) => setFilterDateFrom(e.target.value)} />
        to
        <input type="datetime-local" ref={maxDate} onChange={(e) => setFilterDateTo(e.target.value)} />
    </FilterContainer>
  )
}

export default FilterData