import { Box } from "@chakra-ui/react"
import React from "react"
import AppLayout from "../../../components/AppLayout"
import Link from 'next/link'

const Games = () => {
  return (
    <AppLayout  showSidebar={true} title="NFT Collection | MintMe">

      <div
  className="btn"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "18rem",
    height: "5rem",
    margin: "3rem auto",
    backgroundSize: "300% 300%",
    backdropFilter: "blur(1rem)",
    borderRadius: "5rem",
    transition: "0.5s",
    animation: "gradient_301 5s ease infinite",
    border: "double 4px transparent",
    backgroundImage:
      "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box"
  }}
>
  <strong
    style={{
      zIndex: 2,
      fontFamily: '"Inter"',
      fontSize: 16,
      letterSpacing: 5,
      color: "#FFFFFF",
      textShadow: "0 0 4px white"
    }}
  >
    CHOOSE WISELY
  </strong>
  <div
    id="container-stars"
    style={{
      position: "fixed",
      zIndex: -1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      transition: "0.5s",
      backdropFilter: "blur(1rem)",
      borderRadius: "5rem"
    }}
  >
    <div
      id="stars"
      style={{
        position: "relative",
        background: "transparent",
        width: "200rem",
        height: "200rem"
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: "-10rem",
          left: "-100rem",
          width: "100%",
          height: "100%",
          animation: "animStarRotate 90s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px"
        }}
      />
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "170%",
          height: "500%",
          animation: "animStar 60s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px",
          opacity: "0.5"
        }}
      />
    </div>
  </div>
  <div
    id="glow"
    style={{ position: "absolute", display: "flex", width: "12rem" }}
  >
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(254, 83, 186, 0.636)"
      }}
    />
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(142, 81, 234, 0.704)"
      }}
    />
  </div>
      </div>
      <Box backgroundColor="black"  display="flex" flexWrap="wrap" mx={"auto"}
        my={4}  justifyContent="space-between">
    <Link href="/app/games/memorygame">
    <div
  className="btn"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "18rem",
    height: "20rem",
    backgroundSize: "300% 300%",
    backdropFilter: "blur(1rem)",
    borderRadius: "1rem",
    transition: "0.7s",
    cursor: "pointer",
    animation: "5s ease infinite",
    border: "double 4px transparent",
    backgroundImage:
      "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    // Add hover scale effect
    
     
  }}
>
  <strong
    style={{
      zIndex: 2,
      fontFamily: '"Inter"',
      fontSize: 35,
      marginLeft: 35,
      letterSpacing: 5,
      color: "#FFFFFF",
      textShadow: "0 0 4px white"
    }}
  >
   MEMORY GAME
  </strong>
  <div
    id="container-stars"
    style={{
      position: "fixed",
      zIndex: -1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      transition: "0.5s",
      backdropFilter: "blur(1rem)",
      borderRadius: "5rem"
    }}
  >
    <div
      id="stars"
      style={{
        position: "relative",
        background: "transparent",
        width: "200rem",
        height: "200rem"
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: "-10rem",
          left: "-100rem",
          width: "100%",
          height: "100%",
          animation: "animStarRotate 90s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px"
        }}
      />
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "170%",
          height: "500%",
          animation: "animStar 60s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px",
          opacity: "0.5"
        }}
      />
    </div>
  </div>
  <div
    id="glow"
    style={{ position: "absolute", display: "flex", width: "12rem" }}
  >
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(254, 83, 186, 0.636)"
      }}
    />
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(142, 81, 234, 0.704)"
      }}
    />
  </div>
      </div>
    </Link>

    <Link href="/app/games/snake">
    <div
  className="btn"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "18rem",
    height: "20rem",
    backgroundSize: "300% 300%",
    backdropFilter: "blur(1rem)",
    borderRadius: "1rem",
    transition: "0.7s",
    cursor: "pointer",
    animation: "gradient_301 5s ease infinite",
    border: "double 4px transparent",
    backgroundImage:
      "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box"
  }}
>
  <strong
    style={{
      zIndex: 2,
      fontFamily: '"Inter"',
      fontSize: 35,
      marginLeft: 35,
      letterSpacing: 5,
      color: "#FFFFFF",
      textShadow: "0 0 4px white"
    }}
  >
    SNAKE CATCHERS
  </strong>
  <div
    id="container-stars"
    style={{
      position: "fixed",
      zIndex: -1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      transition: "0.5s",
      backdropFilter: "blur(1rem)",
      borderRadius: "5rem"
    }}
  >
    <div
      id="stars"
      style={{
        position: "relative",
        background: "transparent",
        width: "200rem",
        height: "200rem"
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: "-10rem",
          left: "-100rem",
          width: "100%",
          height: "100%",
          animation: "animStarRotate 90s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px"
        }}
      />
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "170%",
          height: "500%",
          animation: "animStar 60s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px",
          opacity: "0.5"
        }}
      />
    </div>
  </div>
  <div
    id="glow"
    style={{ position: "absolute", display: "flex", width: "12rem" }}
  >
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(254, 83, 186, 0.636)"
      }}
    />
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(142, 81, 234, 0.704)"
      }}
    />
  </div>
      </div>
    </Link>
    
    <Link href="/app/games/tic">
    <div
  className="btn"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "18rem",
    height: "20rem",
    backgroundSize: "300% 300%",
    backdropFilter: "blur(1rem)",
    borderRadius: "1rem",
    transition: "0.7s",
    cursor: "pointer",
    animation: "gradient_301 5s ease infinite",
    border: "double 4px transparent",
    backgroundImage:
      "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box"
  }}
>
  <strong
    style={{
      zIndex: 2,
      fontFamily: '"Inter"',
      fontSize: 35,
      marginLeft: 35,
      letterSpacing: 5,
      color: "#FFFFFF",
      textShadow: "0 0 4px white"
    }}
  >
    SMASH BLASTERS
  </strong>
  <div
    id="container-stars"
    style={{
      position: "fixed",
      zIndex: -1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      transition: "0.5s",
      backdropFilter: "blur(1rem)",
      borderRadius: "5rem"
    }}
  >
    <div
      id="stars"
      style={{
        position: "relative",
        background: "transparent",
        width: "200rem",
        height: "200rem"
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: "-10rem",
          left: "-100rem",
          width: "100%",
          height: "100%",
          animation: "animStarRotate 90s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px"
        }}
      />
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "170%",
          height: "500%",
          animation: "animStar 60s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px",
          opacity: "0.5"
        }}
      />
    </div>
  </div>
  <div
    id="glow"
    style={{ position: "absolute", display: "flex", width: "12rem" }}
  >
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(254, 83, 186, 0.636)"
      }}
    />
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(142, 81, 234, 0.704)"
      }}
    />
  </div>
      </div>
    </Link>
  
    <Link href="/app/games/memorygame">
    <div
  className="btn"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "18rem",
    height: "20rem",
    backgroundSize: "300% 300%",
    backdropFilter: "blur(1rem)",
    borderRadius: "1rem",
    transition: "0.7s",
    cursor: "pointer",
    animation: "gradient_301 5s ease infinite",
    border: "double 4px transparent",
    backgroundImage:
      "linear-gradient(#212121, #212121),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box"
  }}
>
  <strong
    style={{
      zIndex: 2,
      fontFamily: '"Inter"',
      fontSize: 35,
      marginLeft: 35,
      letterSpacing: 5,
      color: "#FFFFFF",
      textShadow: "0 0 4px white"
    }}
  >
    SNAKE CATCHERS
  </strong>
  <div
    id="container-stars"
    style={{
      position: "fixed",
      zIndex: -1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      transition: "0.5s",
      backdropFilter: "blur(1rem)",
      borderRadius: "5rem"
    }}
  >
    <div
      id="stars"
      style={{
        position: "relative",
        background: "transparent",
        width: "200rem",
        height: "200rem"
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: "-10rem",
          left: "-100rem",
          width: "100%",
          height: "100%",
          animation: "animStarRotate 90s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px"
        }}
      />
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "170%",
          height: "500%",
          animation: "animStar 60s linear infinite",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1%)",
          backgroundSize: "50px 50px",
          opacity: "0.5"
        }}
      />
    </div>
  </div>
  <div
    id="glow"
    style={{ position: "absolute", display: "flex", width: "12rem" }}
  >
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(254, 83, 186, 0.636)"
      }}
    />
    <div
      className="circle"
      style={{
        width: "100%",
        height: 30,
        filter: "blur(2rem)",
        animation: "pulse_3011 4s infinite",
        zIndex: -1,
        background: "rgba(142, 81, 234, 0.704)"
      }}
    />
  </div>
      </div>
    </Link>
    </Box>
  </AppLayout>
  )
}

Games.requireAuth = true
export default Games
