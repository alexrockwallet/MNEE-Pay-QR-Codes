import { useState } from 'react'
import { Eye, Download, Plus, Check, QrCode } from 'lucide-react'
import PreviewModal from './PreviewModal'

// Colored asset icons (42px, for individual network cards)
import ethIcon   from '../assets/icons/eth.svg'
import solIcon   from '../assets/icons/sol.svg'
import baseIcon  from '../assets/icons/base.svg'
import arbIcon   from '../assets/icons/arb.svg'
import maticIcon from '../assets/icons/matic.svg'
import bnbIcon   from '../assets/icons/bnb.svg'
import avaxIcon  from '../assets/icons/avax.svg'
import trxIcon   from '../assets/icons/trx.svg'
import usdcIcon  from '../assets/icons/usdc.svg'
import usdtIcon  from '../assets/icons/usdt.svg'

// Small B&W network icons (16px, for chips in stablecoin cards)
import netEth   from '../assets/icons/net-eth.svg'
import netSol   from '../assets/icons/net-sol.svg'
import netBase  from '../assets/icons/net-base.svg'
import netArb   from '../assets/icons/net-arb.svg'
import netMatic from '../assets/icons/net-matic.svg'
import netBnb   from '../assets/icons/net-bnb.svg'
import netAvax  from '../assets/icons/net-avax.svg'
import netTrx   from '../assets/icons/net-trx.svg'

const NETWORK_CHIP_ICONS = {
  Ethereum: netEth,
  Solana:   netSol,
  Base:     netBase,
  Arbitrum: netArb,
  Polygon:  netMatic,
  BNB:      netBnb,
  Avalanche:netAvax,
  Tron:     netTrx,
}

const USDC_NETWORKS = ['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Polygon', 'BNB', 'Avalanche']
const USDT_NETWORKS = ['Tron', 'Ethereum', 'BNB', 'Solana', 'Polygon', 'Arbitrum', 'Avalanche']

const NETWORKS = [
  { id: 'ethereum', name: 'Ethereum', icon: ethIcon,   tokens: ['USDT', 'USDC'] },
  { id: 'solana',   name: 'Solana',   icon: solIcon,   tokens: ['USDT', 'USDC'] },
  { id: 'base',     name: 'Base',     icon: baseIcon,  tokens: ['USDC'] },
  { id: 'arbitrum', name: 'Arbitrum', icon: arbIcon,   tokens: ['USDT', 'USDC'] },
  { id: 'polygon',  name: 'Polygon',  icon: maticIcon, tokens: ['USDT', 'USDC'] },
  { id: 'bnb',      name: 'BNB',      icon: bnbIcon,   tokens: ['USDT', 'USDC'] },
  { id: 'avalanche',name: 'Avalanche',icon: avaxIcon,  tokens: ['USDT', 'USDC'] },
  { id: 'tron',     name: 'TRON',     icon: trxIcon,   tokens: ['USDT'] },
]

const TOKEN_ICONS = { USDC: usdcIcon, USDT: usdtIcon }


function NetworkChip({ name }) {
  const icon = NETWORK_CHIP_ICONS[name]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-neutral-200 rounded-full text-[13px] font-medium text-[#0a0a0a] bg-white">
      {icon && <img src={icon} alt="" className="w-4 h-4" />}
      {name}
    </span>
  )
}

function PayWithPill({ token }) {
  const icon = TOKEN_ICONS[token]
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-white" style={{ border: '1px solid rgba(0,0,0,0.6)', fontFamily: "'DM Sans', sans-serif", padding: '4px 6px' }}>
      <img src={icon} alt={token} className="w-5 h-5" />
      <span className="flex flex-col leading-tight">
        <span className="text-[6px] text-neutral-400" style={{ fontWeight: 300 }}>Pay with</span>
        <span className="text-[10px] font-semibold text-[#0a0a0a]">{token}</span>
      </span>
    </span>
  )
}

function StablecoinCard({ token, networks, onPreview }) {
  const icon = TOKEN_ICONS[token]

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = `/qr-${token.toLowerCase()}.pdf`
    a.download = `Multiple QR codes for ${token}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex-1 bg-white border border-[#E4E4E4] rounded-lg p-5 flex flex-col gap-4">
      <div className="flex gap-3 flex-1">
        <div className="shrink-0">
          <img src={icon} alt={token} className="w-[42px] h-[42px]" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[18px] font-semibold text-[#0a0a0a] m-0">Get paid in {token}</p>
          <div className="flex flex-col gap-1.5">
            <p className="text-[14px] text-neutral-500 m-0">Available on:</p>
            <div className="flex flex-wrap gap-1.5">
              {networks.map(n => <NetworkChip key={n} name={n} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => onPreview(token)}
          className="flex items-center gap-1.5 px-3 py-2 bg-neutral-100 rounded-lg text-[12px] font-medium text-[#0a0a0a] hover:bg-neutral-200 transition-colors cursor-pointer"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          <Eye size={14} />
          Preview
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 rounded-lg text-[12px] font-medium text-[#0a0a0a] hover:bg-neutral-50 transition-colors cursor-pointer"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          <Download size={14} />
          Download
        </button>
      </div>
    </div>
  )
}

function NetworkCard({ network, selected, onToggle }) {
  const { name, icon, tokens } = network
  return (
    <div className="bg-white border border-[#E4E4E4] rounded-lg py-4 px-3 flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center gap-2">
        <img src={icon} alt={name} className="w-[42px] h-[42px]" />
        <p className="text-[12px] font-semibold text-[#0a0a0a] m-0">{name}</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {tokens.map(t => <PayWithPill key={t} token={t} />)}
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <button
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-100 rounded-lg text-[12px] font-medium text-[#0a0a0a] hover:bg-neutral-200 transition-colors cursor-pointer"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={onToggle}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] font-medium transition-colors cursor-pointer ${
            selected
              ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white'
              : 'bg-white border-neutral-200 text-[#0a0a0a] hover:bg-neutral-50'
          }`}
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
        >
          {selected ? <Check size={16} /> : <Plus size={16} />}
          {selected ? 'Selected' : 'Select'}
        </button>
      </div>
    </div>
  )
}

export default function GetPaid() {
  const [selected, setSelected] = useState(new Set())
  const [previewToken, setPreviewToken] = useState(null)

  const allSelected = selected.size === NETWORKS.length
  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(NETWORKS.map(n => n.id)))
  }
  const toggleNetwork = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectedCount = selected.size

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {previewToken && <PreviewModal token={previewToken} onClose={() => setPreviewToken(null)} />}
      {/* Header */}
        <div className="h-16 border-b border-neutral-200 flex items-center px-4 shrink-0">
          <div className="flex items-center gap-2 text-[14px]">
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <QrCode size={16} className="text-neutral-500" />
            </div>
            <div className="w-4 flex justify-center">
              <span className="w-px h-[17px] bg-neutral-300" />
            </div>
            <span className="text-[#0a0a0a]">Get paid</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto pb-20">
          <div className="px-6 py-6 flex flex-col gap-8 min-w-[900px]">
            {/* Page title */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[24px] font-semibold text-[#0a0a0a] m-0">Point-of-Sale QR Codes</h1>
              <p className="text-[16px] text-neutral-500 m-0">
                Print these QR codes and display them at your point of sale. Customers scan with their wallet app to pay instantly.
              </p>
            </div>

            {/* Section 1: Accept all networks */}
            <div className="flex flex-col gap-3">
              <h2 className="text-[20px] font-semibold text-[#0a0a0a] m-0">Accept all networks</h2>
              <div className="flex gap-4">
                <StablecoinCard token="USDC" networks={USDC_NETWORKS} onPreview={setPreviewToken} />
                <StablecoinCard token="USDT" networks={USDT_NETWORKS} onPreview={setPreviewToken} />
              </div>
            </div>

            {/* Section 2: Individual networks */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-[#0a0a0a] m-0">Or download individual networks</h2>
                <button
                  onClick={toggleAll}
                  className="flex items-center gap-1.5 text-[13px] text-[#0a0a0a] cursor-pointer"
                >
                  <span className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                    allSelected ? 'bg-[#0a0a0a] border-[#0a0a0a]' : 'bg-white border-neutral-300'
                  }`}>
                    {allSelected && <Check size={10} className="text-white" />}
                  </span>
                  Select all
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {NETWORKS.map(network => (
                  <NetworkCard
                    key={network.id}
                    network={network}
                    selected={selected.has(network.id)}
                    onToggle={() => toggleNetwork(network.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200">
          <div className="px-6 py-3 flex justify-end">
            <button
              disabled={selectedCount === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${
                selectedCount > 0
                  ? 'bg-[#D97706] text-white hover:bg-[#B45309] cursor-pointer'
                  : 'bg-[#cecece] text-neutral-500 cursor-not-allowed'
              }`}
            >
              <Download size={16} />
              Download selected items ({selectedCount})
            </button>
          </div>
        </div>
    </div>
  )
}
