import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Voting({ chosen = [] }) {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('Trường Email trống')
  const re = new RegExp('[A-z,0-9]+@st.ueh.edu.vn')
  const checkEmail = (email) => {
    if (email.length === 0) setError('Email trống')
    else if (re.test(email) === false) setError('Email không hợp lệ')
    else
      axios
        .post('https://detector.tools/api/v1/check_email', {
          email: email.trim(),
        })
        .then((res) => {
          if (res.data.isRealEmail === true) {
            setError('')
          } else setError('Email không tồn tại ')
        })
  }
  React.useEffect(() => {
    checkEmail(email)
  }, [email])

  const submit = () => {
    if (chosen.length === 0) {
      toast.info('Vui lòng chọn tối đa 3 ứng viên để bầu chọn', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
    if (error.length === 0 && email.length !== 0 && chosen.length > 0) {
      axios
        .post(`${import.meta.env.VITE_REACT_API_ENDPOINT}voting`, {
          chosen,
          email,
        })
        .then((res) => {
          if (res.data.message === 'already') {
            toast.info(`Bạn đã vote quá 3 lần `, {
              position: 'bottom-left',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            })
          } else
            toast.success(
              `Vote thành công, bạn còn ${res.data.message} lần vote `,
              {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              },
            )
        })
    } else {
      toast.warn(error, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
  }
  return (
    <>
      <hr />
      <div
        className="w-100 d-flex align-items-center align-middle justify-content-between"
        id="voting"
      >
        <div style={{ width: '70%' }}>
          <label className="p-1"> Email sinh viên:</label>
          <input
            type="email"
            id="email_input"
            name="email_input"
            value={email}
            placeholder="example@st.ueh.edu.vn"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />{' '}
          <span className="text-danger">(*)</span>
        </div>

        {error.length > 0 && (
          <p
            id="errorCompile"
            className="text-danger m-0"
            style={{ fontSize: '0.8rem' }}
          >
            {error}
          </p>
        )}
      </div>
      <div id="vottingBtn" className="d-flex justify-content-center">
        <button
          className="px-3 py-1"
          style={{
            borderRadius: '10px',
            border: '1px solid #fffff8',
            fontSize: '1.2rem',
            background: 'linear-gradient(to top,#ffce6c,#fff199)',
            boxShadow: '0px 0px 20px #fffff8',
            cursor: 'pointer',
          }}
          onClick={() => {
            submit()
          }}
        >
          Vote
        </button>
      </div>
    </>
  )
}
