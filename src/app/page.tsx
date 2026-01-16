import { Accordion } from "@/components/ui/accordion";
import { Education } from "./_components/sections/education";
import { Experience } from "./_components/sections/experience";
import { Introduction } from "./_components/sections/introduction";
import { Projects } from "./_components/sections/projects";

export default async function Page() {
  return (
    <main className="mb-(--nav-height) md:mt-(--nav-height) flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-160">
        <div className="flex flex-col gap-6">
          <Introduction />

          <Accordion multiple defaultValue={["experience", "personalProjects"]}>
            <Experience />
            <Projects />
            <Education />
          </Accordion>
        </div>
      </div>
    </main>
  );
}
