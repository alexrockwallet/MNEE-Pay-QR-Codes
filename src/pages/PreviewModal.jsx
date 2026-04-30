import { X, Download } from 'lucide-react'

export default function PreviewModal({ token, onClose }) {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = `/qr-${token.toLowerCase()}.pdf`
    a.download = `Multiple QR codes for ${token}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 468, background: '#fff',
          borderRadius: 12, padding: 24,
          display: 'flex', flexDirection: 'column', gap: 24,
          boxShadow: '0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 28 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>Preview</span>
          <button
            onClick={onClose}
            style={{
              width: 28, height: 28, border: 'none', background: 'transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0a0a0a', padding: 0, borderRadius: 4,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Sheet image */}
        <img
          src={`/qr-${token.toLowerCase()}.png`}
          alt={`QR codes for ${token}`}
          style={{ width: 420, height: 595, display: 'block', objectFit: 'contain' }}
        />

        {/* Download button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleDownload}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              width: 104, height: 28, justifyContent: 'center',
              background: '#fff', border: '1px solid #e4e4e4',
              borderRadius: 6, fontSize: 12, fontWeight: 500,
              color: '#0a0a0a', cursor: 'pointer',
            }}
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
