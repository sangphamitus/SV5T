import '../stle/style.css'
import imgAge from '../img/bia2.png'
function Header() {
  return (
    <div id="content-header">
      <div
        className="d-flex justify-content-between"
        style={{
          zIndex: '4',
          position: 'absolute',
          top: 'calc(8vw)',
          fontSize: 'calc( 1.5vw)',
        }}
      >
        <div style={{ width: '60%', left: '0' }}></div>
        <div
          className="p-3 "
          style={{
            width: '36%',
            right: '0',
            color: 'white',
            fontWeight: '600',
            justifyItems: 'self-end',
          }}
        >
          <p>Xin thông báo...</p>
          <p>
            Bạn vừa nhận được một lá thư từ chú chim bồ câu "BAN TÌNH NGUYỆN -
            HỖ TRỢ SINH VIÊN UEH" mang tên "SINH VIÊN 5 TỐT UEH 2022" sau một
            hành trình dài không ngừng nỗ lực, phấn đấu và kiên trì tới cùng
          </p>
          <div className="d-flex justify-content-center">
            <button
              style={{
                border: '1px solid #fffff8',
                fontSize: 'calc( 2.5vw)',
                background: 'linear-gradient(to top,#ffce6c,#fff199)',
                boxShadow: '0px 0px 20px #fffff8',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
              onClick={() => {
                window.location.href = '#Gallery'
              }}
            >
              START
            </button>
          </div>
        </div>
      </div>
      <img src={imgAge} style={{ top: '-1vh', width: '100%' }} />
    </div>
  )
}
export default Header
