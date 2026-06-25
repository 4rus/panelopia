import WallVisualizer from './WallVisualizer'

export default function Page() {
  return (
    <div style={{
      height: '100vh',
      paddingTop: '88px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <WallVisualizer />
    </div>
  )
}