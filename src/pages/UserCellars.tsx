import { useState, useEffect } from 'react'
import wine_cellar_barrels from '../assets/wine_cellar_barrels.png'
import { NavDropdown } from 'react-bootstrap'
import { CellarDTO } from '../types/CellarDTO'
import { getMyCellars } from '../services/cellarService'

const UserCellars = () => {
  const [cellars, setCellars] = useState<CellarDTO[]>([])
  const [selectedCellar, setSelectedCellar] = useState<CellarDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCellars = async () => {
      try {
        const data = await getMyCellars()
        setCellars(data)
        setSelectedCellar(data[0] || null)
      } catch (err) {
        console.error('Error fetching user cellars:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCellars()
  }, [])

  const renderBottlesOnShelf = (
    bottles: { id: string; name: string }[],
    startIndex: number
  ) => {
    return bottles.map((bottle, index) => {
      const positionIndex = (startIndex + index) % 14
      return (
        <div
          key={bottle.id}
          className={`bottle bottle-pos-${positionIndex + 1}`}
          title={bottle.name}
        />
      )
    })
  }

  const renderWineCellar = () => {
    if (isLoading) {
      return (
        <div className="text-center py-5">Loading your wine collection...</div>
      )
    }

    // Always show the cellar layout (even if no bottles)
    if (!selectedCellar || selectedCellar.cellarWines.length === 0) {
      return (
        <div className="wine-cellar-container mt-5">
          {/* Empty shelves */}
          <div className="wine-cellar-shelf">{/* No bottles */}</div>
        </div>
      )
    }

    const shelfGroups = []
    for (let i = 0; i < selectedCellar.cellarWines.length; i += 14) {
      shelfGroups.push(selectedCellar.cellarWines.slice(i, i + 14))
    }

    return (
      <div className="wine-cellar-container mt-5">
        {shelfGroups.map((bottles, shelfIndex) => (
          <div key={`shelf-${shelfIndex}`} className="wine-cellar-shelf">
            {renderBottlesOnShelf(
              bottles.map((bw) => ({
                id: bw.cellarWineId,
                name: bw.personalNotes || `Wine ID: ${bw.wineId}`,
              })),
              shelfIndex * 14
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* OVERLAY SINISTRO */}
      <div className="user-cellars-left-overlay">
        <h4 className="text-darkred">Your Cellars</h4>
        <div className="d-flex align-items-center mb-2">
          <NavDropdown
            title={
              selectedCellar?.name ||
              (cellars.length === 0 ? 'No cellars' : 'Select a cellar')
            }
            onSelect={(eventKey) =>
              setSelectedCellar(
                cellars.find((c) => c.cellarId === eventKey) || null
              )
            }
            className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 me-2"
            id="cellar-dropdown"
          >
            {cellars.length > 0 ? (
              cellars.map((cellar) => (
                <NavDropdown.Item
                  key={cellar.cellarId}
                  eventKey={cellar.cellarId}
                  active={selectedCellar?.cellarId === cellar.cellarId}
                >
                  {cellar.name}
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item disabled>No cellars</NavDropdown.Item>
            )}
          </NavDropdown>
          <a
            href="#"
            className="text-decoration-underline small fs-6"
            style={{ color: 'darkred', cursor: 'pointer' }}
          >
            create new cellar
          </a>
        </div>

        {/* INFO BOX */}
        {selectedCellar ? (
          selectedCellar.cellarWines.length > 0 ? (
            <div className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 shadow-sm">
              <h5 className="mb-1">{selectedCellar.name}</h5>
              <p className="text-muted">{selectedCellar.description}</p>
              <hr className="my-2" />
              <ul className="list-unstyled mb-0">
                {selectedCellar.cellarWines.map((w) => (
                  <li key={w.cellarWineId}>
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{ color: 'darkred', cursor: 'pointer' }}
                    >
                      {w.personalNotes || `Wine ID: ${w.wineId}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 shadow-sm">
              <p className="text-muted">
                Your wine cellar is empty. Add some bottles!
              </p>
            </div>
          )
        ) : cellars.length === 0 ? (
          <div className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 shadow-sm">
            <p className="text-muted">
              You don't have any cellar. Create a new one!
            </p>
          </div>
        ) : null}
      </div>

      {/* LAYOUT CENTRALE */}
      <div className="user-cellars-layout">
        <div className="user-cellars-left">
          <div className="wine-cellar-section">{renderWineCellar()}</div>
        </div>
        <div className="user-cellars-right">
          <img
            src={wine_cellar_barrels}
            alt="Wine cellar barrels"
            className="cellar-barrels-img"
          />
        </div>
      </div>
    </>
  )
}

export default UserCellars
