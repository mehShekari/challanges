import { useEffect, useMemo, useRef } from "react";
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

    .section
    {
      width: 100%;
      height: 100%;
      clip-path: polygon(-180% 0%, 100% 0%, 100% 100%, 0% 100%);

      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .section-1
    {
      background-color: darkgoldenrod;
      z-index: 10;
    }
    .section-2
    {
      background-color: greenyellow;
      color: #333;
      h2
      {
        background-color: rgba(1, 1,1 ,0.1);
        padding: 5px;
      }
      z-index: 9;
    }
    .section-3
    {
      background-color: royalblue;
      z-index: 8;
    }
    .section-4
    {
      background-color: crimson;
      z-index: 7;
    }
    .section-5
    {
      background-color: darkgrey;
      z-index: 6;
    }
    
  }
`;

const customStyles =
{ 
  width: "100%", 
  height: "100%", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center"
}

//* found polygon relation between cordinates 
// window.scrollY * 0.7;
// window.scrollY * 0.25;
// `polygon(${x += window.scrollY * 0.7}% 0%, 100% 0%, 100% 100%, ${y += window.scrollY * 0.25}% 100%)`

const HomePage = () =>
{
  const boxRef = useRef<HTMLDivElement | null>(null),
    wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() =>
  {
    const sections = document.querySelectorAll<HTMLDivElement>(".section"),
      target = 100,
      treshold = 3,
      sectionsLength = sections.length;

    const onScroll = () =>
    {     
      let { 
        scrollTop, 
        scrollHeight 
      } = document.documentElement;
      let scrollY = scrollTop / ( scrollHeight - window.innerHeight) * sectionsLength;
      
      /**
        style.clipPath = `
          polygon(${px}% 0%, 100% 0%, 100% 100%, ${py}% 100%)
        `; 
      */
     
      

      //* pt-5
      let arr = [];
      for (let n = 0; n < Math.ceil(sectionsLength / treshold); n++)
      {
        let x = ((n + 1) + n) - 1;
        let x2 = ((n + 2) + n) - 1;
        let x3 = ((n + 3) + n) - 1;
        arr.push([
          {
            el: sections[x],
            startX: -180,
            startY: 0,
          },
          {
            el: sections[x2],
            startX: -180,
            startY: 0,
          },
          {
            el: sections[x3],
            startX: -180,
            startY: 0,
          }
        ]);
      }
      arr.forEach((_secArr, _index) =>
      {
        if(Math.ceil(scrollY / treshold) - 1 >= _index)
        {
          _secArr.forEach((_sec, _i) =>
          {
            // let scrollTY = scrollY / ((i + 1)  * .0073);
            let px = Math.ceil(Math.max(-180, Math.min(_sec.startX += (scrollY * 100), target)));
            let py = Math.ceil(Math.max(0, Math.min(_sec.startY += scrollY * 100 * 0.36, target)));

            _sec.el.style.clipPath = `
              polygon(${px}% 0%, 100% 0%, 100% 100%, ${py}% 100%)
            `;
          })
        }
      })
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  
  return <Wrapper ref={wrapperRef}>
    <div className="box" ref={boxRef}>
      <div className="section section-1">
        <h2 >HELLO MY FREIND</h2>
      </div>
      
      <div className="section section-2">
        <h2 className="custom-header">HELLO MY FREIND</h2>
      </div>

      <div className="section section-3">
        <h2 className="custom-header--2">HELLO MY FREIND</h2>
      </div>

      <div className="section section-4">
        <h2 className="custom-header--2">HELLO MY FREIND</h2>
      </div>

      <div className="section section-5">
        <h2 className="custom-header--2">HELLO MY FREIND</h2>
      </div>

      <div className="section">
        <h2 style={customStyles}>HELLO MY FREIND</h2> 
      </div>
    </div>
  </Wrapper>
}

export default HomePage;

/**
 *
   sections[x].style.clipPath = `
     polygon(${px}% 0%, 100% 0%, 100% 100%, ${py}% 100%)
   `;
   sections[x2].style.clipPath = `
     polygon(${px}% 0%, 100% 0%, 100% 100%, ${py}% 100%)
   `;
   sections[x3].style.clipPath = `
     polygon(${px}% 0%, 100% 0%, 100% 100%, ${py}% 100%)
   `;
 */