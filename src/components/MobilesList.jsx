import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import MobileMiniature from './MobileMiniature';

function MobilesList() {
  const filteredMobilesList = useSelector((state) => state.filteredMobilesList.filteredMobilesList);
  const [mobilesToDisplay, setMobilesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let mobilesSlices = [];
    for (let i = 0; i < filteredMobilesList.length; i += 12) {
      const slice = filteredMobilesList.slice(i, i + 12);
      mobilesSlices = [...mobilesSlices, slice];
    }
    setTotalCount(mobilesSlices.length);
    setMobilesToDisplay(mobilesSlices);
    setCurrentPage(1);
  }, [filteredMobilesList]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#A4C7E0'
      }
    }
  });

  function handlePaginationChange(event, value) {
    setCurrentPage(value);
  }
  return (
    <div className="mobileList">
      <ThemeProvider theme={theme}>
        <Stack spacing={2} className="mobileList__pagination">
          <Pagination
            count={totalCount}
            onChange={(event, value) => handlePaginationChange(event, value)}
            page={currentPage}
            size="small"
            showFirstButton="true"
            showLastButton="true"
            color="primary"
          />
        </Stack>
      </ThemeProvider>
      <section className="mobileList__content">
        {mobilesToDisplay[currentPage - 1]?.map((mobile) => <Link key={mobile.id} to={`/${mobile.id}`}><MobileMiniature mobile={mobile} /></Link>)}
      </section>
    </div>
  );
}

export default MobilesList;
