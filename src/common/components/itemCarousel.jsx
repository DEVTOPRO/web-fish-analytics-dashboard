import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import LeftArrow from '../../../assets/images/leftArrow.png';
import RightArrow from '../../../assets/images/rightArrow.png';
export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: 0,
    };
  }

  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  render() {
    const { activeItemIndex, children } = this.state;
    return (
      <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={3} 
        minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        numberOfCards={this.props.numberOfCards ? this.props.numberOfCards : 3}
        gutter={0}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}
        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        // activePosition={'center'}

        chevronWidth={0}
        rightChevron={<img src={RightArrow} style={{ marginLeft: '90px' }} />}
        leftChevron={<img src={LeftArrow} style={{ marginRight: '90px' }} />}
        outsideChevron={false}
      >
        {this.props.dataContent}
      </ItemsCarousel>
    );
  }
}
