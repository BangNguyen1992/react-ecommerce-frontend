import Link from 'next/link'
import useUser from '../lib/custom-hooks/useUser'
import NavStyles from './styles/NavStyles'

export default function Nav() {
  const user = useUser()

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {!user && <Link href="/signin">Signin</Link>}
    </NavStyles>
  )
}
