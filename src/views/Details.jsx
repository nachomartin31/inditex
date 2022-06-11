import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadCurrentMobile } from '../redux/slices/currentMobile';
import '../styles/mobileDetails.scss';

function Details() {
  const currentMobile = useSelector((state) => state.currentMobile.currentMobile);
  const dispatch = useDispatch();
  async function fetchMobile() {
    const id = window.location.pathname.substring(1, window.location.pathname.length);
    const { data } = await axios.get(`${process.env.REACT_APP_URL}api/product/${id}`);
    await dispatch(loadCurrentMobile(data));
  }
  useEffect(() => {
    fetchMobile();
  }, []);

  return (
    <main className="mobile-details">
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
            <nav>
              <div>

                <label htmlFor="storage">
                  Memoria:
                  <select id="storage">

                    {currentMobile?.options?.storages?.map(
                      (option) => <option key={option.code}>{option.name}</option>
                    )}
                  </select>
                </label>
                <label htmlFor="color">
                  Color:
                  <select id="color">

                    {currentMobile?.options?.colors?.map(
                      (option) => <option key={option.code}>{option.name}</option>
                    )}
                  </select>
                </label>
              </div>
              <input type="button" value="Añadir al carrito" />
            </nav>
          </section>
        </section>
      </div>
    </main>
  );
}

export default Details;
