import { useState, useEffect } from 'react'
import wine_cellar_barrels from '../assets/wine_cellar_barrels.png'

interface WineBottle {
  id: string
  name: string
  year?: number
  type?: string
  region?: string
}

interface CellarWine {
  id: string
  name: string
}

interface Cellar {
  id: string
  name: string
  description: string
  cellarWines: CellarWine[]
}

const UserCellars = () => {
  const [wineBottles, setWineBottles] = useState<WineBottle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cellars, setCellars] = useState<Cellar[]>([])
  const [selectedCellar, setSelectedCellar] = useState<Cellar | null>(null)

  useEffect(() => {
    // Bottiglie mock
    const fetchUserWines = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const mockBottles: WineBottle[] = []
        for (let i = 1; i <= 33; i++) {
          mockBottles.push({
            id: `bottle-${i}`,
            name: `Wine ${i}`,
            year: 2010 + (i % 10),
            type: i % 3 === 0 ? 'Red' : i % 3 === 1 ? 'White' : 'Rosé',
            region: ['Tuscany', 'Piedmont', 'Veneto'][i % 3],
          })
        }
        setWineBottles(mockBottles)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching wine data:', error)
        setIsLoading(false)
      }
    }

    // Cantine mock
    const mockCellars: Cellar[] = [
      {
        id: '1',
        name: 'Main Cellar',
        description: 'Main collection of reds and aged wines.',
        cellarWines: [
          { id: 'w1', name: 'Barolo 2016' },
          { id: 'w2', name: 'Brunello 2015' },
        ],
      },
      {
        id: '2',
        name: 'Summer Wines',
        description: 'Fresher whites for warmer seasons.',
        cellarWines: [{ id: 'w3', name: 'Verdicchio 2022' }],
      },
    ]

    setCellars(mockCellars)
    setSelectedCellar(mockCellars[0])
    fetchUserWines()
  }, [])

  const renderBottlesOnShelf = (bottles: WineBottle[], startIndex: number) => {
    return bottles.map((bottle, index) => {
      const positionIndex = (startIndex + index) % 14
      return (
        <div
          key={bottle.id}
          className={`bottle bottle-pos-${positionIndex + 1}`}
          title={`${bottle.name}\nYear: ${bottle.year}\nType: ${bottle.type}\nRegion: ${bottle.region}`}
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

    if (wineBottles.length === 0) {
      return (
        <div className="text-center py-5">
          Your wine cellar is empty. Add some bottles!
        </div>
      )
    }

    const shelfGroups = []
    for (let i = 0; i < wineBottles.length; i += 14) {
      shelfGroups.push(wineBottles.slice(i, i + 14))
    }

    return (
      <div className="wine-cellar-container mt-5">
        {shelfGroups.map((bottles, shelfIndex) => (
          <div key={`shelf-${shelfIndex}`} className="wine-cellar-shelf">
            {renderBottlesOnShelf(bottles, shelfIndex * 14)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* OVERLAY SINISTRO */}
      <div className="user-cellars-left-overlay">
        <h4 className="text-darkred">Andrea's Cellars</h4>
        <div className="d-flex align-items-center mb-2">
          <select
            className="form-select me-2"
            value={selectedCellar?.id}
            onChange={(e) =>
              setSelectedCellar(
                cellars.find((c) => c.id === e.target.value) || null
              )
            }
          >
            {cellars.map((cellar) => (
              <option key={cellar.id} value={cellar.id}>
                {cellar.name}
              </option>
            ))}
          </select>
          <a href="#" className="text-decoration-underline small">
            Create new cellar
          </a>
        </div>

        {selectedCellar && (
          <div className="cellar-details-box bg-white p-3 rounded shadow-sm">
            <h5 className="mb-1">{selectedCellar.name}</h5>
            <p className="text-muted">{selectedCellar.description}</p>
            <hr />
            <ul className="list-unstyled">
              {selectedCellar.cellarWines.map((w) => (
                <li key={w.id}>
                  <a href="#" className="text-decoration-none">
                    {w.name}
                  </a>
                </li>
              ))}
            </ul>
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
    </>
  )
}

export default UserCellars
