import Link from "next/link";
import classes from "./button.module.css";
import { PropsWithChildren } from "react";

interface Iprops {
  link?: string;
  onClick?: () => void;
}

const Button:React.FC<PropsWithChildren<Iprops>> = (props) => {
  if (props.link) {
    return <Link className={classes.btn} href={props.link}> {props.children} </Link>
  }
  return (
    <button onClick={props.onClick}> {props.children} </button>
  )
}

export default Button;