import { Container, Row, Col } from 'react-bootstrap'
import logo_eCellar from '../assets/logo_eCellar.png'

function EcellarFooter() {
  return (
    <footer className="ecellar-footer bg-light text-dark pt-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <img
              src={logo_eCellar}
              alt="eCellar Logo"
              className="footer-logo"
            />
          </Col>
          <Col md={3} className="mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="/press" className="footer-link">
                  Press
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Community</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/blog" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="/guides" className="footer-link">
                  Wine Guides
                </a>
              </li>
              <li>
                <a href="/events" className="footer-link">
                  Events
                </a>
              </li>
              <li>
                <a href="/faq" className="footer-link">
                  FAQ
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/terms" className="footer-link">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/privacy" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookies" className="footer-link">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/sitemap" className="footer-link">
                  Sitemap
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr />

        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0 text-center text-md-start">
            <div className="social-icons">
              <a href="https://facebook.com" className="me-3 text-darkred">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://instagram.com" className="me-3 text-darkred">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://twitter.com" className="me-3 text-darkred">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="https://youtube.com" className="text-darkred">
                <i className="bi bi-youtube fs-4"></i>
              </a>
            </div>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} eCellar. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default EcellarFooter
