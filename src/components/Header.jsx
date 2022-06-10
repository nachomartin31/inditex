import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { filterMobilesList } from '../redux/slices/filteredMobilesList';
import { loadMobilesList } from '../redux/slices/mobilesList';

function Header() {
  const mobilesList = useSelector((state) => state.mobilesList.mobilesList);
  const dispatch = useDispatch();

  async function loadMobiles() {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}api/product`);
    await dispatch(loadMobilesList(data));
  }

  useEffect(() => {
    loadMobiles();
  }, []);
  useEffect(() => {
    dispatch(filterMobilesList(mobilesList));
  }, [mobilesList]);

  const filterMobiles = (query) => {
    const filteredMobilesList = mobilesList.filter(
      ({ brand, model }) => brand
        .toLowerCase()
        .includes(query.toLowerCase())
        || model.toLowerCase()
          .includes(query.toLowerCase())
    );
    dispatch(filterMobilesList(filteredMobilesList));
  };
  return (
    <header>
      <h1>Alten Phones</h1>
      <input type="text" placeholder="Buscar" onChange={(evt) => filterMobiles(evt.target.value)} />
    </header>
  );
}

export default Header;
