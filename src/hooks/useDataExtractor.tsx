import { useEffect, useState } from "react";

export const useDataExtractor = (props: any) => {
  const { e } = props;
  const [data, setData] = useState(Array<any>);

  console.log(!!e && e.target.files[0]);

  useEffect(() => {}, []);
};
