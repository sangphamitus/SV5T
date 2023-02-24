import React from 'react'

export default function Footer() {
  return (
    <footer id="contactus">
      <div id="footer-display">
        <div id="gioithieu" className="footer-column">
          <h3>Giới thiệu</h3>
          <p>BAN TÌNH NGUYỆN - HỖ TRỢ SINH VIÊN</p>
        </div>
        <div id="ttlh" className="footer-column">
          <h3>Thông tin liên hệ</h3>

          <p>
            {' '}
            <svg
              className="svg-icon"
              viewBox="0 0 20 20"
              style={{ width: '35px', height: '35px', fill: 'white' }}
            >
              <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
            </svg>{' '}
            Email: bantinhnguyen@ueh.edu.vn
          </p>

          <p>
            {' '}
            <svg
              className="svg-icon"
              viewBox="0 0 20 20"
              style={{ width: '35px', height: '35px', fill: 'white' }}
            >
              <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
            </svg>
            Đoàn Thanh niên - Hội Sinh viên UEH: https://youth.ueh.edu.vn/
          </p>

          <p>
            {' '}
            <svg
              className="svg-icon"
              viewBox="0 0 20 20"
              style={{ width: '35px', height: '35px', fill: 'white' }}
            >
              <path d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></path>
            </svg>{' '}
            Gather Town: Bi Ti En Town
          </p>
        </div>
        <div id="Fanpage" className="footer-column">
          <h3>Fanpage</h3>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftnhtsv.ueh&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            style={{ border: 'none', overflow: 'hidden' }}
            allowFullScreen="True"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </footer>
  )
}
