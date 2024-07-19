import { useSignMessage } from "wagmi";
import React from "react"
import {recoverMessageAddress} from "viem";

export function EnterContest() {
    const recoveredAddress = React.useRef<string>()
    const { data: signMessageData, error, isPending, signMessage, variables } = useSignMessage()
   
    React.useEffect(() => {
      ;(async () => {
        if (variables?.message && signMessageData) {
          const recoveredAddress = await recoverMessageAddress({
            message: variables?.message,
            signature: signMessageData,
          })
          console.log(signMessageData)
          // setRecoveredAddress(recoveredAddress)
        }
      })()
    }, [signMessageData, variables?.message])
   
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault()
          //@ts-ignore
          const formData = new FormData(event.target)
          const message = formData.get('message')
          //@ts-ignore
          signMessage({ message })
        }}
      >
        <label htmlFor="message">Enter a message to sign</label>
        <textarea
          id="message"
          name="message"
          placeholder="The quick brown fox…"
        />
        <button disabled={isPending}>
          {isPending ? 'Check Wallet' : 'Sign Message'}
        </button>
   
        {signMessageData && (
          <div>
            <div>Recovered Address: {recoveredAddress.current}</div>
            <div>Signature: {signMessageData}</div>
          </div>
        )}
   
        {error && <div>{error.message}</div>}
      </form>
    )
  }
