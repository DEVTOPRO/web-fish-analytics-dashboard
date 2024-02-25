import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Select from "./NewSelect";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Context from '../../context/Context';
import AlertMessage from "./AlertMessage";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'sNo',
    numeric: false,
    disablePadding: true,
    label: 'S No',
  },
  {
    id: 'camName',
    numeric: true,
    disablePadding: false,
    label: 'Camera Name',
  },
  {
    id: 'startDate',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'loginTime',
    numeric: true,
    disablePadding: false,
    label: 'Login Time',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'User Status',
  },
  {
    id: 'hours',
    numeric: false,
    disablePadding: false,
    label: 'Hours Info',
  },
 
  {
    id: 'viewStatus',
    numeric: false,
    disablePadding: false,
    label: 'View Status',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{fontSize:"14px",fontWeight:"600",color:"#4839be"}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function EnhancedTable(props) {
  let rows=props.data
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [errorMessage,setErrorMessage]=React.useState(null);
const context=React.useContext(Context);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectHandler = (event) => {
   errorMessage&&setErrorMessage(null);
  setSelected({nameIndex:event.target.name,value:event.target.value});
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,rows],
  );
const frameClipsViwer=(key)=>{
  console.log(key,selected)
  if(selected&&selected.nameIndex==key){
    context.dispatch({ type: "path", value: selected.value});
    props.redirectPage("/video-farmes-viewer");
  }else{
    setErrorMessage("Your selected row field is Manadatory")
  }
} 

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '98%', mb: 2 ,padding:"15px",boxShadow:"0px 0px 1px 1px rgb(0,0,0,0.2)"}}>
      {errorMessage&&<AlertMessage message={errorMessage} status={"error"}/>}

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                    >
                     {index+1}
                    </TableCell>
                    <TableCell align="center">{props.camerasList&&props.camerasList.length>0&& props.camerasList.find((camInfo)=>camInfo.value==row.cameraName).name||"Camera A"}</TableCell>
                    <TableCell align="center">{row.recordDate}</TableCell>
                    <TableCell align="center">{"Login Time"}</TableCell>
                    <TableCell align="center">{<CheckCircleIcon sx={{color:"#00be09"}}/>}</TableCell>
                    <TableCell align="center">
                      <Select
                      displayValue="hour"
                      keyValue="path"
                      name={`noHours${index}`}
                      required={true}
                      handleChange={selectHandler}
                      listItems={row.hoursList}
                    /></TableCell>
                    <TableCell align="center">{<VisibilityIcon type={"submit"}sx={{color:"#5f4fad"}} onClick={()=>frameClipsViwer(`noHours${index}`)}/>}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    
    </Box>
  );
}