import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import './load.css'

const Loading = () => {
  return (
    <Box sx={{height: '100vh' , display : 'flex', bgcolor: 'black' , color:'white' , alignItems: 'center' , justifyContent: 'center' }}>
    <h1 className='load'>L o a d i n g ... <CircularProgress /></h1>
    </Box>
  )
}

export default Loading