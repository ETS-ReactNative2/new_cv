import React from 'react'
import styled from 'styled-components'
import SchoolingItem from './Schoolingtem';
import schoolingArray from '../../utils/schooling'

const SchoolingListStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 25px 0 0 0;
`

const SchoolingList = () => {

    return (
        <SchoolingListStyle>
            {
                schoolingArray.length > 0 && schoolingArray.map((schooling, i) => (
                    <SchoolingItem
                        key={i}
                        item={schooling}
                    />
                ))
            }
        </SchoolingListStyle>
    )
}

export default SchoolingList
