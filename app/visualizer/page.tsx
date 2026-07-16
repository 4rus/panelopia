import WallVisualizer from './WallVisualizer'

export default function Page() {
  return (
    <div style={{
      height: '100dvh',
      minHeight: '100vh',
      paddingTop: '95px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <WallVisualizer />
    </div>
  )
}