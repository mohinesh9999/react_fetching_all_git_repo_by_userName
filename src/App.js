import React,{useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Container,Paper, Button, TextField } from '@material-ui/core'; 
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    maxHeight: 440,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const columns = [
  { id: 'id', label: 'id', minWidth: 100 },
  { id: 'name', label: 'name', minWidth: 150 },
  {
    id: 'full_name',
    label: 'full_name',
    minWidth: 250,
    format: value => value.toLocaleString(),
  },
  {
    id: 'privated',
    label: 'privated',
    minWidth: 100,
    format: value => value.toLocaleString(),
  },
];

function createData(id,name, full_name, privated) {
  return { id, name, full_name, privated};
}
function App() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [m, setm] = React.useState({});
  const [rows, setrow] = React.useState([]);
  const [srch, setsrch] = React.useState([]);
  const [k,setk]=React.useState(0);
  useEffect(()=>{},[k])
  let x=async ()=>{
    try{
    console.log(`https://api.github.com/users/${srch}/repos`);
    let a=await axios.get(`https://api.github.com/users/${srch}/repos`)

    console.log('hi',a.data);
    setm(a.data)
    let row1=[]
    for(let i=0;i<a.data.length;i++){
      let m1=a.data[i]
      console.log(m1.private,a.data[i].id);
      row1.push(createData(m1.id,m1.name,m1.full_name,""+m1.private))
    }
    setrow(row1)

    console.log(JSON.stringify(a.data),a.data[0],m,typeof(a),row1,rows)}
    catch(e){
      console.log(e);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography className={classes.title} variant="h6" noWrap>
            GIT-HUB REPO SEARCH APP
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
               <SearchIcon  />
            </div>
            <InputBase
              onChange={(e)=>setsrch(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button variant="outlined" color="Black" onClick={(e)=>{x() }}>
        Search
      </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md'>
      <Grid container  style={{overflow:"hidden"}}>
      <Grid item md={3}></Grid>
      <grid item md={9}>
      <br/>
      <br/>
      <Typography variant="h3" component="h3">
              Repos
      </Typography>
      <br/>
      </grid>
      <Grid item md={12} 
      direction="row"
  justify="space-evenly"
  style={{overflow:"Ellipsis"}}
  >
  <Paper className={classes.root}>
  <TableContainer className={classes.container}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map(column => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number' ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
  <TablePagination
    rowsPerPageOptions={[5,10, 25, 100]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />
</Paper>
      
      </Grid>
      
    </Grid>
    </Container>
    </div>
    
  );
}

export default App;
