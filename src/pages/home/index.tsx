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

    background: red;
  }
`;


const InnerElements = ({ zIndex }: { zIndex: number }) =>
{
  return <div style={{ zIndex }} className={`section section_${zIndex}`}>
    
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
    const t = ((scrollHeight - clientHeight) * 0.5) / [...boxs].length;
    const boxsInstence = [...boxs].map((_box, i) =>
    {

      return { target: _box, scrollYPosition: (i * t) - (-180) }

    })

    const onScrollHandler = () =>
    {
      
      const scrollY = window.scrollY;
      for (let i = 0; i < boxsInstence.length; i++)
      {
        
        const _box = boxsInstence[i];
        let tl = Math.ceil(Math.max(-180, Math.min(((scrollY - _box.scrollYPosition) * 0.07), 200))) //*
        let bb = Math.ceil(Math.max(0, Math.min(((scrollY - _box.scrollYPosition) * 0.025), 100))) //*
        if (tl === 200 && bb === 100) continue
        _box.target.style.clipPath = `
          polygon(${tl}% 0%, 100% 0%, 100% 100%, ${bb}% 100%)
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
      {[1, 2, 3, 4, 5, 6].map(_zIndex =>
      {
        return <InnerElements zIndex={_zIndex} />
      })}
    </div>
  </Wrapper>

}

export default HomePage;