import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

export default function Itemscarousel(props) {
const [activeItemIndex,setActiveItemIndex]=useState(0);

const changeActiveItem=(index)=>{
  setActiveItemIndex(index)
}

    return (
      <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={3}
        minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
        // Carousel configurations
        numberOfCards={7}
        gutter={0}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}
        // Active item configurations
        requestToChangeActive={changeActiveItem}
        activeItemIndex={activeItemIndex}
        // activePosition={'center'}
        chevronWidth={0}
        rightChevron={"==>"}
        leftChevron={"<=="}
        outsideChevron={false}
      >
        {props.dataContent}
      </ItemsCarousel>
    );
  }
