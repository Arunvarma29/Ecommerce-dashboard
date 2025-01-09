import React from 'react'

function Footer() {
  return (
    <div className='footer' style={{ textAlign: 'center', padding: '1em 0', background: '#282c34', color: '#ffffff', bottom:'0px' }}> 
    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p> 
    <p> <a href='/privacy' style={{ color: '#61dafb', textDecoration: 'none' }}>Privacy Policy</a> | <a href='/terms' style={{ color: '#61dafb', textDecoration: 'none' }}> Terms of Service</a> </p> 
    </div>
  )
}

export default Footer
