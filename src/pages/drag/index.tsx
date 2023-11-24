import { useCallback, useEffect, useRef } from 'react'
import styled from "styled-components";

const fieldPadding = 5;

const Container = styled.div`
  display: grid;
  place-items: center;

  .dragged
  {
    cursor: grabbing !important;
  }  
  ::selection{
    background-color: transparent;
  }

  .nav
  {
    height: 70px;
    width: 100%;
    background: royalblue;
    margin-bottom: 30px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  .field
  {
    min-width: ${200 + fieldPadding * 2}px;
    display: flex;
    padding: ${fieldPadding}px;
    flex-direction: column;
    height: 100%;
    border: 1px solid gray;
    border-radius: 10px;
    z-index: 5;
    gap: 15px;

    .box
    {
      width: 200px;
      height:70px;
      border-radius: 10px;
      background: royalblue;
      transform-origin: bottom right;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const DragPage = () => {
  const isScrubbing = useRef(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const draggedElement = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLElement | null>(document.body);
  const render = useRef<boolean>(false);
  const pl = useRef<number>(0);
  let pt = useRef<number>(0);
  
  const handleMouseMove = useCallback((_evt: MouseEvent) =>
  {
    _evt.preventDefault();
    isScrubbing.current = (_evt.buttons & 1) == 1;
    const target =  _evt.target as HTMLElement;
    
    // in this part we are simulating mouseEnter and mouse in mouseMove
    if(isScrubbing.current)
    {
      //  mouse enter
      if(target?.matches(".box"))
      {
        // to save pl and pt just for once in mosue enter
        if(!render.current)
        {
          draggedElement.current = target;
          draggedElement.current.style.opacity = "0.9";
          draggedElement.current.style.zIndex= "10";

          let rect = draggedElement.current?.getBoundingClientRect();
          if(bodyRef.current) bodyRef.current.style.cursor = "grabbing";


          pl.current = (_evt.clientX - rect.left) + fieldPadding;
          pt.current = _evt.clientY + fieldPadding;
        }
        render.current = true;
      }
    }
    else if(draggedElement.current && !isScrubbing.current)
    {
      //  mouse leave
      if(bodyRef.current) bodyRef.current.style.cursor = "auto";
      draggedElement.current.style.transform = `rotate(0deg)`;
      draggedElement.current.style.opacity = "1";
      draggedElement.current.style.zIndex= "auto";

      draggedElement.current = null;
      render.current = false;
    }

    // its means we dragged the element here
    if(draggedElement.current && isScrubbing.current)
    {
      draggedElement.current.style.transform = `
        translate(${_evt.clientX - pl.current}px, ${(_evt.clientY - pt.current)}px) rotate(5deg)
      `;
    }
  }, []);
  
  useEffect(() =>
  {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [])


  return <Container>
    <nav className="nav">
      this is my first nav
    </nav>
    <Wrapper ref={wrapperRef}>
      <div className="field" >
        <div style={{paddingLeft:"10px"}}>
          ToDo
        </div>

        <div className="box">
          1
        </div>
        <div className="box">
          2
        </div>
        <div className="box">
          3
        </div>
        <div className="box">
          4
        </div>

      </div>

      <div className="field">
        select here
      </div>

      <div className="field">
        select here
      </div>

      <div className="field">
        select here
      </div>
    </Wrapper>
  </Container>
}

export default DragPage