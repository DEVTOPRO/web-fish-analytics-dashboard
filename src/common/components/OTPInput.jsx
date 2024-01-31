// import React, {
//     useEffect,
//     useRef,
//     useImperativeHandle,
//     forwardRef,
//   } from 'react';
// import Input from '../../common/components/Input'
//   import { Grid } from '@mui/material';
//   export const OTPInput = forwardRef((props, ref) => {
//     // export default function OTPInput(props) {
//     const pin0 = useRef();
//     const pin1 = useRef();
//     const pin2 = useRef();
//     const pin3 = useRef();
//     const pin4 = useRef();
//     const pin5 = useRef();
//      console.log('props.pinData', props.pinData);
//     useEffect(() => {
//     }, []);
//     const handleChange = (e, index) => {
//       if (e.target.value !== '') {
//         if ('pin' + index === 'pin0') {
//           pin1.current.focus();
//         } else if ('pin' + index === 'pin1') {
//           pin2.current.focus();
//         } else if ('pin' + index === 'pin2') {
//           pin3.current.focus();
//         } else if ('pin' + index === 'pin3') {
//           pin4.current.focus();
//         } else if ('pin' + index === 'pin4') {
//           pin5.current.focus();
//         }
//       } else {
//         if ('pin' + index === 'pin5') {
//           pin4.current.focus();
//         } else if ('pin' + index === 'pin4') {
//           pin3.current.focus();
//         } else if ('pin' + index === 'pin3') {
//           pin2.current.focus();
//         } else if ('pin' + index === 'pin2') {
//           pin1.current.focus();
//         } else if ('pin' + index === 'pin1') {
//           pin0.current.focus();
//         }
//       }
//     };
//     useImperativeHandle(ref, () => {
//       return {
//         clearedValue: clearedValue,
//       };
//     });
//     const clearedValue = () => {
//       props.setValue('pin0', '');
//       props.setValue('pin1', '');
//       props.setValue('pin2', '');
//       props.setValue('pin3', '');
//       props.setValue('pin4', '');
//       props.setValue('pin5', '');
//     };
//     const handleKeypress = e => {
//       if (e.key === 'Enter') {
//         props.onSubmit();
//       }
//     };
  
//     const blocks = Array.from({ length: props.count }, (element, index) => (
//       <Grid key={index} item xs={2} sm={2} md={2} lg={2} xl={2}>
//         <Input
//           // inputRef={e => {
//           //   props.inputRef(e, { required: true, maxLength: 1 });
//           //   if ('pin' + index === 'pin0') {
//           //     pin0.current = e;
//           //   } else if ('pin' + index === 'pin1') {
//           //     pin1.current = e;
//           //   } else if ('pin' + index === 'pin2') {
//           //     pin2.current = e;
//           //   } else if ('pin' + index === 'pin3') {
//           //     pin3.current = e;
//           //   } else if ('pin' + index === 'pin4') {
//           //     pin4.current = e;
//           //   } else if ('pin' + index === 'pin5') {
//           //     pin5.current = e;
//           //   }
//           // }}
//           name={props.name + index}
//           type={props.type}
//           backgroundColor="#f5f2f2"
//           maxLength="1"
//           boxShadow="0px 3px 3px #00000029"
//           border="none"
//           textAlign="center"
//           color="#FB2929"
//           handleChange={e => handleChange(e, index)}
//           autoComplete="off"
//           onKeyPress={handleKeypress}
//           inputMode={props.inputMode}
//           pattern={props.pattern}
//         />
//       </Grid>
//     ));
//     return (
//       <div>
//         <Grid
//           container
//           item
//           xs={12}
//           sm={12}
//           md={12}
//           lg={12}
//           xl={12}
//           style={{ justifyContent: props.justifyContent }}
//         >
//           {blocks}
//         </Grid>
//       </div>
//     );
//   });
  