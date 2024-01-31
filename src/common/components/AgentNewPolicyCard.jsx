import React from 'react';
import CardLayout from './CardLayout';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Grid } from '@mui/material';
import Policy from '../../assests/images/Policy.svg';
import ArrowNext from '../../assests/images/ArrowNext.svg';
import activeIcon from '../../assests/images/activeIcon.svg';
import inactiveIcon from '../../assests/images/inactiveIcon.svg';

export default function NewPolicyCard(props) {
    // let jsonData = [
    //     {
    //       "CustPlcyDtls": {
    //         "custId": 557,
    //         "caseId": 459,
    //         "policyNum": "",
    //         "polStartDt": "16-Nov-2022",
    //         "startDt": "2022-11-16",
    //         "polExpiryDt": "26-Nov-2022",
    //         "polIssueDt": "14-Nov-2022",
    //         "paymentMode": null,
    //         "premium": "30",
    //         "policyDoc": null,
    //         "PolicyPlan": "MHIN_TRVL_SIB",
    //         "nomineeNm": "poiuytrerftyuiopoiuytr",
    //         "nomineePh": "+609876543213",
    //         "nomineeGender": "MHT_GNDR_MALE",
    //         "nomineerelation": "MHT_RLTN_FAM"
    //       },
    //       "CustDtls": {
    //         "firstNm": "poiuytrewerty uioiuytredrtyui",
    //         "phNum": "+609876543213",
    //         "email": "poiuytre@wertyuio.com",
    //         "dob": "14-Nov-1937",
    //         "gender": "MHT_GNDR_MALE",
    //         "passport": "H98438723",
    //         "nationalId": ""
    //       },
    //       "subProduct": "MHIN_TRVL_SIB",
    //       "Status": "",
    //       "desc": "example description",
    //       "vcode": "8297ce17e0f96ef69ed5de1df824618f"
    //     },
    //     {
    //       "CustPlcyDtls": {
    //         "custId": 558,
    //         "caseId": 460,
    //         "policyNum": "",
    //         "polStartDt": "15-Nov-2022",
    //         "startDt": "2022-11-15",
    //         "polExpiryDt": "17-Nov-2022",
    //         "polIssueDt": "14-Nov-2022",
    //         "paymentMode": null,
    //         "premium": "60",
    //         "policyDoc": null,
    //         "PolicyPlan": "MHIN_TRVL_SIA",
    //         "nomineeNm": "qwerty",
    //         "nomineePh": "+609876543213",
    //         "nomineeGender": "MHT_GNDR_MALE",
    //         "nomineerelation": "MHT_RLTN_FAM"
    //       },
    //       "CustDtls": {
    //         "firstNm": "prudhivi nitin",
    //         "phNum": "+609876543213",
    //         "email": "qwerty@qwerty.com",
    //         "dob": "31-Mar-2009",
    //         "gender": "MHT_GNDR_MALE",
    //         "passport": "G89942378",
    //         "nationalId": ""
    //       },
    //       "subProduct": "MHIN_TRVL_SIA",
    //       "Status": "",
    //       "desc": "example description",
    //       "vcode": "6e326be431047f598da4237933a71364"
    //     }
    //   ];
  return (
    


      <div >
 
               
        <CardLayout
          cardContent={
            <div style={{padding:"0px"}}>
           
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                
                {/* {jsonData.map((jsonda, index) =>(
                    <ListItem button>
                    <ListItemText
                    style={{ marginLeft: '4px' }}
                    primary={jsonda.CustDtls.dob}
                    />
                </ListItem>

                ))} */}
              </Grid>
         
            </div>
          }
        />
     
      
      </div>
  
  );
}
