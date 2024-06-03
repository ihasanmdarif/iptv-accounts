"use client";
import { useResumeStore } from "@/lib/stores/resume.store";
import { CreateResumeSchema } from "@/schema/resume";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

const ResumeMilestoneSchema = CreateResumeSchema.pick({
  education: true,
  skills: true,
  languages: true,
  certifications: true,
  hobbies: true,
});

export const ResumeMilestonesForm = () => {
  const resumeStore = useResumeStore();
  const form = useForm<z.infer<typeof ResumeMilestoneSchema>>({
    resolver: zodResolver(ResumeMilestoneSchema),
    defaultValues: resumeStore.resumeForm,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const isCurrentSchool = form.watch("education");

  function onSubmit(data: z.infer<typeof ResumeMilestoneSchema>) {
    console.log(data);
    resumeStore.updateResumeForm(data);
    resumeStore.gotoNextform();
  }

  function goBack() {
    resumeStore.gotoPreviousForm();
  }

  async function addExperienceFields() {
    const isValid = await form.trigger();

    if (isValid) {
      append({
        institution: "",
        degree: "",
        startDate: null,
        endDate: null,
        description: "",
        isCurrentlyStudying: false,
      });
    }
  }

  return (
    resumeStore.currentStepIndex === 2 && (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <FormField
                control={form.control}
                name={`education.${index}.institution` as const}
                defaultValue={field.institution}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.degree` as const}
                defaultValue={field.institution}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 items-center">
                <FormField
                  control={form.control}
                  name={`education.${index}.startDate` as const}
                  defaultValue={field.startDate}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isCurrentSchool[index].isCurrentlyStudying && (
                  <FormField
                    control={form.control}
                    name={`education.${index}.endDate` as const}
                    defaultValue={field.endDate}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name={`education.${index}.isCurrentlyStudying` as const}
                defaultValue={field.isCurrentlyStudying}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I'm currently studing here</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`education.${index}.description` as const}
                defaultValue={field.description}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={addExperienceFields}
            >
              {fields.length === 0 ? "Add Education" : "Add Another Education"}
            </Button>
            {fields.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                type="button"
                onClick={() => remove(fields.length - 1)}
              >
                Remove this education
              </Button>
            )}
          </div>
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="secondary" onClick={goBack}>
              Go Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    )
  );
};
