import './App.css';
import Homepage from './pages/Homepage';
import {createTheme, ThemeProvider} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import VideoPage from './pages/VideoPage';
import Explore from './pages/Explore';
import Subscription from './pages/Subscription';
import UploadVideo from './pages/UploadVideo';
import Search from './pages/Search';

// Mui custom themes
const theme = createTheme({
  palette:{
    primary: {
      main: '#fafafa'
    },
    secondary: grey,
    success: red,
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 100,
    fontWeightBold: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightLarge: 700,
    fontWeightLargest: 900,
}
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/watch/:id' element={<VideoPage />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/subscription' element={<Subscription />} />
          <Route path='/upload' element={<UploadVideo />} />
          <Route path='/search/:query' element={<Search />} />
        </Routes>
      </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;
