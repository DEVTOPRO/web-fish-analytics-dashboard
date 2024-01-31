import React from 'react';
import CardLayout from './CardLayout';
import { Grid } from '@mui/material';
import Policy from '../../assests/images/Policy.svg';
import ArrowNext from '../../assests/images/ArrowNext.svg';
import pendingIcon from '../../assests/images/paymentfailed.svg';
import ActionButton from '../../common/components/Button';
import inactiveIcon from '../../assests/images/inactiveIcon.svg';

export default function PendingPolicyCard(props) {
  return (


      <div >
 
               
        <CardLayout
          cardContent={
            <div style={{padding:"4px", position:'relative'}}>
           
              <Grid
                container
                spacing={1}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div style={{fontSize:"12px",fontWeight:"400"}}>Plan</div>
                  <div style={{fontWeight:"600",fontSize:"14px"}}>{props.data.CustPlcyDtls.PolicyPlan==='MHIN_TRVL_SIB'?"Basic": props.data.CustPlcyDtls.PolicyPlan === "MHIN_FRGN_WRKER_CMP"? "Compulsory Plan": props.data.CustPlcyDtls.PolicyPlan==='MHIN_TRVL_SIA' ? "Advance" : "Compulsory & Additional Plan"}</div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{position:"absolute", right:"10px", top:"0", paddingTop:"0"}}>
                  
                    {props.data && props.data.CustPlcyDtls && props.data.CustPlcyDtls.policyNum == '' ?
                      <div style={{display:"flex",justifyContent:"end"}}>
                        <div style={{fontSize:"12px",padding:"4px 5px" }}>{'Payment Failed'}</div>
                        <div><img src={pendingIcon} /></div>
                      </div>

                    : null
                    }
                  
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div style={{fontSize:"12px",fontWeight:"400"}}>Name</div>
                  <div  style={{fontWeight:"600",fontSize:"14px"}}> {props.data.CustDtls.firstNm}</div>
                </Grid>

                
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                  <div style={{fontSize:"14px",fontWeight:"400"}}>Please Retry your payment to get your selected policy</div>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}></Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}></Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} >
                  <div style={{textAlign:"center", border: '1px solid #AB26A3', cursor: 'pointer', borderRadius: '100px'}} onClick={()=>{props.handleViewMore(props.data)}}>
                    <div style={{color:'#AB26A3'}}>
                      Retry
                    </div>
                  </div>
                </Grid>
              </Grid>
         
            </div>
          }
        />
     
      
      </div>
  
  );
}
