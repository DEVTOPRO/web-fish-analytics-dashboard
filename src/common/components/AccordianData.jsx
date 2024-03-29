import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionExpandIcon(props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{color:'#4839be'}}
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {props.content}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}