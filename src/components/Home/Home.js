import styled from "styled-components";
import ImageSlider from '../Image slider/ImageSlider'
import db from '../../Firebase/Firebase'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMovies } from '../../features/movie/movieSlice'
import { selectUserName } from "../../features/User/userSlice";
import Viewers from '../Viewers/Viewers'
import Recommends from "../Movies Page/Recommends";
import NewDisneys from "../Movies Page/NewDisneys";
import Originals from "../Movies Page/Originals";
import Trending from "../Movies Page/Trending";

function Home() {

  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    
    db.collection("movies").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
            default :
            console.log("Not found");
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recommends />
      <NewDisneys />
      <Originals />
      <Trending />
    </Container>
  )
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("Assets/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home

