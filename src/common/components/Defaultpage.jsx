import { Link } from 'react-router-dom'
export default function   Defaultpage (props) {
  return (
    <div style={{ textAlign: 'center', justifyContent: 'center' }}>
      <img
        src={
          'https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png'
        }
        width={100}
        height={100}
      />
      <h1>
        This page isn't available. Sorry about that. Try searching for something
        else.
      </h1>
      <Link to='/'>Go to the home page</Link>
    </div>
  )
}
