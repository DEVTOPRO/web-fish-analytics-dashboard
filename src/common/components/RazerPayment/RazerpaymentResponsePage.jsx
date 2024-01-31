import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import CardLayout from '../CardLayout';
import ActionButton from '../Button';
import axios from "axios";
import cancel from '../../../assests/images/cancel.png';
import { redirectURL, getOrderStatusURL } from '../../../utils/RazorPayUrl';
import {generatePolicy, appianReturnURL, navigateURL} from '../../../../src/apiSection/apiUrlConstent';
import services from '../../../../src/apiSection/axiosCurd';
import {useParams } from 'react-router-dom'
import CustomModal from '../../../common/components/modal';
import PaymentLoading from '../../../common/components/PaymentLoading';
import SucessImage from '../../../assests/images/Successimg.svg';
import Conformation from '../../../assests/images/Confirmation.svg';
import Loading from '../../../common/components/Loading'
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
export default function RazerPaymentResponsePage(props) {
  const agentId = localStorage.getItem("agentId");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [responseData,setResponseData]=useState('');
  const [status,setStatus]=useState('');
  const handleFailureContinue = () => {
    if(responseData.source == "APPIAN") {  
      setLoading(true);
      let resObj =  {
        "caseId":responseData.caseId   
      }
      services
        .post(appianReturnURL,resObj)
        .then(response => {
          if (response.data.status == 200) {
            const myTimeout = setTimeout(function() {
              let resObj =  {
                "caseId":responseData.caseId   
              }
              services
                .post(navigateURL,resObj)
                .then(responseUrl => {
                  window.location.replace(responseUrl.data.url);
                })
                .catch(error => {
                  alert("Technical Error");
                });
            }, 2000);
          }
        })
        .catch(err => {
          alert("Technical Error");
        });      
    }
    else {
      props.Redirectpath('/');
    }
  };
  // const [transaction,setPolicyNum]=useState('');
  // const [name,setPolicyNum]=useState('');
  useEffect(() => { 
    if(id) {
      sessionStorage.setItem('order_id', id);
      window.location.replace(redirectURL);
      // window.location.replace('http://localhost:3000/RazerPaymentResponsePage');
    }
    else {
      const caseId = sessionStorage.getItem('order_id');
      axios.get(getOrderStatusURL + "?orderid="+caseId)
      .then((res) => {        
        if(res.data.status == '00' || res.data.status == '11') {
          setStatus(res.data.status);
          let responseObject = {
            requestorId: 'WEB',
            source: 'Web',
            data: {
              caseId: res.data.orderid,
              paymentStatus: res.data.status == "00" ? "success" : "failure",
              merchantId: res.data.domain,
              amount: res.data.amount,
              PayDate: res.data.paydate,
              paymentMethod: res.data.channel,
              appCode: res.data.appcode?res.data.appcode:'',
              errorCode: res.data.error_code?res.data.error_code:'',
              errorDesc: res.data.error_desc?res.data.error_desc:'',
              sKey: res.data.skey,
              transId: res.data.tranID,
              currency: res.data.currency,
            },
          }
          services
          .post(generatePolicy,responseObject)
          .then((respon) => {
              if(respon.status == 200){
                setResponseData(respon.data.data);
                setLoading(false);
                sessionStorage.removeItem('order_id');

              }
          })
          .catch((error) => {
            alert('Technical Error');
            setLoading(false);
            sessionStorage.removeItem('order_id');
          });
        }
      })
      .catch((err) => {
          setLoading(false);
      });

    }
  }, []);

  const classes = useStyles();
  const [openmodal, setOpenModal] = useState(false);
  
  
  const handleSubmit = () => {
    setOpenModal(true);;
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleContinue=()=>{
    if(responseData.source == "APPIAN") {
      setLoading(true);
      let resObj =  {
        "caseId":responseData.caseId   
      }
      services
        .post(appianReturnURL,resObj)
        .then(response => {
          if (response.data.status == 200) {
            const myTimeout = setTimeout(function() {
              let resObj =  {
                "caseId":responseData.caseId   
              }
              services
                .post(navigateURL,resObj)
                .then(responseUrl => {
                  window.location.replace(responseUrl.data.url);
                })
                .catch(error => {
                  alert("Technical Error");
                });
            }, 2000);
          }
        })
        .catch(err => {
          alert("Technical Error");
        });      
    }
    else {
      if(agentId) {
        props.Redirectpath('/AgentDashboard/DashBoardTable');
      }
      else {
        props.Redirectpath('/Dashboard');      
      }
    }
  }
  return (
    <>
    { responseData && responseData.transId ? 
      <>
        {status == '00' ?
          <div><Loading open={loading} />
            <div className={classes.cardStyle}>
              <CardLayout
                padding={'20px'}
                // textAlign={"center"}
                cardContent={
                  <div>
                    <div className={classes.centerImg}>
                      <img src={Conformation} />
                    </div>
                    <div style={{ padding: '10px', fontSize: '25px' }}>
                      Congratulations on your successful transaction!!!{' '}
                    </div>
                    <div className={classes.fontBold}>
                      Your transaction reference id is: {responseData.transId}
                    </div>
                    { responseData && responseData.note ?
                    <>
                      <div style={{color:"green",fontSize: "16px", fontWeight: "600",padding:'10px 0px',}}>{responseData.note}</div>
                      <div>Your Bulk Id is {responseData.caseId}</div>
                    </>
                    :
                    <>
                      <div style={{color:"green",fontSize: "16px", fontWeight: "600",padding:'10px 0px',}}>
                        Congratulations {responseData.name} you have successfully purchased the policy 
                      </div>
                      <div >
                        Policy Number {responseData.policyNum} has been Successfully created
                      </div>
                    </>
                    }
                      
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px',
                      }}
                    >
                      {' '}
                      <ActionButton
                        backgroundImage={
                          'linear-gradient(90deg, #AB26A3 3.67%, #3147BA 114%)'
                        }
                        buttonText={'OK'}
                        handleSubmit={handleContinue}
                        backgroundColor={'#1976d2'}
                        color="#fff"
                        border={'none'}
                        width="120px"
                        borderRadius={'18px'}
                      />
                        {/* <CustomModal
                          modalContent={
                            <div style={{ padding:'20px'}}>
                              <div style={{textAlign:'center'}}>
                                <div style={{color:"green",fontSize: "16px", fontWeight: "600",padding:'10px 0px',}}>
                                  Congratulations {responseData.name} you have successfully purchased the policy 
                                </div>
                                <div >
                                  Policy Number {responseData.policyNum} has been Successfully created
                                </div>
                                <div>
                                  <img src={SucessImage}/>
                                </div>
                                <div style={{padding:'5px 0px',}}>
                                You can check policy details in Dashboard of the Travel Insurance
                                </div>
                                <div style={{textAlign:'center',}}>
                                  <ActionButton
                                    buttonText="Continue"
                                    backgroundImage={
                                      'linear-gradient(90deg, #AB26A3 3.67%, #3147BA 114%)'
                                    }
                                    borderRadius={'30px'}
                                    color={'#fff'}
                                    width="fit-content"
                                    handleSubmit={handleContinue}
                                  />
                                </div>
                              </div>
                            </div>
                          }
                          open={openmodal}
                          modalTitleRequired
                          otpModal={true}
                          handleClose={handleClose}
                        /> */}
                    </div>
                  </div>
                }
              />
            </div>
          </div>  : status == '11' ?
          <div><Loading open={loading} />    
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
                      Your transaction reference id is: {responseData.transId}
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
                        handleSubmit={handleFailureContinue}
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
          </div> : 
          <div><Loading open={loading} /><PaymentLoading/></div>
        }
      </> 
      : <div><Loading open={loading} /><PaymentLoading/></div>
    }
    </>
  );
}
