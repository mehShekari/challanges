import { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 11000px;
  
  .box
  {
    width: 850px;
    height: 350px;
    border: 1px solid royalblue;
    margin: 100px auto;

    position: fixed;
    left: 50%;
    translate: -50% 0%;
  }

  .section
  {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .header
    {
      text-align: center;
      width: 100%;
      padding: 20px 0px;
    }

    .body
    {
      width: max-content;
      margin: 0 auto;
      padding: 10px;
    }
  }

  .section_1
  {
    .header > h2
    {
      
    }

    .body
    {
      padding: 10px;
      background-color: rgba(0,0,0,0.2);
      border-radius: 20px;
    }
  }
  .section_2
  {
    .header > h2
    {
      
    }

    .body
    {
      padding: 10px;
      background-color: rgba(0,0,0,0.2);

    }
  }
  .section_3
  {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    .header > h2
    {
      
    }

    .body
    {
      padding: 10px;
      background-color: rgba(0,0,0,0.2);
      border-radius: 20px;
    }
  }
  .section_4
  {
    .header > h2
    {
      
    }

    .body
    {
      padding: 10px;
      background-color: rgba(0,0,0,0.2);
      border-radius: 20px;
    }
  }
  .section_5
  {
    .header > h2
    {
      
    }

    .body
    {
      padding: 10px;
      background-color: rgba(0,0,0,0.2);
      border-radius: 20px;
    }
  }
  .section_6
  {
    .header > h2
    {
      color: #333;
    }

    .body
    {
      padding: 10px;
      color: #121212;
      background-color: rgba(0,0,0,0.2);
      border-radius: 20px;
    }
  }
`;

const COLORS = ["#fb8500", "#2a9d8f", "#00b4d8", "#9a8c98", "#a53860", "#efcefa"];
const data = [1, 2, 3, 4, 5, 6];

const InnerElements = ({ zIndex, total }: { zIndex: number, total: number }) =>
{
  let z =  total - zIndex;
  return <div style={{ zIndex: z, backgroundColor: COLORS[zIndex - 1] }} className={`section section_${zIndex}`}>
    <div className="header">
      <h2>This is title</h2>
    </div>

    <div className="body">
      this is body but not reqular body you liitle rant !
    </div>
  </div>
  
}

//* found polygon relation between cordinates 
// window.scrollY * 0.07;
// window.scrollY * 0.025;
// `polygon(${x += window.scrollY * 0.7}% 0%, 100% 0%, 100% 100%, ${y += window.scrollY * 0.25}% 100%)`

const HomePage = () =>
{
  const wrapperRef = useRef<HTMLDivElement>(null)
  const boxParentRef = useRef<HTMLDivElement>(null)

  useEffect(() =>
  {

    const { scrollHeight, clientHeight } = document.documentElement
    const boxs = boxParentRef.current!.querySelectorAll(".section") as NodeListOf<HTMLDialogElement>;
    const boxPosition = ((scrollHeight - clientHeight) * 0.5) / [...boxs].length;
    const boxsInstence = [...boxs].map((_box, _index) =>
    {

      return { target: _box, scrollYPosition: (_index * boxPosition) - (-180) }

    })

    const onScrollHandler = () =>
    {
      
      const scrollY = window.scrollY;
      for (let i = 0; i < boxsInstence.length; i++)
      {
        
        const _box = boxsInstence[i];
        let x1 = Math.ceil(Math.max(-180, Math.min(((scrollY - _box.scrollYPosition) * 0.07), 200))) //*
        let x4 = Math.ceil(Math.max(0, Math.min(((scrollY - _box.scrollYPosition) * 0.025), 100))) //*
        if (x1 === 202 && x4 === 100) continue
        _box.target.style.clipPath = `
          polygon(${x1}% 0%, 100% 0%, 100% 100%, ${x4}% 100%)
        `;

      }
      
    }

    window.addEventListener("scroll", onScrollHandler);

    return () =>
    {

      window.removeEventListener("scroll", onScrollHandler);

    }
  })

  return <Wrapper ref={wrapperRef}>
    <div className="box" ref={boxParentRef}>
      {data.map(_zIndex =>
      {
        return <InnerElements zIndex={_zIndex} key={_zIndex} total={data.length} />
      })}
    </div>
  </Wrapper>

}

export default HomePage;