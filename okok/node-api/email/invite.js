const template = (sender, senderEncryptedEmail) => `
  <!doctype html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title>
      </title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a{padding: 0;}
              .ReadMsgBody{width: 100%;}
              .ExternalClass{width: 100%;}
              .ExternalClass *{line-height: 100%;}
              body{margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
              table, td{border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
              img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
              p{display: block; margin: 13px 0;}
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
        @media only screen and (max-width:480px) {
                    @-ms-viewport {width: 320px;}
                    @viewport {	width: 320px; }
                }
      </style>
      <!--<![endif]-->
      <!--[if mso]> 
      <xml> 
        <o:OfficeDocumentSettings> 
          <o:AllowPNG/> 
          <o:PixelsPerInch>96</o:PixelsPerInch> 
        </o:OfficeDocumentSettings> 
      </xml>
      <![endif]-->
      <!--[if lte mso 11]> 
      <style type="text/css"> 
        .outlook-group-fix{width:100% !important;}
      </style>
      <![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
        .dys-column-per-90 {
          width: 90% !important;
          max-width: 90%;
        }
        }
      </style>
    </head>
    <body>
      <div>
        <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='background:#f7f7f7;background-color:#f7f7f7;width:100%;'>
          <tbody>
            <tr>
              <td>
                <div style='margin:0px auto;max-width:600px;'>
                  <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation' style='width:100%;'>
                    <tbody>
                      <tr>
                        <td style='direction:ltr;font-size:0px;padding:20px;text-align:center;vertical-align:top;'>
                          <!--[if mso | IE]>
  <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:540px;">
  <![endif]-->
                          <div class='dys-column-per-90 outlook-group-fix' style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                            <table border='0' cellpadding='0' cellspacing='0' role='presentation' width='100%'>
                              <tbody>
                                <tr>
                                  <td style='background-color:#ffffff;border:1px solid #ccc;padding:50px 15px;vertical-align:top;'>
                                    <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='' width='100%'>
                                      <tr>
                                        <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                          <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:21px;text-align:center;'>
                                            <span>
                                              Bond with <b>${sender[0].name}</b> (${sender[0].email}). Your partner wants to bond with you. Click the button below to bond now.
                                              <br />
                                              <br />
                                            </span>
                                            <span style='font-weight:700; color: #ff6f6f; font-size: 18px;'>
                                              Bond
                                            </span>
                                            <span>
                                              Community
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                          <div style='color:#777777;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;line-height:21px;text-align:center;'>
                                            <p style='padding: 10px 0; border: 1px solid #cccccc; color: #4d4d4d; font-weight: bold; font-size: 18px; text-align: center;'>
                                              Te amo
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align='center' style='font-size:0px;padding:10px 25px;word-break:break-word;' vertical-align='middle'>
                                          <table border='0' cellpadding='0' cellspacing='0' role='presentation' style='border-collapse:separate;line-height:100%;'>
                                            <tr>
                                              <td align='center' bgcolor='#ff6f6f' role='presentation' style='background-color:#ff6f6f;border:none;border-radius:5px;cursor:auto;padding:10px 25px;' valign='middle'>
                                                <a href='http://bond-nu.vercel.app/accept?bondkey=${senderEncryptedEmail}' style='background:#ff6f6f;color:#ffffff;font-family:Oxygen, Helvetica neue, sans-serif;font-size:14px;font-weight:400;line-height:21px;margin:0;text-decoration:none;text-transform:none;' target='_blank'>
                                                  Bond now!
                                                </a>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>
`;

module.exports = template;
