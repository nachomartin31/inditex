import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loadMobilesList } from '../redux/slices/mobilesList';

function MobilesList() {
  const mobilesList = useSelector((state) => state.mobilesList.mobilesList);
  const dispatch = useDispatch();
  async function loadMobiles() {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}api/product`);
    dispatch(loadMobilesList(data));
  }
  useEffect(() => {
    loadMobiles();
  }, []);
  return (
    <div>
      <h1>MobilesList</h1>
      {mobilesList.map((mobile) => <p key={mobile.id}>{mobile.model}</p>)}
    </div>
  );
}

export default MobilesList;
