import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const SearchComponents = () => {
    //setear los hooks useState
    const [users, setUsers] = useState([])
    //const [search, setSearch] = useState("")
    const [pro, setPro] = useState("")
    const [peri,setPeri] = useState("")
    const [periodos, setPeriodos] = useState([])
    const [programas, setProgramas] = useState([])
    //funcion para traer los datos de la API para
    //const URL = 'http://localhost:3020/students/1/202202'
    //const URL1 = 'http://localhost:3020/students/periodos'
    //const URL2 = 'http://localhost:3020/students/programas'

    // const showData = async () => {
    //     const response = await fetch(URL)
    //     const data = await response.json()
    //     //console.log(data)
    //     setUsers(data)
    // }

    const baseUrl = 'http://localhost:3020'

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzc191c3VfaWQiOjEsInNzX3JvbF9ub21icmUiOiJBZG1pbmlzdHJhZG9yIiwiYXZfcGVyX25vbWJyZSI6IkVsaW8gQ2FiYW5pbGxhcyIsImlhdCI6MTY1ODMzMDkzMSwiZXhwIjoxNjU4NDAyOTMxfQ.jBUIfuPy350pssVtPguiWBuDvVpjCbZ5RTbvKQmlms4'
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const showProgramas = async () => {
        axios
        .get(`${baseUrl}/students/programas`, config)
        .then(response => {
            //console.log(response)
            setProgramas(response.data)
        })
    }

    const showPeriodos = async () => {
        axios
        .get(`${baseUrl}/students/periodos` , config)
        .then(response => {
            //console.log(response)
            setPeriodos(response.data)
        })
    }
    const progra = (e) => {
        setPro(e.target.value)
    }

    const per = (e) => {
        setPeri(e.target.value)
    }

    const handleSubmit =( e ) => {
        e.preventDefault();
        axios
        .get(`${baseUrl}/students/${pro}/${peri}` , config)
        .then(response => {
            setUsers(response.data)
        })
    }

    const columns = [
        { field: 'av_per_doc_num', 
            headerName: 'Nro Documento', 
            cellClassName: 'super-app-theme--cell', 
            minwidth: 100,
            flex: 1, 
        },
        { field: 'nombres', headerName: 'Nombre', minwidth: 150,  flex: 1, },
        { field: 'apellidos', headerName: 'Apellidos', width: 150, flex: 1, },
        { field: 'av_pro_nombre', headerName: 'Carrera', minwidth: 300, flex: 2  },
        { field: 'av_periodo', headerName: 'Periodo', minwidth: 130,  flex: 0.5, },
    ];

    useEffect(()=>{
        showProgramas()
        showPeriodos()
    }, [])
    
    //renderizamos la vista
  return (
    <div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center p0">LISTADO DE ALUMNOS POR CARRERA Y PERIODO  </h5>
                <hr></hr>
                <br></br>
                <form className="row g-3 needs-validation mt-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <Autocomplete
                            disablePortal
                            getOptionLabel={(programa) => programa.av_pro_nombre}
                            onChange={progra}
                            id="combo-box-demo"
                            options={programas}
                            sx={{ width: 300 }}
                            renderOption={(props, programa) => (
                                <Box component="li" {...props} key={programa.av_pro_id} value={programa.av_pro_id}>
                                {programa.av_pro_nombre}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params} label="Carrera"  size="small" required />}
                        />
                    </div>
                    <div className="col-md-4">
                        <Autocomplete
                            disablePortal
                            getOptionLabel={(periodo) => periodo.av_periodo}
                            onChange={per}
                            id="combo-box-demo"
                            options={periodos}
                            sx={{ width: 300 }}
                            renderOption={(props, periodo) => (
                                <Box component="li" {...props} key={periodo.av_cic_id} value={periodo.av_periodo}>
                                {periodo.av_periodo}
                                </Box>
                            )}
                            renderInput={(params) => <TextField {...params} label="Periodo" size="small" required />}
                        />
                    </div>
                 
                    <div className="col-md-3">
                        <button type='submit' className='btn btn-dark '>Buscar</button>            
                    </div>
                    
                </form>
                <br></br>
                <Box sx={{ height: 700, width: '100%' }}>
                <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    rows={users}
                    getRowId={(row) => row.av_per_doc_num}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    pageSize={20}
                    rowsPerPageOptions={[20]}
                />
                </Box>
            </div>
        </div>
    </div>
  )
}