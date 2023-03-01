import React from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function TableContest({
  data = [],
  setDataShow,
  choseAction,
  chosed,
  ...rest
}) {
  const check = (idCheck) => {
    console.log(idCheck.id)
    if (chosed.some((el) => el.id === idCheck.id)) {
      choseAction(chosed.filter((item) => item.id !== idCheck.id))
    } else {
      if (chosed.length >= 3) {
        toast.warn('Bạn chỉ được chọn tối đa 3 ứng viên để vote !!! ', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      } else {
        choseAction((prev) => [...prev, idCheck])
      }
    }
  }

  return (
    <>
      {data.length > 0 &&
        data.map((item, i) => {
          return (
            <tr
              key={i}
              onClick={(e) => {
                setDataShow(item)
              }}
            >
              <td>{i + 1}</td>
              <td>{item.id}</td>
              <td>{item.fmname + ' ' + item.name}</td>
              <td>{item.faculty}</td>
              <td>{item.gen}</td>
              <td>{item.drl}</td>
              <td>{item.dht}</td>
              <td>
                {chosed.some((el) => el.id === item.id) ? (
                  <button
                    className="btn btn-danger "
                    onClick={(e) => {
                      e.stopPropagation()
                      check(item)
                    }}
                  >
                    Bỏ chọn
                  </button>
                ) : (
                  <button
                    className="btn btn-success "
                    onClick={(e) => {
                      e.stopPropagation()
                      check(item)
                    }}
                  >
                    Chọn
                  </button>
                )}
              </td>
            </tr>
          )
        })}
    </>
  )
}
