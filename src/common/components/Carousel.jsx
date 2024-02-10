import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function Itemscarousel(props) {
const [activeItemIndex,setActiveItemIndex]=useState(0);

const changeActiveItem=(index)=>{
  setActiveItemIndex(index)
}
    return (
      <div style={{width: window. screen. width-330,paddingLeft:"20px"}}>
      <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={3}
        minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
        // Carousel configurations
        numberOfCards={5}
        gutter={1}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={true}
        // Active item configurations
        requestToChangeActive={changeActiveItem}
        activeItemIndex={activeItemIndex}
        // activePosition={'center'}
        chevronWidth={4}
        rightChevron={<ArrowForwardIosIcon sx={{marginLeft:"24px",fontSize:"4rem",color:"#c4c4c478"}}/>}
        leftChevron={<ArrowBackIosIcon sx={{fontSize:"4rem",color:"#c4c4c478"}}/>}
        outsideChevron={false}
      >
        {props.dataContent}
      </ItemsCarousel>
      </div>
    );
  }
