import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { loadCurrentMobile } from '../redux/slices/currentMobile';
import { addToCart } from '../redux/slices/cartSlice';
import fetchDataFromApi from '../utils/loadData';
import setCookieOptions from '../utils/setCookieOptions';

import '../styles/mobileDetails.scss';

function Details() {
  const currentMobile = useSelector((state) => state.currentMobile.currentMobile);
  const cart = useSelector((state) => state.cart.cart);
  const [storage, setStorage] = useState('');
  const [color, setColor] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['']);
  const dispatch = useDispatch();

  async function fetchMobile() {
    if (Object.keys(cookies).some((key) => key.includes(id))) {
      const [, stringifiedData] = Object.entries(cookies).find((entry) => entry[0] === id);
      const data = JSON.parse(decompressFromBase64(stringifiedData));
      await dispatch(loadCurrentMobile(data));
    } else {
      const data = await fetchDataFromApi(`${process.env.REACT_APP_URL}api/product/${id}`);
      await dispatch(loadCurrentMobile(data));
      const dataToString = compressToBase64(JSON.stringify(data));
      await setCookie(`${id}`, dataToString, setCookieOptions());
    }
  }

  useEffect(() => {
    fetchMobile();
  }, [id]);

  useEffect(() => {
    setColor(currentMobile?.options?.colors[0].code);
    setStorage(currentMobile?.options?.storages[0].code);
  }, [currentMobile]);

  const saveCart = async () => {
    await setCookie('cart', JSON.stringify(cart), setCookieOptions());
  };
  useEffect(() => { saveCart(); }, [cart]);
  const addMobileToCart = async () => {
    const selectedMobile = {
      id,
      colorCode: color,
      storageCode: storage
    };
    const { data } = await axios.post(`${process.env.REACT_APP_URL}api/cart`, selectedMobile);
    await dispatch(addToCart(data));
  };

  return (
    <main className="mobile-details">
      {
            Object.keys(currentMobile).length > 0
              ? (
                <>
                  <h2 className="mobile-details__heading">{`${currentMobile.brand} - ${currentMobile.model}`}</h2>
                  <div className="mobile-details__wrapper">
                    <img className="mobile-details__image" src={currentMobile?.imgUrl} alt={currentMobile?.model} />
                    <section className="mobile-details__info">
                      <ul className="mobile-details__specs">
                        <li>
                          <span className="mobile-details__value">Marca:</span>
                          {` ${currentMobile?.brand}`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Modelo:</span>
                          {` ${currentMobile?.model}`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Precio:</span>
                          {` ${currentMobile?.price}€`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Procesador:</span>
                          {` ${currentMobile?.cpu}`}
                        </li>
                        <ul>
                          {currentMobile?.options?.storages?.map(
                            (option) => <li key={option.code}>{option.name}</li>
                          )}

                        </ul>
                        <li>
                          <span className="mobile-details__value">Sistema operativo:</span>
                          {` ${currentMobile?.os}`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Resolución de pantalla:</span>
                          {` ${currentMobile?.displaySize}`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Batería:</span>
                          {` ${currentMobile?.battery}`}
                        </li>
                        {typeof
                        currentMobile.primaryCamera === 'object'
                          ? (
                            <ul className="mobile-details__camera">
                              <span className="mobile-details__camera--key">Cámara principal:</span>
                              {currentMobile.primaryCamera.map((prop) => <li className="mobile-details__camera--value" key={`primaryCamera-${prop}`}>{prop}</li>)}
                            </ul>
                          )
                          : null}
                        <li>
                          <span className="mobile-details__value">Cámara secundaria:</span>
                          {` ${currentMobile?.secondaryCmera}`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Dimensiones:</span>
                          {` ${currentMobile?.dimentions}`}
                        </li>
                        <li>
                          <span className="mobile-details__value">Peso:</span>
                          {` ${currentMobile?.weight}g`}
                        </li>
                      </ul>
                      <section className="mobile-details__actions">
                        <div className="mobile-details__selectors">
                          <label htmlFor="storage">
                            Memoria:
                            <select id="storage" value={storage} onChange={(evt) => setStorage(parseFloat(evt.target.value))}>

                              {currentMobile?.options?.storages?.map(
                                (option) => (
                                  <option
                                    key={option.code}
                                    value={option.code}
                                  >
                                    {option.name}
                                  </option>
                                )
                              )}
                            </select>
                          </label>
                          <label htmlFor="color">
                            Color:
                            <select id="color" value={color} onChange={(evt) => setColor(parseFloat(evt.target.value))}>
                              {currentMobile?.options?.colors?.map(
                                (
                                  option
                                ) => (
                                  <option
                                    key={option.code}
                                    value={option.code}
                                  >
                                    {option.name}
                                  </option>
                                )
                              )}
                            </select>
                          </label>
                        </div>
                        <input className="mobile-details__button" type="button" value="Añadir al carrito" onClick={addMobileToCart} />
                        <input className="mobile-details__button--back" type="button" value="Atrás" onClick={() => navigate(-1)} />
                      </section>
                    </section>
                  </div>
                </>
              )
              : (
                <div className="spinner">
                  <div className="dot1" />
                  <div className="dot2" />
                </div>
              )
            }
    </main>
  );
}

export default Details;
