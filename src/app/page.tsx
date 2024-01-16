"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "./page.css";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="container-home">
        <div className="container_section1">
          <div className="vectorCont">
            <Image
              src={"/vector.png"}
              alt="logo"
              height={500}
              width={500}
              className="vector"
            />
          </div>
          <div className="header-landing">
            <div className="logoCont-landing">
              <Image
                src={"/logo.png"}
                alt="logo"
                height={1000}
                width={1000}
                className="logo"
              />
            </div>
            <div className="icons-h-h">
              <span>
                <Icon icon="ic:baseline-home" className="icon" />
              </span>
              <span>
                <Icon icon="mingcute:user-4-fill" className="icon" />
              </span>
              <span>
                <Icon icon="mdi:heart" className="icon" />
              </span>
            </div>
          </div>
          {/* this is the welcome info section */}
          <div className="welcome-info">
            <div className="welcome-infoTxt">
              <h1>
                Manage your Certificates and Licenses directly at your
                fingertips
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                nisi nesciunt reiciendis adipisci. Nihil natus, ab quibusdam
                debitis alias sapiente?
              </p>
              <div className="home-btnsCont">
                <Link href={"/signin"} className="home-btn get-started-btn">
                  Get Started
                </Link>
                <input type="button" value="Learn More" className="home-btn" />
              </div>
            </div>
            <div className="welcom-infoImg">
              <Image
                src={"/medical2.png"}
                alt="md"
                height={500}
                width={500}
                className="welcome-img_img"
              />
            </div>
          </div>
        </div>
        {/* this is the section two of the homw page  */}
        <div className="container_section">
          <div className="sectionTxt">
            <h1>Manage multiple certificates and licenses</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. In pharetra sem lorem
              convallis orci fames aliquet commodo eu. At augue cras tincidunt
              ut eget viverra nulla non. Est scelerisque amet leo eu iaculis
              velit.
            </p>
          </div>
          <div className="sectionImg">
            <Image src={"/certs.png"} alt="ct" height={500} width={500} />
          </div>
        </div>
        {/* this is the end of the section 2 */}

        {/* this is the section 3 */}
        <div className="container_section">
          <div className="sectionImg">
            <Image src={"/manage.png"} alt="ct" height={500} width={500} />
          </div>
          <div className="sectionTxt">
            <h1>Manage multiple expiration and dates</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. In pharetra sem lorem
              convallis orci fames aliquet commodo eu. At augue cras tincidunt
              ut eget viverra nulla non. Est scelerisque amet leo eu iaculis
              velit.
            </p>
          </div>
        </div>
        {/* this is the end of the section 3 */}

        {/* this is the section 4 */}
        <div className="container_section">
          <div className="sectionTxt">
            <h1>Manage multiple expiration and dates</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. In pharetra sem lorem
              convallis orci fames aliquet commodo eu. At augue cras tincidunt
              ut eget viverra nulla non. Est scelerisque amet leo eu iaculis
              velit.
            </p>
          </div>
          <div className="sectionImg">
            <Image src={"/manage2.png"} alt="ct" height={500} width={500} />
          </div>
        </div>
        {/* this is the end of the section 4 */}

        {/* this is the footer section */}
        <div className="footer-home">
          <div className="up">
            <div className="quickLinks">
              <div className="footSections">
                <h1>Pages</h1>
                <ul>
                  <li>About</li>
                  <li>Services</li>
                  <li>Contact us</li>
                  <li>Account</li>
                </ul>
              </div>
              <div className="footSections">
                <h1>Quick Links</h1>
                <ul>
                  <li>Privacy policy</li>
                  <li>Terms of Services</li>
                  <li>Credits</li>
                  <li>Security</li>
                </ul>
              </div>
              <div className="footSections">
                <h1>Support</h1>
                <ul>
                  <li>FAQS</li>
                  <li>Help Center</li>
                  <li>Accessibility</li>
                </ul>
              </div>
            </div>
            <div className="footLogo">
              <div className="footImg-cont">
                <Image
                  src={"/log_footer.png"}
                  alt="logo"
                  height={500}
                  width={500}
                  className="footImg"
                />
              </div>
              <div className="follow">
                <h1>Follow us on:</h1>
                <div className="foot-icons">
                  <span>
                    <Icon
                      icon="akar-icons:instagram-fill"
                      className="icon-footer"
                    />
                  </span>
                  <span>
                    <Icon
                      icon="akar-icons:twitter-fill"
                      className="icon-footer"
                    />
                  </span>
                  <span>
                    <Icon
                      icon="akar-icons:facebook-fill"
                      className="icon-footer"
                    />
                  </span>
                  <span>
                    <Icon
                      icon="akar-icons:linkedin-box-fill"
                      className="icon-footer"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="copyRight">
            <hr />
            <p>Copyright © 2024 Certracter. All rights reserved</p>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
