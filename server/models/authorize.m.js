const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const VottingM = require('./votting.m')
require('dotenv').config()
module.exports = {
  codeGenerater: async () => {
    try {
      const emailList = process.env.EMAIL_DIST.toString().split(',')

      const token = jwt.sign(
        {
          data: 'Hello',
        },
        process.env.SECRET_TOKEN,
        { expiresIn: 60 * 5 },
      )
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: `${process.env.USERNAME_GMAIL}`,
          pass: `${process.env.PASSWORD_GMAIL}`,
        },
      })

      var content = ` <div id=":p9" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
      <div id=":ok" class="a3s aiL ">
        <table border="0" cellspacing="0" cellpadding="0" style="max-width:600px">
          <tbody>
            <tr>
              <td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td align="left">
                        <img width="92" height="32" src="https://www.sv5t-ueh.live/assets/LOGO-8380dd76.png" style="display:block;width:92px;height:32px" class="CToWUd" data-bit="iit">
                      </td>
                      <td align="right">
                        <img width="32" height="32" style="display:block;width:32px;height:32px" src="https://www.sv5t-ueh.live/assets/title-fbbfbb1a.png" class="CToWUd" data-bit="iit">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr height="16"></tr>
            <tr>
              <td>
                <table bgcolor="#4184F3" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #e0e0e0;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px">
                  <tbody>
                    <tr>
                      <td height="72px" colspan="3"></td>
                    </tr>
                    <tr>
                      <td width="32px"></td>
                      <td style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff;line-height:1.25">Mã xác minh Reset Vote</td>
                      <td width="32px"></td>
                    </tr>
                    <tr>
                      <td height="18px" colspan="3"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table bgcolor="#FAFAFA" width="100%" border="0" cellspacing="0" cellpadding="0" style="min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px">
                  <tbody>
                    <tr height="16px">
                      <td width="32px" rowspan="3"></td>
                      <td></td>
                      <td width="32px" rowspan="3"></td>
                    </tr>
                    <tr>
                      <td>
                        <p>Chúng tôi nhận được yêu cầu cần đặt lại số lượng voting, vui lòng nhập mã code phía dưới để tiếp tục. </p>
                        <div style="text-align:center">
                          <p dir="ltr">
                          <a href="http://127.0.0.1:5200/resetVote?tk=${token}">Reset</a>
                           
                          </p>
                        </div>
                       
                        <p>Trân trọng! <br>Nhóm Host SV5T </p>
                        <p></p>
                        <p></p>
                      </td>
                    </tr>
                    <tr height="32px"></tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr height="16"></tr>
            <tr>
              <td style="max-width:600px;font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:10px;color:#bcbcbc;line-height:1.5">
                <table>
                  <tbody>
                    <tr>
                      <td>
                       
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="yj6qo"></div>
    </div>`
      emailList.forEach((email) => {
        console.log(email)
        var mainOptions = {
          // thiết lập đối tượng, nội dung gửi mail
          from: 'SV5T admin',
          to: `${email}`,
          subject: 'Reset voting Code',
          text: 'Your text is here', //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
          html: content, //Nội dung html mình đã tạo trên kia :))
        }
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err)
            throw err
          } else {
            console.log('Send success', email)
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  },
  codeVerify: async (req, res, next) => {
    try {
      console.log('codeVerify')
      const { tk } = req.query
      console.log(tk)

      const decoded = jwt.verify(tk, process.env.SECRET_TOKEN)
      console.log(decoded)
      if (decoded.data === 'Hello') {
        const result = await VottingM.resetVote()
        return res.redirect('/sum')
      } else {
        const result = await VottingM.getallVoting()
        return res.render('voting.hbs', {
          data: result,
          messages: 'Mã không có hiệu lực',
        })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
}
