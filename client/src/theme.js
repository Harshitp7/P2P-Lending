import { createTheme } from '@mui/material/styles'
import { grey, deepPurple } from '@mui/material/colors';

const theme = createTheme({
    palette : {
        primary : {
            main : deepPurple[500],
        },
        secondary : {
            main : deepPurple[50]
        },
        white : {
            main : '#fff'
        },
        custom : {
            background : {
                light : grey[50],
                main : grey[100],
                dark : grey[200]
            },
            disabled : {
                main : '#e9ecef'
            }
        }
    }
})

export default theme