import { ReactElement } from "react"

const Overlay = ({children}: {children: ReactElement}) => {
  return (
    <div className="inset-0 flex justify-center items-center absolute">
      {children}
    </div>
  )
}

export default Overlay
