// import { ModalFooter } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import heartLight from '../../assets/heartLight.svg'
import heartDark from '../../assets/heartDark.svg'
import { useTheme } from '../../hooks/useTheme'

//styles
import styles from './Footer.module.css'

export default function Footer() {
  const { mode } = useTheme()
  const date = new Date().getFullYear()
  return (
    <Card
      className={`text-center fixed-bottom rounded-0 ${
        mode === 'light' ? styles['footer-light'] : styles['footer-dark']
      }`}
    >
      <Card.Footer className="text-muted">
        Made with{' '}
        <Card.Img
          className={`${styles.img} ${
            mode === 'dark' ? styles['img-dark'] : ''
          }`}
          src={mode === 'light' ? heartLight : heartDark}
          alt="Heart Icon"
        />{' '}
        by Elena Shatalova &copy; {date}
      </Card.Footer>
    </Card>
  )
}
