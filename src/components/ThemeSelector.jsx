import { useTheme } from '../hooks/useTheme'
import IconLight from '../assets/themeLight.svg'
import IconDark from '../assets/themeDark.svg'

//styles
import styles from './ThemeSelector.module.css'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function ThemeSelector() {
  const { changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'light' ? 'dark' : 'light')
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(mode)
  }

  const className = `${styles.tooltip} ${
    mode === 'light' ? '' : styles.darkTooltip
  }`

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip role="tooltip" className={className}>
          <span>Switch to {mode === 'light' ? ' dark ' : 'light'} theme</span>
        </Tooltip>
      }
    >
      <Button variant="outline-success" size="md">
        <Image
          className={`${styles['mode-img']}`}
          onClick={toggleMode}
          src={mode === 'light' ? IconLight : IconDark}
          alt="light/dark toggle icon"
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
      </Button>
    </OverlayTrigger>
  )
}
