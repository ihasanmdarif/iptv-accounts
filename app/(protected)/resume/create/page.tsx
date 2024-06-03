import { ResumeExperienceForm } from "@/components/ResumeExperienceForm";
import { ResumeMilestonesForm } from "@/components/ResumeMilestonesForm";
import { ResumeUserInfoForm } from "@/components/ResumeUserInfoForm";

const Page = () => {
  return (
    <div>
      <ResumeUserInfoForm />
      <ResumeExperienceForm />
      <ResumeMilestonesForm />
    </div>
  );
};

export default Page;
