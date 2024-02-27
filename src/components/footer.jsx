import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/styles/footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerLogo_cont">
          <Image
            src={"/images/footer_logo.png"}
            height={1000}
            width={1000}
            alt="image"
            className="logo_img"
          />
        </div>
        <div className="footer_contact">
          <div className="footer_contact_h">Contact</div>
          <div className="footerContact_items">
            <div className="contact_item">
              <div className="contact_img_cont">
                <Image
                  src={"/images/location.png"}
                  height={1000}
                  width={1000}
                  alt="image"
                />
              </div>
              <span>WOMPA: 3306 Charles Page Blud, Tulsa, OK 74127</span>
            </div>
            <div className="contact_item">
              <div className="contact_img_cont">
                <Image
                  src={"/images/phone.png"}
                  height={1000}
                  width={1000}
                  alt="image"
                />
              </div>
              <span>+1-678-834-9495</span>
            </div>
            <div className="contact_item">
              <div className="contact_img_cont">
                <Image
                  src={"/images/mail.png"}
                  height={1000}
                  width={1000}
                  alt="image"
                />
              </div>
              <span>support@certracker.com</span>
            </div>
          </div>
        </div>

        <div className="footer_socials">
          <div className="socials_h">Follow Us</div>
          <div className="footerSocial_items">
            <Link href={"#"} className="social_item">
              <Icon icon="logos:facebook" id="f_icon" />
              <span>Facebook</span>
            </Link>
            <Link href={"#"} className="social_item">
              <Icon icon="devicon:twitter" id="f_icon" />
              <span>Twitter</span>
            </Link>
            <Link href={"#"} className="social_item">
              <Icon icon="skill-icons:instagram" id="f_icon" />
              <span>Instagram</span>
            </Link>
          </div>
        </div>

        <div className="subscribe">
          <div className="subscribe_h">Subscribe to our Newsletter</div>
          <div className="footerEmailCont">
            <input type="email" placeholder="Enter E-mail" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="copyright">
        <hr />
        <span>Copyright@2024</span>
        <hr />
      </div>
    </>
  );
};

export default Footer;
