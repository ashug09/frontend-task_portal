import Cryptr from 'cryptr';
import { useRouter } from 'next/router'
import React from 'react'

export default function PaymentGateway() {
    const router = useRouter()
    const { amt } = router.query
    const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYPTR);
    const amt1 = cryptr.decrypt(amt)
  return (
    <div>PaymentGateway {amt1}</div>
  )
}
