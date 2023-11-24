import { useMemo } from "react";

const Test = () => {
  const Package: object[] = [
    {val: "name1"}, 
    {val: "age1"}, 
    {val: "email1"}, 
    {val: "name2"}, 
    {val: "age2"}, 
    {val: "email2"}, 
    {val: "name3"}, 
    {val: "age3"}, 
    {val: "email3"},
    {val: "name4"},
    {val: "age4"},
    {val: "email4"},
  ];

  const dividedData = useMemo(() =>
  {
    if(Package)
    {
      let separator = 3;
      let divide =  Package.length / separator;
      
      let start = 0;
      let end = separator;
      
      let arr = [];
      const fakeData = [...Package];

      for (let i = 0; i < divide; i++) {
        arr.push(fakeData.slice(start, end))
        start = end;
        end = end + separator;
      }
      
      return arr;
    }
  }, [Package])
  console.log(dividedData)

  return (
    <div>Test</div>
  )
}

export default Test