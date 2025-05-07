import { Container, Row, Col, ListGroupItem } from 'react-bootstrap'

function EcellarFooter() {
  return (
    <footer className="ecellar-footer bg-light text-dark mt-5 pt-4">
      <Container>
        <Row>
          <Col className="col-12 col-lg-8 mx-lg-auto text-center text-lg-start mb-3">
            <i className="bi bi-facebook me-3 fs-4 text-darkred"></i>
            <i className="bi bi-instagram me-3 fs-4 text-darkred"></i>
            <i className="bi bi-twitter me-3 fs-4 text-darkred"></i>
            <i className="bi bi-youtube fs-4 text-darkred"></i>
          </Col>
        </Row>
        <Row className="mb-3 text-center text-lg-start">
          {[
            ['Audio and Subtitles', 'Media Center', 'Privacy', 'Contact Us'],
            ['Audio Description', 'Investor Relations', 'Legal Notices'],
            ['Help Center', 'Jobs', 'Cookie Preferences'],
            ['Gift Cards', 'Terms of Use', 'Corporate Information'],
          ].map((column, idx) => (
            <Col key={idx} className="col-12 col-lg-2 offset-lg-2 text-dark">
              {column.map((item, i) => (
                <ListGroupItem
                  key={i}
                  className="bg-light border-0 text-dark py-1 ps-0"
                >
                  {item}
                </ListGroupItem>
              ))}
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="col-12 col-lg-8 mx-lg-auto text-center text-lg-start">
            <p className="d-inline-block px-2 py-1 my-3 border border-1 border-dark text-dark">
              Service Code
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 col-lg-8 mx-lg-auto text-center text-lg-start pb-4">
            <p className="mb-0">
              <i className="bi bi-c-circle me-1"></i>1997–2019 Netflix, Inc.
              i-0d00fcda2fdf9c0de
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default EcellarFooter
