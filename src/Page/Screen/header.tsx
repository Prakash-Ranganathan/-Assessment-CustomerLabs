import './header.css'
interface headerNavProps {
  navTeaxt: string
}
function HeaderNav({navTeaxt}:headerNavProps) {
  
  return (
    <>
      <nav className="navbar" style={{ backgroundColor: '#0f80c1',color:'white' }}>
        
        
      
        <div className="container-fluid" style={{opacity:'0.6',color:'white'}}>
        <div className="">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg>
        <span className="mx-3">{navTeaxt}</span>
        </div>
        </div>
      </nav>
    </>
  )
}

export default HeaderNav;