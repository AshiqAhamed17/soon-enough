import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "North Star",
  description: "Not a mission statement. Just the reasons underneath everything else on this site.",
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Why I work hard",
    body: [
      "Not for the title, and not for the number in an account. Work is the thing that buys back time — and time is the only currency that turns into flat whites in Kyoto, arguments-turned-laughter in Paris, sunrises over Table Mountain I haven't seen yet.",
      "Every long week is a deposit. This whole site is the receipt.",
    ],
  },
  {
    title: "Why I love travelling",
    body: [
      "Because a street I've never walked down still has the power to rearrange something in me. Because the version of myself that orders coffee in a language I'm still learning is a slightly braver one than the version at home.",
      "I don't travel to collect stamps. I travel because rooms I've never stood in have a way of telling me things about myself that familiar rooms stopped telling me years ago.",
    ],
  },
  {
    title: "Why I collect memories",
    body: [
      "Because possessions depreciate and memories don't. The right conversation, the right light through the right window, the right song playing while nothing in particular was happening — those compound.",
      "This site exists because I don't trust my future self to remember on his own. So I'm writing it down while it's still warm.",
    ],
  },
  {
    title: "Why freedom matters",
    body: [
      "Freedom is not the absence of a schedule. It's having enough runway that saying yes to a spontaneous trip, a long lunch, a detour, doesn't require a negotiation with fear.",
      "Everything I build is in service of that runway. Not luxury for its own sake — just enough distance from worry that curiosity gets to drive.",
    ],
  },
  {
    title: "Why curiosity matters",
    body: [
      "Curiosity is the opposite of a life on autopilot. It's what makes me take the longer route, ask the extra question, walk into the café with no name I can pronounce.",
      "The moment I stop being curious is the moment this whole project stops making sense. So I keep feeding it, on purpose.",
    ],
  },
  {
    title: "Why life is meant to be experienced",
    body: [
      "Because it's the only one I get, and spectating it from a screen was never the plan. Every café, every street, every strange little museum on this site is proof I showed up instead of scrolled past.",
      "One day I'll be old and slow and this site will be the closest thing I have to a time machine. I want it to be full.",
    ],
  },
];

export default function NorthStarPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The philosophy
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">North Star</h1>
      <p className="mt-3 text-text-secondary">
        Not a mission statement. Just the reasons underneath everything else on this site.
      </p>

      <div className="mt-16 space-y-16">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-text md:text-2xl">{section.title}</h2>
            <div className="mt-4 space-y-4">
              {section.body.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-24 text-center text-lg italic leading-relaxed text-text-secondary">
        The world is beautiful.
        <br />
        Go experience it.
      </p>
    </div>
  );
}
