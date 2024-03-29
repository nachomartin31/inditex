import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { decompressFromBase64 } from 'lz-string';
import { loadCurrentMobile } from '../redux/slices/currentMobile';
import { addToCart } from '../redux/slices/cartSlice';
import fetchDataFromApi from '../utils/loadData';
import storageData from '../utils/storageData';
import '../styles/mobileDetails.scss';

function Details() {
  const currentMobile = useSelector((state) => state.currentMobile.currentMobile);
  const cart = useSelector((state) => state.cart.cart);
  const [storage, setStorage] = useState('');
  const [color, setColor] = useState('');
  const [itemsOnCart, setitemsOnCart] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['']);
  const dispatch = useDispatch();

  async function fetchMobile() {
    let data;
    if (Object.keys(localStorage).some((key) => key.includes(id))) {
      const stringifiedData = localStorage.getItem(`${id}`);
      const dataMinified = JSON.parse(stringifiedData);
      const { value } = dataMinified;
      data = JSON.parse(decompressFromBase64(value));
    } else {
      data = await fetchDataFromApi(`${process.env.REACT_APP_URL}api/product/${id}`);
      storageData(data, `${id}`);
    }
    await dispatch(loadCurrentMobile(data));
  }

  useEffect(() => {
    fetchMobile();
  }, [id]);

  useEffect(() => {
    setColor(currentMobile?.options?.colors[0].code);
    setStorage(currentMobile?.options?.storages[0].code);
  }, [currentMobile]);

  const saveCart = async () => {
    const date = new Date();
    const time = date.getTime();
    const expiration = time + (1000 * 3600);
    date.setTime(expiration);
    await setCookie('cart', JSON.stringify(cart), { path: '/', expires: date });
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
    await setitemsOnCart(itemsOnCart + 1);
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
                        <ul className="mobile-details__storage">
                          <span className="mobile-details__storage--key">Almacenamiento:</span>
                          {currentMobile?.options?.storages?.map(
                            (option) => <li className="mobile-details__storage--value" key={option.code}>{option.name}</li>
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
                        <input className="mobile-details__button" type="button" value="Añadir al carrito" onClick={() => { addMobileToCart(); }} />
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
