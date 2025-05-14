import { useState, useEffect } from 'react'
import wine_cellar_barrels from '../assets/wine_cellar_barrels.png'
import { Button, NavDropdown } from 'react-bootstrap'
import { CellarDTO } from '../types/CellarDTO'
import { CellarWineDTO } from '../types/CellarWineDTO'
import { getMyCellars, deleteCellar } from '../services/cellarService'
import { getCellarWinesByCellarId } from '../services/cellarWineService'
import CreateCellarModal from '../components/CreateCellarModal'
import UpdateCellarModal from '../components/UpdateCellarModal'
import WinesSearchModal from '../components/WinesSearchModal'
import ProposalModal from '../components/ProposalModal'
import { PurchaseProposalDTO } from '../types/purchaseProposalDTO'
import axios from 'axios'

const UserCellars = () => {
  const [cellars, setCellars] = useState<CellarDTO[]>([])
  const [selectedCellar, setSelectedCellar] = useState<CellarDTO | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showWineSearchModal, setShowWineSearchModal] = useState(false)
  const [cellarWines, setCellarWines] = useState<CellarWineDTO[]>([])
  const [showProposalModal, setShowProposalModal] = useState(false)
  const [selectedProposal, setSelectedProposal] =
    useState<PurchaseProposalDTO | null>(null)

  const fetchCellars = async () => {
    try {
      const data = await getMyCellars()
      setCellars(data)
      setSelectedCellar((prev) => {
        if (prev) {
          const match = data.find((c) => c.id === prev.id)
          return match || data[0] || null
        } else {
          return data[0] || null
        }
      })
    } catch (err) {
      console.error('Error fetching user cellars:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCellars()
  }, [])

  useEffect(() => {
    const fetchWines = async () => {
      if (!selectedCellar?.id) return
      try {
        const wines = await getCellarWinesByCellarId(selectedCellar.id)
        setCellarWines(wines)
      } catch (err) {
        console.error('Error fetching cellar wines:', err)
      }
    }

    fetchWines()
  }, [selectedCellar?.id])

  const handleDelete = async () => {
    if (!selectedCellar?.id) return
    if (!window.confirm(`Delete cellar "${selectedCellar.name}"?`)) return

    try {
      await deleteCellar(selectedCellar.id)
      const updated = await getMyCellars()
      setCellars(updated)
      setSelectedCellar(updated[0] || null)
    } catch (error) {
      console.error('Failed to delete cellar:', error)
      alert('Error deleting the cellar.')
    }
  }

  const openProposalModal = async (cellarWineId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `http://localhost:3001/purchaseProposals/me/byCellarWine/${cellarWineId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const proposals = response.data
      if (proposals.length === 0) {
        alert('No proposals found for this wine.')
        return
      }

      const proposal: PurchaseProposalDTO = {
        ...proposals[0],
        cellarWine: proposals[0].wine, // 🔁 Rinomina `wine` in `cellarWine` per compatibilità con ProposalModal
      }

      setSelectedProposal(proposal)
      setShowProposalModal(true)
    } catch (err) {
      console.error('Errore nel recupero della proposta:', err)
      alert('Could not load proposal.')
    }
  }

  const renderBottlesOnShelf = (
    bottles: { id: string; title: string; hasPendingProposal?: boolean }[],
    startIndex: number
  ) => {
    return bottles.map((bottle, index) => {
      const positionIndex = (startIndex + index) % 14
      return (
        <div
          key={bottle.id}
          className={`bottle bottle-pos-${positionIndex + 1} ${
            bottle.hasPendingProposal ? 'bottle-pending' : ''
          }`}
          title={bottle.title}
          onClick={() => {
            if (bottle.hasPendingProposal) openProposalModal(bottle.id)
          }}
          style={{ cursor: bottle.hasPendingProposal ? 'pointer' : 'default' }}
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

    if (!selectedCellar) return <div className="wine-cellar-container mt-5" />

    const shelfGroups = []
    for (let i = 0; i < cellarWines.length; i += 14) {
      shelfGroups.push(cellarWines.slice(i, i + 14))
    }

    return (
      <div className="wine-cellar-container mt-5">
        {shelfGroups.map((bottles, shelfIndex) => (
          <div key={`shelf-${shelfIndex}`} className="wine-cellar-shelf">
            {renderBottlesOnShelf(
              bottles.map((bw) => ({
                id: bw.id,
                title: `${bw.wineName} – ${bw.wineProducer} (${bw.wineVintage}) x${bw.quantity}`,
                hasPendingProposal: bw.hasPendingProposal,
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
            title={selectedCellar?.name || 'Select a cellar'}
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

        {selectedCellar && (
          <div className="border rounded px-3 py-2 bg-white border-secondary border-opacity-50 shadow-sm info-box">
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
            <p className="mb-2 text-black fs-6">{cellarWines.length}</p>

            <p className="mb-1 text-darkred fw-semibold fs-6">Wine list:</p>
            <ul className="list-unstyled mb-0">
              {cellarWines.map((w) => (
                <li
                  key={w.id}
                  className={`mb-1 ${
                    w.hasPendingProposal ? 'text-danger fw-semibold' : ''
                  }`}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      lineHeight: '1.1',
                      cursor: w.hasPendingProposal ? 'pointer' : 'default',
                      textDecoration: w.hasPendingProposal
                        ? 'underline'
                        : 'none',
                    }}
                    onClick={() => {
                      if (w.hasPendingProposal) openProposalModal(w.id)
                    }}
                  >
                    {w.wineName} – {w.wineProducer} ({w.wineVintage}) ×
                    {w.quantity}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-2 mb-0">
              <a
                href="#"
                className="text-decoration-none fs-6"
                style={{ color: 'darkred', cursor: 'pointer' }}
                onClick={() => setShowWineSearchModal(true)}
              >
                <span style={{ color: 'black', fontSize: '1.2rem' }}>➕</span>{' '}
                Add more bottles
              </a>
            </p>

            <hr />
            <div className="d-flex justify-content-between mt-2">
              <Button variant="dark" size="sm" onClick={handleDelete}>
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

      {/* MODALS */}
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

      {selectedCellar && (
        <WinesSearchModal
          show={showWineSearchModal}
          onHide={() => setShowWineSearchModal(false)}
          cellarId={selectedCellar.id}
          onBottleAdded={async () => {
            const updatedWines = await getCellarWinesByCellarId(
              selectedCellar.id
            )
            setCellarWines(updatedWines)
          }}
        />
      )}

      {selectedProposal && selectedProposal.cellarWine && (
        <ProposalModal
          show={showProposalModal}
          handleClose={() => setShowProposalModal(false)}
          wine={selectedProposal.cellarWine}
          proposal={selectedProposal}
          onStatusChange={(newStatus) => {
            setCellarWines((prev) =>
              prev.map((w) =>
                w.id === selectedProposal.cellarWine.id
                  ? { ...w, hasPendingProposal: false }
                  : w
              )
            )
          }}
        />
      )}
    </>
  )
}

export default UserCellars
