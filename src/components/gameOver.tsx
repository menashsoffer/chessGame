import { useSpring, animated } from "react-spring";
import Confetti from "./confetti";

interface Props {
  winner: string | null;
}

const GameOver = ({ winner }: Props) => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
  const slideIn = useSpring({
    transform: "translateY(0)",
    from: { transform: "translateY(-50px)" },
    delay: 500,
  });
  const scaleUp = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0.5)" },
    delay: 500,
  });

  return (
    <>
      <Confetti />
      <animated.div style={fadeIn} className="game-over">
        <animated.p style={scaleUp} className="winner-text">
          Game Over
        </animated.p>
        <animated.div style={slideIn}>
          <animated.p style={slideIn}>Winner:</animated.p>
          <animated.h1 style={slideIn} className="winner-text-h1">
            {winner}
          </animated.h1>
        </animated.div>
        <p>Press Enter to restart</p>
      </animated.div>
    </>
  );
};

export default GameOver;
