import React from 'react'

function ReferralList({
  setAmount, setBonuses
} : {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setBonuses: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div>ReferralList</div>
  )
}

export default ReferralList