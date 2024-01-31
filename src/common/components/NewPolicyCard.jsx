import React from 'react';
import CardLayout from './CardLayout';
import { Grid } from '@mui/material';
import Policy from '../../assests/images/Policy.svg';
import ArrowNext from '../../assests/images/ArrowNext.svg';
import activeIcon from '../../assests/images/activeIcon.svg';
import inactiveIcon from '../../assests/images/inactiveIcon.svg';

export default function NewPolicyCard(props) {
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
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} style={{position:'absolute', top:'0', right:'10px', paddingTop:"0"}}>
                  <div style={{display:"flex",justifyContent:"end"}}>
                  <div style={{fontSize:"12px",padding:"4px 5px" }}>{props.data.Status=='IN-ACTIVE'?`Inactive`:`Active`}</div>
                  { props.data.Status=='IN-ACTIVE'?
                    <div><img src={inactiveIcon} /></div>
                  : <div><img src={activeIcon} /></div>
                  }
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div style={{fontSize:"12px",fontWeight:"400"}}>Name</div>
                  <div  style={{fontWeight:"600",fontSize:"14px"}}> {props.data.CustDtls.firstNm}
                 </div>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div  style={{fontSize:"12px",fontWeight:"400"}}>Policy Issue Date</div>
                  <div  style={{fontWeight:"600",fontSize:"14px"}}>{props.data.CustPlcyDtls.polIssueDt}</div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div style={{fontSize:"12px",fontWeight:"400"}}>Policy Expiry Date</div>
                  <div  style={{fontWeight:"600",fontSize:"14px"}}>{props.data.CustPlcyDtls.polExpiryDt}</div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} onClick={()=>props.handleDownloadPolicy(props.data.filePath, props.data.userloginCred)}>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img src={Policy} />
                    </div>
                    <div style={{fontSize:"12px",cursor: 'pointer', fontWeight:"400",color:"#AB26A3"}}>Policy Download</div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div  style={{textAlign:"end"}} onClick={()=>{props.handleViewMore(props.data)}}>
                    <img src={ArrowNext}/>
                  </div>
                </Grid>
              </Grid>
         
            </div>
          }
        />
     
      
      </div>
  
  );
}
