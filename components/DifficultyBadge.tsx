interface Props {
  difficulty: string;
}

export default function DifficultyBadge({ difficulty }: Props) {
  let className = "";

  switch (difficulty.toLowerCase()) {
    case "easy":
      className = "badge-difficulty-easy";
      break;
    case "moderate":
      className = "badge-difficulty-moderate";
      break;
    case "hard":
    case "moderate to hard":
      className = "badge-difficulty-hard";
      break;
    default:
      className = "badge-difficulty-moderate";
  }

  return <span className={className}>{difficulty}</span>;
}
