import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  successText: {
 color:"#1EA408"
  },
  inactiveText: {
    color:"#FF0000"
     },  
  viewText:{
    cursor:"pointer",
  },
  editIcon:{
    cursor:"pointer", 
  }
}))

export default function CustTable(props) {
  const classes = useStyles()
  const rows=props.row?props.row:[];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const retryBulk = (data, id) => {
    props.retryPayment(data, id)
  }
  const userRowHandler=(data,id,key)=>{
    props.rowInfoHandler(data,id,key,props.bulkUpload);
  }
  const viewDataClicked = (data, id) => {
    props.viewDataClicked(data, id);
  }
  
  return (
    <Paper sx={{ width: '100%'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align={"center"}
                style={{ minWidth: 80,fontWeight:"600",color:"#444444" }}
              >
                {"SL No."}
              </TableCell>
              {props.columns.map((column,index) => (
                <TableCell
                  key={column+index}
                  align={"center"}
                  style={{ minWidth: 140,fontWeight:"600" ,color:"#444444"}}
                >
                  {column}
                </TableCell>
              ))}
               <TableCell
                  key={'status'}
                  align={"center"}
                  style={{ minWidth: 20,fontWeight:"600",color:"#444444" }}
                >
                  {"Status"}
                </TableCell>
                <TableCell
                    key={'action'}
                    align={"center"}
                    style={{ minWidth: 20,fontWeight:"600",color:"#444444" }}
                  >
                    {"Views"}
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>   
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell
                      style={{ color: '#666666' }}
                      align={'center'}
                    >
                      {rowsPerPage * page + index + 1}
                    </TableCell>
                    <TableCell
                            key={index}
                            style={{ color: '#666666',cursor:"pointer" }}
                            align={'center'}  
                          >                              
                            {row.companyName}
                    </TableCell>
                    <TableCell
                            key={index}
                            style={{ minWidth: 160, color: '#666666',cursor:"pointer" }}
                            align={'center'}  
                          >                              
                            {row.empName}
                    </TableCell>
                    <TableCell
                            key={index}
                            style={{ color: '#666666',cursor:"pointer" }}
                            align={'center'}  
                          >                              
                            {row.policy}
                    </TableCell>
                    <TableCell
                            key={index}
                            style={{ color: '#666666',cursor:"pointer" }}
                            align={'center'}  
                          >                              
                            {row.policyId}
                    </TableCell>
                    <TableCell
                            key={index}
                            style={{ color: '#666666',cursor:"pointer" }}
                            align={'center'}  
                          >
                            {row.amount == "5" ? "Compulsory & Additional Plan" : row.plan.slice(15)}
                    </TableCell>
                    <TableCell
                            key={index}
                            style={{color: '#666666',cursor:"pointer" }}
                            align={'center'}  
                          >                              
                            {row.amount} {"RM"}
                    </TableCell>
                    { row.policyStatus === "ACTIVE" ?
                    <TableCell
                      align={'center'}
                      style={{
                        color: '#1EA408'
                      }}
                    >
                      <CheckCircleOutlineIcon className={classes.successText}/>
                                                
                    </TableCell>
                    :
                    <TableCell
                      align={'center'}
                      style={{
                        color: '#1EA408'
                      }}
                    >
                     <CancelIcon className={classes.inactiveText}/>
                     </TableCell>
                    }
                    
                    <TableCell align={'center'}>
                  
                          <div>
                            <VisibilityIcon className={classes.viewText} onClick={()=>viewDataClicked(row,index)}/>
                          </div>
                      </TableCell>
                    

                    
                     
                      {/* <>
                        {
                          props.bulkUpload === "failed" ? 
                          <TableCell
                            key={index}
                            style={{ color: '#0000FF',cursor:"pointer" }}
                            onClick={() => fileNameClick(row,index) }
                            align={'center'}  
                          ><u>                              
                            {row.fileName}</u>
                          </TableCell>
                          :
                            row.empNm ?
                            <TableCell
                              key={index}
                              style={{ color: '#0000FF',cursor:"pointer" }}
                              align={'center'}
                              onClick={() => employerNameClick(row,index) }  
                              ><u>                              
                              {row.empNm}</u>
                            </TableCell>
                            :
                            <TableCell
                              key={index}
                              style={{ color: '#0000FF',cursor:"pointer" }}
                              align={'center'}
                              onClick={() => fileNameClick(row,index) }
                              ><u>                              
                              {row.fileNm}</u>
                            </TableCell>
                        }
                        <TableCell
                          key={index}
                          style={{ color: '#666666' }}
                          align={'center'}  
                        >
                            
                            {row.policyType}                            
                        </TableCell>
                        <TableCell
                          key={index}
                          style={{ color: '#666666' }}
                          align={'center'}  
                        >
                            
                            {row.totalAmount}                            
                        </TableCell>
                        <TableCell
                          key={index}
                          style={{ color: '#666666' }}
                          align={'center'}
                        >                            
                          {row.noOfEmp}                            
                        </TableCell>
                        {row.creatTs ?
                        <TableCell
                          key={index}
                          style={{ color: '#666666' }}
                          align={'center'}
                        >                            
                        {row.creatTs}                            
                        </TableCell>
                        : ''
                        }
                        
                      </> */}
                    {/* <TableCell
                      align={'center'}
                      style={{
                        color:
                          props.bulkUpload == 'passed' ? '#1EA408' : '#FF1F1F',
                      }}
                    >
                      {props.bulkUpload == 'passed' ? 'Success' : 'Failed'}
                    </TableCell>
                    {props.tableValueKeys && props.bulkUpload==="failed"&&<TableCell
                      align={'center'}
                      style={{
                        color:'#FF1F1F',
                      }}
                    >
                     {row.errorMsg}
                    </TableCell>}

                    {
                      props.tableValueKeys ?
                      <TableCell align={'center'}>
                  
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <DeleteIcon className={classes.failedText} onClick={()=>userRowHandler(row,index,"delete")}/>{' '}
                            {!props.validateAct&&<ModeEditIcon className={classes.editIcon} onClick={()=>userRowHandler(row,index,"edit")}/>}
                          </div>
                      </TableCell>
                      : props.bulkUpload==="failed" ?
                        <>
                          <TableCell align={'center'}>                  
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                              }}
                            >
                              <div className={classes.failedText}>
                                {row.comment}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align={'center'}>                  
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                opacity:  row.PaymentStatus == "PENDING" ? "1" : "0.3"
                              }}
                            >
                              <div className={classes.failedText} onClick={ row.PaymentStatus == "PENDING" ? ()=>retryBulk(row,index) : ''}>
                                {'Retry Payment'}
                              </div>
                            </div>
                          </TableCell>
                        </>
                      :
                      ''
                    } */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}