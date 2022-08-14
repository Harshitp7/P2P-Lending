import { createTheme } from '@mui/material/styles'
import { purple } from '@mui/material/colors';

const theme = createTheme({
    palette : {
        primary : {
            main : purple[500],
        },
        secondary : {
            main : purple[50]
        },
        white : {
            main : '#fff'
        },
        custom : {
            main : '#f5f5f5'
        }
    }
})

export default theme