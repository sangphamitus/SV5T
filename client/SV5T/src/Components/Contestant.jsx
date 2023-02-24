import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import TableContest from './Table'
import TableContest2 from './Table2'
import Card from './Card'
import { ToastContainer } from 'react-toastify'
import Image from '../img/toBia2.png'
import SortBtn from './SortBtn'
import axios from 'axios'
import Voting from './Voting'
function Contestant() {
  const [data, setData] = React.useState([])
  const [display, setDisplay] = React.useState({})
  const [chosen, setChosen] = React.useState([])
  const [pageProperty, setPageProperty] = React.useState({
    page: 1,
    maxPage: 5,
  })
  const [filterConfig, setFilterConfig] = React.useState({
    rows: 8,
    id: '',
    names: '',
    faculty: '',
    gen: '',
    drl: 0,
    dht: 0,
  })

  const fetchData = () => {
    console.log('API call')
    axios
      .post(`${import.meta.env.VITE_REACT_API_ENDPOINT}contestant/clientGet`, {
        page: pageProperty.page,
        ...filterConfig,
      })
      .then((res) => {
        if (res.data.messages === 'success') {
          setData(res.data.returnData)
          setPageProperty({ ...pageProperty, maxPage: res.data.maxPage })
        }
      })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 500)
    return () => clearTimeout(timer)
  }, [
    pageProperty.page,
    pageProperty.maxPage,
    filterConfig.rows,
    filterConfig.id,
    filterConfig.names,
    filterConfig.faculty,
    filterConfig.gen,
    filterConfig.dht,
    filterConfig.drl,
  ])

  return (
    <div
      className=" d-flex justify-content-center py-1"
      style={{
        background: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="rounded-pill p-3 "
        style={{
          width: '80%',
          borderRadius: '10px',
          border: '4px solid  #2f4663',
          backgroundColor: 'white',
          color: ' #2f4663',
        }}
      >
        <table className="table ">
          <thead className="text-center  ">
            <tr className="align-items-center">
              <th>#</th>
              <th>MSSV-HS</th>
              <th>Họ và tên</th>
              <th>Khoa</th>
              <th>Khóa</th>
              <th>Điểm rèn luyện</th>
              <th>Điểm học tập</th>
              <th>Bỏ chọn</th>
            </tr>
          </thead>

          <tbody
            className="text-center table-group-divider "
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontSize: '0.8rem',
              overflowY: 'scroll',
            }}
          >
            <TableContest
              data={chosen}
              setDataShow={setDisplay}
              choseAction={setChosen}
              chosed={chosen}
            />
          </tbody>
        </table>
        <hr />
        <table className="table ">
          <thead className="text-center  ">
            <tr className="align-items-center">
              <th>#</th>
              <th>MSSV-HS</th>
              <th>Họ và tên</th>
              <th>Khoa</th>
              <th>Khóa</th>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  switch (filterConfig.drl) {
                    case 0:
                      setFilterConfig({ ...filterConfig, drl: 1 })
                      break
                    case 1:
                      setFilterConfig({ ...filterConfig, drl: -1 })
                      break
                    case -1:
                      setFilterConfig({ ...filterConfig, drl: 0 })
                      break
                  }
                }}
              >
                Điểm rèn luyện
                <SortBtn status={filterConfig.drl} />
              </th>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  switch (filterConfig.dht) {
                    case 0:
                      setFilterConfig({ ...filterConfig, dht: 1 })
                      break
                    case 1:
                      setFilterConfig({ ...filterConfig, dht: -1 })
                      break
                    case -1:
                      setFilterConfig({ ...filterConfig, dht: 0 })
                      break
                  }
                }}
              >
                Điểm học tập
                <SortBtn status={filterConfig.dht} />
              </th>
              <th>Chọn</th>
            </tr>
            <tr className="">
              <th></th>
              <th>
                <input
                  type="text"
                  className="form-control"
                  value={filterConfig['id']}
                  onChange={(e) => {
                    setFilterConfig({ ...filterConfig, id: e.target.value })

                    // fetchData()
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  className="form-control"
                  value={filterConfig['names']}
                  onChange={(e) => {
                    setFilterConfig({ ...filterConfig, names: e.target.value })
                    // fetchData()
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  className="form-control"
                  value={filterConfig['faculty']}
                  onChange={(e) => {
                    setFilterConfig({
                      ...filterConfig,
                      faculty: e.target.value,
                    })
                    // fetchData()
                  }}
                />
              </th>
              <th>
                <input
                  type="text"
                  className="form-control"
                  value={filterConfig['gen']}
                  onChange={(e) => {
                    setFilterConfig({ ...filterConfig, gen: e.target.value })
                    // fetchData()
                  }}
                />
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody
            className="text-center table-group-divider "
            style={{
              backgroundColor: 'white',
              color: 'black',
              fontSize: '0.8rem',
              overflowY: 'scroll',
            }}
          >
            <TableContest
              data={data.filter(
                (item) => !chosen.some((item2) => item2.id === item.id),
              )}
              setDataShow={setDisplay}
              choseAction={setChosen}
              chosed={chosen}
            />
          </tbody>
        </table>
        <div
          className="d-flex justify-content-between  align-items-center"
          style={{ fontSize: '0.8rem' }}
        >
          <div>
            <select
              className="text-center mr-1"
              value={filterConfig.rows}
              onChange={(e) => {
                setFilterConfig({ ...filterConfig, rows: e.target.value })
                // fetchData()
              }}
            >
              <option value={8} label="8"></option>
              <option value={10} label="10">
                {' '}
              </option>
              <option value={15} label="15">
                {' '}
              </option>
              <option value={20} label="20">
                {' '}
              </option>
            </select>
            Dòng
          </div>
          <div className="d-flex ">
            <ul className="pagination align-items-center m-0">
              <li>
                <button
                  className="page-link "
                  disabled={pageProperty.page === 1}
                  onClick={() => {
                    setPageProperty({
                      ...pageProperty,
                      page: pageProperty.page - 1,
                    })
                    // fetchData()
                  }}
                >
                  Previous
                </button>
              </li>
              {Array.from(
                { length: pageProperty.maxPage },
                (_, i) => i + 1,
              ).map((item) => (
                <li key={item}>
                  {item === pageProperty.page ? (
                    <button
                      className={'btn btn-primary'}
                      onClick={() => {
                        setPageProperty({
                          ...pageProperty,
                          page: item,
                        })
                        // fetchData()
                      }}
                    >
                      {item}
                    </button>
                  ) : (
                    <button
                      className={'btn '}
                      onClick={() => {
                        setPageProperty({
                          ...pageProperty,
                          page: item,
                        })
                        // fetchData()
                      }}
                    >
                      {item}
                    </button>
                  )}
                  {/* <button
                    className={
                      item === pageProperty.page ? 'btn btn-primary' : 'btn'
                    }
                    onClick={(e) => {
                      setPageProperty({ ...pageProperty, page: item })
                      fetchData()
                    }}
                  >
                    {item}
                  </button> */}
                </li>
              ))}

              <li>
                <button
                  className="page-link "
                  disabled={pageProperty.page === pageProperty.maxPage}
                  onClick={(e) => {
                    setPageProperty({
                      ...pageProperty,
                      page: pageProperty.page + 1,
                    })
                    // fetchData()
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Card display={display} close={setDisplay} />
        <div className="w-100">
          <Voting chosen={chosen} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Contestant
