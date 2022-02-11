import Footer from '../Footer';
import './styles.scss';

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      {children}
      <Footer />
    </div>
  )
}

export default Layout;