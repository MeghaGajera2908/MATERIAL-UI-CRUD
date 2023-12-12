import { useState } from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function App() {
  const [inputdata, setInputdata] = useState({ FirstName: "", LastName: "", Age: "" });
  const [record, setRecord] = useState([]);
  const [isEdit, setisEdit] = useState(-1);

  const handleOnchange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }
  const handlesubmit = () => {
    if (isEdit !== -1) {
      const updateData = record.map((value, index) => {
        if (index === isEdit) {
          return inputdata;
        }

        return value;
      });
      setRecord(updateData)
    }
    else {
      setRecord([...record, inputdata]);
    }
    setInputdata({ FirstName: "", LastName: "", Age: "" });

  }

  const handledelet = (id) => {
    console.log("delet");
    const updated = record.filter((item, index) => index !== id);
    setRecord(updated);
  }
  const handleedit = (editer) => {
    setisEdit(editer)
    let editing = record.find((item, index) => index === editer);
    console.log(editing);
    setInputdata(editing);
  }

  return (
    <div className="App">
      <div>
        <label htmlFor='fname'>First Name</label>
        <input type='text' id='fname' name='FirstName' value={inputdata.FirstName} onChange={(e) => handleOnchange(e)} />
      </div>
      <div>
        <label htmlFor='lname'>Last Name</label>
        <input type='text' id='lname' name='LastName' value={inputdata.LastName} onChange={(e) => handleOnchange(e)} />
      </div>
      <div>
        <label htmlFor='age'>Age</label>
        <input type='number' id='age' name='Age' value={inputdata.Age} onChange={(e) => handleOnchange(e)} />
      </div>
      <div>
        <button onClick={() => handlesubmit()}>SUBMIT</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Delet</TableCell>
              <TableCell align="right">Edit</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {record.map((record, index, item) => (
              <TableRow
                key={record.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{record.FirstName}</TableCell>
                <TableCell align="right">{record.LastName}</TableCell>
                <TableCell align="right">{record.Age}</TableCell>
                <TableCell align="right"><button onClick={() => handledelet(index)}>DELET</button></TableCell>
                <TableCell align="right"><button onClick={() => handleedit(index)}>EDIT</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
