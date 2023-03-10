import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import ReactHtmlParser from 'react-html-parser'
import './Contestant.css'
export default function Card({ display = {}, close, ...rest }) {
  return (
    <>
      {Object.keys(display).length > 0 && (
        <aside>
          <div
            style={{
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: '0',
              right: '0',
              backgroundColor: 'black',
              opacity: '0.5',
              zIndex: '100',
            }}
            onClick={() => {
              close({})
            }}
          ></div>
          <div
            id="side"
            style={{
              width: '70vw',
              height: '100vh',
              position: 'fixed',
              top: '0',
              right: '15vw',
              backgroundColor: 'white',
              opacity: '1',
              zIndex: '200',
            }}
          >
            <div
              className="d-flex w-100 justify-content-between align-items-center p-2"
              style={{ color: 'black' }}
            >
              <p className="m-0">MSSV-HS: {display.id}</p>
              <button
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
                onClick={() => {
                  close({})
                }}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <div
              id="innerLayout"
              className="d-flex w-100 h-100 justify-content-around p-3"
              style={{
                backgroundColor: '#E1E5EA',
                color: 'black',
              }}
            >
              <div
                className="p-2 "
                style={{
                  maxWidth: '40%',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  height: 'fit-content',
                }}
              >
                <div className="d-flex justify-content-center w-100">
                  <img
                    src={display.img}
                    style={{
                      maxWidth: 'calc(20vw)',

                      borderRadius: '10px',
                    }}
                    loading="lazy"
                  />
                </div>

                <div className="mt-2">
                  <h4>{display.fmname + ' ' + display.name}</h4>
                  <h6>
                    <b>Khoa: </b> {display.faculty}
                  </h6>
                  <h6>
                    <b>Kh??a: </b> {display.gen}
                  </h6>
                  <h6>
                    <b>L???p: </b> {display.clss}
                  </h6>
                </div>
              </div>
              <div
                style={{
                  maxWidth: '55%',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  height: 'fit-content',
                }}
              >
                <div
                  className="p-3 "
                  style={{ overflowY: 'scroll', height: '85vh' }}
                >
                  <p>
                    <b>??i???m r??n luy???n: </b>
                    {display.drl}
                  </p>
                  <p>
                    <b>??i???m h???c t???p: </b>
                    {display.dht}
                  </p>
                  <b>?????o ?????c t???t: </b> <br />
                  {ReactHtmlParser(display.ddt.replaceAll('@', '<br/>'))}
                  <b>H???c t???p t???t: </b> <br />
                  {ReactHtmlParser(display.htt.replaceAll('@', '<br/>'))}
                  <b>Th??? l???c t???t: </b> <br />
                  {ReactHtmlParser(display.tlt.replaceAll('@', '<br/>'))}
                  <b>T??nh nguy???n t???t: </b> <br />
                  {ReactHtmlParser(display.tnt.replaceAll('@', '<br/>'))}
                  <b>H???i nh???p t???t: </b> <br />
                  {ReactHtmlParser(display.hnt.replaceAll('@', '<br/>'))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
