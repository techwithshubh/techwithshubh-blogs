import { Subscription } from "@/components/Subscription";

export default function Resources() {
  const resources = [
    {
      id: "1",
      name: "UI/UX Reference Links",
      link: "/assets/resources/ui-ux-links.html",
      description:
        "Explore a curated collection of web links to enhance your UI/UX skills. From HyperUI's free Tailwind CSS components for diverse projects to Draftss' SaaS hero section examples, find inspiration and practical resources to perfect your designs. Additionally, discover tools like Editor.js for content creation and UI Generator for generating mockup UI, along with Microcopy for refining short copy text across your website.",
    },
    {
      id: "2",
      name: "Frontend Daily Challenges",
      link: "/assets/resources/frontend-challenges.html",
      description:
        "These platforms offer a range of daily frontend challenges to improve coding skills. iCodeThis provides projects tailored for skill enhancement across various technologies, while Frontend Mentor | Challenges offers HTML, CSS, and JavaScript challenges to expand portfolios and sharpen coding abilities. Frontend Practice | Project Library provides a curated collection of real-world projects for honing frontend development skills, and CSSBattle offers a fun and interactive environment for challenging CSS-based puzzles.",
    },
    {
      id: "3",
      name: "VS Code Refactoring Extensions",
      link: "/assets/resources/vs-code-extensions.html",
      description:
        "These extensions help with improving development workflows by providing essential tools for code refactoring and organization. JavaScript Booster offers a range of fast fixes for JavaScript, TypeScript, and Flow, promoting code readability and maintainability. Glean specializes in React projects, offering refactoring tools tailored to improve codebase structure and efficiency. Todo Tree streamlines task management by quickly identifying and organizing comment tags like TODO and FIXME within the workspace, enabling developers to prioritize and track development objectives effectively.",
    },
  ];
  return (
    <>
      <Subscription />
      <section className="bg-white">
        <div className="mx-auto py-12 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold">Resources</h1>
          <p>
            My current list of resources to assist you on your developer
            journey.
          </p>
          <div className="my-8 flex flex-col gap-4">
            {resources.map((resource) => {
              return (
                <a
                  href={resource.link}
                  target="_blank"
                  className="border-2 border-solid border-pastal-blue rounded px-2 py-4 hover:border-soft-blue"
                  key={resource.id}
                >
                  <p className="font-semibold text-xl">{resource.name}</p>
                  <p className="pt-4 text-sm text-gray-600">
                    {resource.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
