import { useState } from 'react';
import './App.css';
import UserList from './components/User/UserList';
import { Box, Tab, Tabs } from '@mui/material';
import BookList from './components/Book/BookList';
import SellHistoryTable from './components/SellHistory/SellHistoryTable';

function App() {

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{height: "100%"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabSelect}>
          <Tab label="Libros" {...a11yProps(0)}/>
          <Tab label="Clientes" {...a11yProps(1)}/>
          <Tab label="Historial compras" {...a11yProps(2)}/>
        </Tabs>
      </Box>
      <BookList value={selectedTab} index={0}/>
      <UserList value={selectedTab} index={1}/>
      <SellHistoryTable value={selectedTab} index={2}/>
    </Box>
  )
}

export default App
