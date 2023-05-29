import { PropsWithChildren } from "react";
import MainHeader from "./main-header";

const Layout:React.FC<PropsWithChildren> = (props) => {
  return (
    <>
      <MainHeader />
      <main>
        {props.children}
      </main>
    </>
  )
}

export default Layout;