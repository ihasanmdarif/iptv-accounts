import { CreateResumeSchema } from "@/schema/resume";
import { z } from "zod";
import { create } from "zustand";

type resumeFormType = z.infer<typeof CreateResumeSchema>;

interface ResumeStore {
  resumeForm: resumeFormType;
  currentStepIndex: number;
  updateResumeForm: (property: Partial<resumeFormType>) => void;
  gotoNextform: () => void;
  gotoPreviousForm: () => void;
  isLastStep: () => boolean;
  isFirstStep: () => boolean;
  maxSteps: number;
}

export const useResumeStore = create<ResumeStore>()((set, get) => ({
  resumeForm: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    country: "",
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: null,
        endDate: null,
        description: "",
        isCurrent: false,
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        startDate: null,
        endDate: null,
        description: "",
        isCurrentlyStudying: false,
      },
    ],
    skills: [],
    languages: [],
    certifications: [],
    hobbies: [],
  },
  maxSteps: 4,
  currentStepIndex: 2,
  updateResumeForm: (property) =>
    set((state) => ({
      resumeForm: { ...state.resumeForm, ...property },
    })),
  gotoNextform: () =>
    set((state) => ({
      currentStepIndex:
        state.currentStepIndex >= state.maxSteps - 1
          ? state.currentStepIndex
          : state.currentStepIndex + 1,
    })),
  gotoPreviousForm: () =>
    set((state) => ({
      currentStepIndex:
        state.currentStepIndex <= 0
          ? state.currentStepIndex
          : state.currentStepIndex - 1,
    })),
  isLastStep: () => get().currentStepIndex === get().maxSteps - 1,
  isFirstStep: () => get().currentStepIndex === 0,
}));
