import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import CardLayout from '../CardLayout';
import ActionButton from '../Button';
import cancel from '../../../assests/images/cancel.png';
const useStyles = makeStyles((theme) => ({
  cardStyle: {
    background: 'linear-gradient(to right, #8731A5, #6731A5,#A3A1FF)',
    padding: '11% 35%',
    textAlign: 'center',
  },
  paddingStyle: {
    padding: '4px 0px',
    display: 'flex',
  },
  fontBold: {
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
  },
  centerImg: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
  },
}));
export default function Failure(props) {
  const classes = useStyles();
  const handleSubmit = () => {
    props.Redirectpath('/');
  };
  return (
    <div className={classes.cardStyle}>
      <CardLayout
        padding={'20px'}
        // textAlign={"center"}
        cardContent={
          <div>
            <div className={classes.centerImg}>
              <img height={'100px'} src={cancel} />
            </div>
            <div style={{ padding: '10px', fontSize: '25px',color:'red',fontWeight:'700' }}>
              PAYMENT FAILURE!!!{' '}
            </div>
            <div className={classes.fontBold}>
              Your transactionreference id is: {'A1234567'}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '10px',
              }}
            >
              {' '}
              <ActionButton
                backgroundImage={
                  'linear-gradient(90deg, #AB26A3 3.67%, #3147BA 114%)'
                }
                buttonText={'CONTINUE'}
                handleSubmit={handleSubmit}
                backgroundColor={'#1976d2'}
                color="#fff"
                border={'none'}
                width="120px"
                borderRadius={'18px'}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
