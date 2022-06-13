import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';
import { filterMobilesList } from '../redux/slices/filteredMobilesList';
import { loadMobilesList } from '../redux/slices/mobilesList';
import { loadCart } from '../redux/slices/cartSlice';
import fetchDataFromApi from '../utils/loadData';
import setCookieOptions from '../utils/setCookieOptions';
import bag from '../img/shopping-bag.svg';

import '../styles/globals.scss';
import '../styles/header.scss';

function Header() {
  const [searching, setSearching] = useState('');
  const mobilesList = useSelector((state) => state.mobilesList.mobilesList);
  const filteredMobilesList = useSelector((state) => state.filteredMobilesList.filteredMobilesList);
  const cart = useSelector((state) => state.cart.cart);
  const [cookies, setCookie] = useCookies(['']);
  const dispatch = useDispatch();
  const breadcrumbs = useBreadcrumbs();
  async function loadMobiles() {
    let data;
    if (cookies.mobilesList) {
      const stringifiedData = cookies.mobilesList.concat(
        cookies.mobilesList1,
        cookies.mobilesList2,
        cookies.mobilesList3
      );
      data = JSON.parse(decompressFromBase64(stringifiedData));
    } else {
      data = await fetchDataFromApi(`${process.env.REACT_APP_URL}api/product`);

      const dataToString = compressToBase64(JSON.stringify(data));
      const substring1 = dataToString
        .substring(0, dataToString.length / 4);
      const substring2 = dataToString
        .substring(dataToString.length / 4, 2 * (dataToString.length / 4));
      const substring3 = dataToString
        .substring(2 * (dataToString.length / 4), 3 * (dataToString.length / 4));
      const substring4 = dataToString
        .substring(3 * (dataToString.length / 4), dataToString.length);
      await setCookie('mobilesList', substring1, setCookieOptions());
      await setCookie('mobilesList1', substring2, setCookieOptions());
      await setCookie('mobilesList2', substring3, setCookieOptions());
      await setCookie('mobilesList3', substring4, setCookieOptions());
    }
    await dispatch(loadMobilesList(data));
  }

  function fetchCart() {
    if (Object.keys(cookies).some((key) => key === 'cart')) {
      const [, savedCart] = Object.entries(cookies).find((entry) => entry[0] === 'cart');
      dispatch(loadCart(savedCart));
      return true;
    }
    return false;
  }

  useEffect(() => {
    loadMobiles();
    fetchCart();
  }, []);
  useEffect(() => {
    dispatch(filterMobilesList(mobilesList));
  }, [mobilesList]);

  const filterMobiles = (query) => {
    const mobilesToFilter = mobilesList.filter(
      ({ brand, model }) => brand
        .toLowerCase()
        .includes(query.toLowerCase())
        || model.toLowerCase()
          .includes(query.toLowerCase())
    );
    dispatch(filterMobilesList(mobilesToFilter));
  };

  const dynamicMobileBreadCrumbs = (match, breadcrumb) => {
    if (match.pathname === '/') return (<Link key={match.pathname} className="breadcrumbs" to={match.pathname}>{breadcrumb}</Link>);
    const id = match.pathname.substring(1, match.pathname.length);
    const mobileToShow = mobilesList.find((mobile) => mobile.id === id);
    if (!mobileToShow) return (<Link key={match.pathname} className="breadcrumbs__mobile" to={match.pathname}>Not found</Link>);
    return (<Link key={match.pathname} className="breadcrumbs__mobile" to={match.pathname}>{mobileToShow.model}</Link>);
  };
  return (
    <header>
      <Link to="/"><h1>Alten Phones</h1></Link>
      <nav>
        {breadcrumbs.map(({ match, breadcrumb }) => dynamicMobileBreadCrumbs(match, breadcrumb))}
      </nav>
      <div>
        <input type="text" placeholder="Buscar" value={searching} onChange={(evt) => { filterMobiles(evt.target.value); setSearching(evt.target.value); }} />
        {searching
          ? (
            <ul className="mobilesList">
              {filteredMobilesList.map((mobile) => <Link className="mobilesList__Link" key={mobile.id} to={`/${mobile.id}`} onClick={() => { setSearching(''); filterMobiles(''); }}>{mobile.model}</Link>)}
            </ul>
          )
          : null}
      </div>
      <div className="shopping-bag">
        <img src={bag} alt="bag" />
        {cart.count
          ? <p className="shopping-bag__length">{cart.count}</p>
          : null}
      </div>
    </header>
  );
}

export default Header;
