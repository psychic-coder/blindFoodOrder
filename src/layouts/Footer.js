import Link from "next/link";

const Footer = () => {
  return (
    <footer className="gap no-bottom" style={{ backgroundColor: "#363636" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="footer-description">
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={163}
                  height={38}
                  viewBox="0 0 163 38"
                >
                  <g id="Logo-w" transform="translate(-260 -51)">
                    <g
                      id="Logo-2-w"
                      data-name="Logo-w"
                      transform="translate(260 51)"
                    >
                      <g id="Elements-w">
                        <path
                          id="Path_2429"
                          data-name="Path 2429"
                          d="M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z"
                          transform="translate(-270.155 -115.396)"
                          fill="#f29f05"
                        />
                        <path
                          id="Path_2430"
                          data-name="Path 2430"
                          d="M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z"
                          transform="translate(-264.176 -113.935)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2431"
                          data-name="Path 2431"
                          d="M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z"
                          transform="translate(-266.247 -108.544)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2432"
                          data-name="Path 2432"
                          d="M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z"
                          transform="translate(-264.027 -108.446)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2433"
                          data-name="Path 2433"
                          d="M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z"
                          transform="translate(-271.815 -108.923)"
                          fill="#f29f05"
                        />
                        <path
                          id="Path_2434"
                          data-name="Path 2434"
                          d="M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z"
                          transform="translate(-264.154 -116.667)"
                          fill="#f29f05"
                        />
                        <path
                          id="Path_2435"
                          data-name="Path 2435"
                          d="M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z"
                          transform="translate(-270.84 -107.068)"
                          fill="#fff"
                        />
                        <path
                          id="Path_2436"
                          data-name="Path 2436"
                          d="M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z"
                          transform="translate(-269.379 -105.218)"
                          fill="#fff"
                        />
                      </g>
                    </g>
                    <text
                      id="Quickeat-w"
                      transform="translate(320 77)"
                      fill="#fff"
                      fontSize={20}
                      fontFamily="Poppins"
                      fontWeight={700}
                    >
                      <tspan x={0} y={0}>
                        Voice2
                      </tspan>
                      <tspan y={0} fill="#f29f05">
                        Byte
                      </tspan>
                    </text>
                  </g>
                </svg>
              </Link>
              <h2>The Best Restaurants in Your Home</h2>
              <p>
                Vitae congue mauris rhoncus aenean. Enim nulla aliquet porttitor
                lacus luctus accumsan tortor posuere. Tempus egestas sed sed
                risus pretium quam.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="menu">
              <h4>Menu</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="/">
                    home
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
                <li>
                  <Link href="about">
                    about us
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
                <li>
                  <Link href="restaurants">
                    Restaurants
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
                <li>
                  <Link href="contacts">
                    Contacts
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="menu contacts">
              <h4>Contacts</h4>
              <div className="footer-location">
                <i className="fa-solid fa-location-dot" />
                <p>1717 Harrison St, San Francisco, CA 94103, United States</p>
              </div>
              <a href="mailto:quickeat@mail.net">
                <i className="fa-solid fa-envelope" />
                quickeat@mail.net
              </a>
              <a href="callto:+14253261627">
                <i className="fa-solid fa-phone" />
                +1 425 326 16 27
              </a>
            </div>
            <ul className="social-media">
              <li>
                {" "}
                <a href="https://facebook.com" target="_blank">
                  <i className="fa-brands fa-facebook-f" />
                </a>
              </li>
              <li>
                {" "}
                <a href="https://instagram.com" target="_blank">
                  <i className="fa-brands fa-instagram" />
                </a>
              </li>
              <li>
                {" "}
                <a href="https://twitter.com" target="_blank">
                  <i className="fa-brands fa-twitter" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-two gap no-bottom">
          <p>Copyright © 2023. VoiceToByte. All rights reserved.</p>
          <div className="privacy">
            {" "}
            <a href="#">Privacy Policy</a> <a href="#">Terms &amp; Services</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
