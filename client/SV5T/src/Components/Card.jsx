import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import ReactHtmlParser from 'react-html-parser'
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
            style={{
              width: '70vw',
              height: '100vh',
              position: 'fixed',
              top: '0',
              right: '0',
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
              className="d-flex w-100 h-100 justify-content-between p-3"
              style={{
                backgroundColor: '#E1E5EA',
                color: 'black',
              }}
            >
              <div
                className="p-2"
                style={{
                  maxWidth: '40%',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  height: 'fit-content',
                }}
              >
                <img
                  src={display.img}
                  style={{ maxWidth: '100%', borderRadius: '10px' }}
                  loading="lazy"
                />
                <div className="mt-2">
                  <h4>{display.fmname + ' ' + display.name}</h4>
                  <h6>
                    <b>Khoa: </b> {display.faculty}
                  </h6>
                  <h6>
                    <b>Khóa: </b> {display.gen}
                  </h6>
                  <h6>
                    <b>Lớp: </b> {display.clss}
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
                    <b>Điểm rèn luyện: </b>
                    {display.drl}
                  </p>
                  <p>
                    <b>Điểm học tập: </b>
                    {display.dht}
                  </p>
                  <b>Đạo đức tốt: </b> <br />
                  {ReactHtmlParser(display.ddt)}
                  <b>Học tập tốt: </b> <br />
                  {ReactHtmlParser(display.htt)}
                  <b>Thể lực tốt: </b> <br />
                  {ReactHtmlParser(display.tlt)}
                  <b>Tình nguyện tốt: </b> <br />
                  {ReactHtmlParser(display.tnt)}
                  <b>Hội nhập tốt: </b> <br />
                  {ReactHtmlParser(display.hnt)}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
