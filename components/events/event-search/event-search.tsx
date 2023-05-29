import {useRef} from 'react';

import { PropsWithChildren } from "react";
import Button from '@/components/ui/button';
import classes from './event-search.module.css';

interface Iprops {
  onSearch: (selectedYear: string, selecteMonth: string) => void
}

const EventSearch:React.FC<PropsWithChildren<Iprops>> = (props) => {

  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current!.value;
    const selectedMonth = monthInputRef.current!.value;
    props.onSearch(selectedYear, selectedMonth);
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year"> Year </label>
          <select ref={yearInputRef} id="year">
            <option value="2021" > 2021 </option>
            <option value="2022" > 2022 </option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="Month"> Month </label>
          <select ref={monthInputRef} id="Month">
            <option value="1"> January </option>
            <option value="2"> February </option>
            <option value="3"> March </option>
            <option value="4"> April </option>
            <option value="5"> May </option>
            <option value="6"> June </option>
            <option value="7"> July </option>
            <option value="8"> August </option>
            <option value="9"> September  </option>
            <option value="10"> October </option>
            <option value="11"> November </option>
            <option value="12"> December </option>

          </select>
        </div>
      </div>
      <Button> Find Events </Button>
    </form>
  )
}

export default EventSearch;