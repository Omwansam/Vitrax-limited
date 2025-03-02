import Body from './Body'
import './Home.css'
import Navbar from './Navbar'

const Home = () => {
  return (
  <>
    <div className="home-container">
      <div className='nav-location'>
        <Navbar/>
        </div>
        <Body/>
        
    </div>
</>
  )
}

export default Home