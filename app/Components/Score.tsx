import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}

export const Score: React.FC<Props> = ({ score, setScore }: Props) => {
  return (
    <>
      <span className="text-white">Score {score} </span>
    </>
  );
};
