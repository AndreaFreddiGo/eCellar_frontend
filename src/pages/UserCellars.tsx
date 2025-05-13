import { useState, useEffect } from 'react'
import wine_cellar_barrels from '../assets/wine_cellar_barrels.png'
import { Button, NavDropdown } from 'react-bootstrap'
import { CellarDTO } from '../types/CellarDTO'
import { getMyCellars, deleteCellar } from '../services/cellarService'
import CreateCellarModal from '../components/CreateCellarModal'
import UpdateCellarModal from '../components/UpdateCellarModal'

const UserCellars = () => {
  const [cellars, setCellars] = useState<CellarDTO[]>([])
  const [selectedCellar, setSelectedCellar] = useState<CellarDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const fetchCellars = async () => {
    try {
      const data = await getMyCellars()
      setCellars(data)
      if (!selectedCellar || !data.some((c) => c.id === selectedCellar.id)) {
        setSelectedCellar(data[0] || null)
      }
    } catch (err) {
      console.error('Error fetching user cellars:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCellars()
  }, [])

  const handleDelete = async () => {
    if (!selectedCellar?.id) {
      alert('Please select a cellar before deleting.')
      return
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete cellar "${selectedCellar.name}"?`
    )
    if (!confirmed) return

    try {
      await deleteCellar(selectedCellar.id)
      const updatedCellars = await getMyCellars()
      setCellars(updatedCellars)
      setSelectedCellar(updatedCellars[0] || null)
    } catch (error) {
      console.error('Failed to delete cellar:', error)
      alert('An error occurred while deleting the cellar.')
    }
  }

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

    if (!selectedCellar) {
      return <div className="wine-cellar-container mt-5" />
    }

    const shelfGroups = []
    for (let i = 0; i < selectedCellar.cellarWines.length; i += 14) {
      shelfGroups.push(selectedCellar.cellarWines.slice(i, i + 14))
    }

    return (
      <div className="wine-cellar-container mt-5">
        {shelfGroups.length > 0 ? (
          shelfGroups.map((bottles, shelfIndex) => (
            <div key={`shelf-${shelfIndex}`} className="wine-cellar-shelf">
              {renderBottlesOnShelf(
                bottles.map((bw) => ({
                  id: bw.cellarWineId,
                  name: bw.personalNotes || `Wine ID: ${bw.wineId}`,
                })),
                shelfIndex * 14
              )}
            </div>
          ))
        ) : (
          <div className="wine-cellar-shelf">{/* Empty shelf */}</div>
        )}
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
            className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 me-2"
            id="cellar-dropdown"
          >
            {cellars.length > 0 ? (
              cellars.map((cellar) => (
                <NavDropdown.Item
                  key={cellar.id}
                  active={selectedCellar?.id === cellar.id}
                  onClick={() => setSelectedCellar(cellar)}
                >
                  {cellar.name}
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item disabled>No cellars</NavDropdown.Item>
            )}
          </NavDropdown>

          <Button
            variant="link"
            className="p-0 m-0 text-decoration-underline small fs-6"
            style={{ color: 'darkred' }}
            onClick={() => setShowCreateModal(true)}
          >
            create new cellar
          </Button>
        </div>

        {/* INFO BOX */}
        {selectedCellar && (
          <div className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 shadow-sm">
            <p className="mb-1 text-darkred fw-semibold fs-6">Name:</p>
            <p className="mb-2 text-black fs-6">{selectedCellar.name}</p>

            {selectedCellar.description && (
              <>
                <p className="mb-1 text-darkred fw-semibold fs-6">
                  Description:
                </p>
                <p className="mb-2 text-black fs-6">
                  {selectedCellar.description}
                </p>
              </>
            )}

            <p className="mb-1 text-darkred fw-semibold fs-6">
              Number of wines:
            </p>
            <p className="mb-2 text-black fs-6">
              {selectedCellar.cellarWines.length}
            </p>

            <p className="mb-1 text-darkred fw-semibold fs-6">Wine list:</p>
            {selectedCellar.cellarWines.length > 0 ? (
              <ul className="list-unstyled mb-0">
                {selectedCellar.cellarWines.map((w) => (
                  <li key={w.cellarWineId}>
                    <a
                      href="#"
                      className="text-decoration-none fs-6"
                      style={{ color: 'darkred', cursor: 'pointer' }}
                    >
                      {w.personalNotes || `Wine ID: ${w.wineId}`}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="text-black fs-6 mb-1">
                  Your wine cellar is empty
                </p>
                <p className="mb-0">
                  <a
                    href="#"
                    className="text-decoration-none fs-6"
                    style={{ color: 'darkred', cursor: 'pointer' }}
                    onClick={() => {
                      console.log('Add wine clicked')
                    }}
                  >
                    Add some bottles
                  </a>
                </p>
              </>
            )}

            <hr />
            <div className="d-flex justify-content-between mt-2">
              <Button
                variant="dark"
                size="sm"
                disabled={!selectedCellar}
                onClick={handleDelete}
              >
                Delete cellar
              </Button>

              <Button
                size="sm"
                style={{ backgroundColor: 'darkred', border: 'none' }}
                onClick={() => setShowUpdateModal(true)}
              >
                Edit cellar
              </Button>
            </div>
          </div>
        )}
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

      {/* MODALI */}
      <CreateCellarModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        onCreated={async (newCellar) => {
          await fetchCellars()
          const updated = await getMyCellars()
          const created = updated.find((c) => c.id === newCellar.id)
          if (created) setSelectedCellar(created)
        }}
      />

      {selectedCellar && (
        <UpdateCellarModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          initialData={{
            cellarId: selectedCellar.id,
            name: selectedCellar.name,
            description: selectedCellar.description,
          }}
          onUpdated={async (updatedCellar) => {
            await fetchCellars()
            const freshList = await getMyCellars()
            const refreshed = freshList.find((c) => c.id === updatedCellar.id)
            if (refreshed) setSelectedCellar(refreshed)
            setShowUpdateModal(false)
          }}
        />
      )}
    </>
  )
}

export default UserCellars
