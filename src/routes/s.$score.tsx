import { createFileRoute, Link } from "@tanstack/react-router";
import { getRank } from "@/lib/quiz-data";
import { cardPath, cardUrl, clampScore, TOTAL_QUESTIONS } from "@/lib/share";

export const Route = createFileRoute("/s/$score")({
  head: ({ params }) => {
    const score = clampScore(params.score);
    const rank = getRank(score, TOTAL_QUESTIONS);
    const title = `${score}/${TOTAL_QUESTIONS} — ${rank.title} · Maze of Gains Quiz`;
    const description = `I scored ${score}/${TOTAL_QUESTIONS} on the Maze of Gains quiz and ranked ${rank.title}. Take the 15-question run and see how deep you get.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: cardUrl(score) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: cardUrl(score) },
      ],
    };
  },
  component: SharePage,
});

function SharePage() {
  const { score: raw } = Route.useParams();
  const score = clampScore(raw);
  const rank = getRank(score, TOTAL_QUESTIONS);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background px-5 py-14 font-body text-foreground antialiased">
      <span className="font-display text-lg tracking-tight sm:text-xl">
        MAZE<span className="text-volt"> OF </span>GAINS
      </span>

      <img
        src={cardPath(score)}
        alt={`Maze of Gains quiz score card: ${score} out of ${TOTAL_QUESTIONS}, rank ${rank.title}`}
        width={1200}
        height={630}
        className="w-full max-w-2xl rounded-[24px] border-4 border-black shadow-[0_10px_0_#000]"
      />

      <Link
        to="/"
        className="pulse-glow rounded-2xl border-2 border-black bg-volt px-10 py-4 font-display text-xl text-dungeon transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
      >
        Take the quiz ↓
      </Link>
    </div>
  );
}
