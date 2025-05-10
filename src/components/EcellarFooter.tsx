import { Container, Row, Col } from 'react-bootstrap'
import logo_eCellar from '../assets/logo_eCellar.png'

const EcellarFooter = () => {
  return (
    <footer className="ecellar-footer py-3">
      <Container>
        <Row className="align-items-center">
          {/* Logo - Ridotto al minimo */}
          <Col xs={2} className="pe-3 text-end">
            <img
              src={logo_eCellar}
              alt="eCellar Logo"
              className="footer-logo "
              style={{ width: '30px' }}
            />
          </Col>

          {/* Links - Allineati verticalmente al logo */}
          <Col xs={7} className="ps-1">
            <div className="d-flex flex-wrap footer-links-container">
              <a href="/app" className="footer-link">
                App
              </a>
              <a href="/about" className="footer-link">
                About
              </a>
              <a href="/contact" className="footer-link">
                Contact
              </a>
              <a href="/press" className="footer-link">
                Press
              </a>
              <a href="/careers" className="footer-link">
                Careers
              </a>
              <a href="/terms" className="footer-link">
                Terms of Use
              </a>
              <a href="/privacy" className="footer-link">
                Privacy Policy
              </a>
              <a href="/content" className="footer-link">
                Content Policy
              </a>
              <a href="/sales" className="footer-link">
                Terms of Sale
              </a>
              <a href="/sitemap" className="footer-link">
                Sitemap
              </a>
            </div>
          </Col>

          {/* Social + Copyright - Allineati a destra */}
          <Col xs={3} className="text-end">
            <div className="social-icons mb-1">
              <a
                href="https://facebook.com"
                className="ms-2"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                className="ms-2"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://x.com"
                className="ms-2"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
            <div className="copyright-text">
              © eCellar 2025 - All rights reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default EcellarFooter
