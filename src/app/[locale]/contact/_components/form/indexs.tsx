"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { Control } from "react-hook-form";
import { useState } from "react";
import AnimationContainer from "@/components/global/animation-container";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useTranslations } from "next-intl";

// Esquema de validación Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;


function InterestOptions({ control }: { control: Control<FormData> }) {
  
  const t = useTranslations('Form');
const interests =  t.raw('Interests') as string[];
  // const options = [
  //   "Landing Pages",
  //   "E-commerce Development",
  //   "Software a la Medida",
  //   "Diseño UI/UX Profesional",
  //   "Integraciones y Automatizaciones",
  //   "Rediseño de proyecto",
  //   "Otros servicios",
  // ];

  return (
    <Controller
      name="interests"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Label className="mb-2 block">{t('InterestLabel')}</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interests.map((option) => (
              <div
                key={option}
                className={`border rounded-full px-4 py-2 min-h-12 lg:h-14 flex justify-center items-center text-sm text-center cursor-pointer select-none transition-all duration-300 ${
                  field.value.includes(option)
                    ? "brand-gradient-bg border-transparent text-white font-semibold shadow-[0_10px_30px_-12px_rgba(110,57,253,0.9)]"
                    : "border-white/12 bg-white/[0.03] text-muted-foreground hover:-translate-y-0.5 hover:border-brand-lavender/60 hover:text-foreground"
                }`}
                onClick={() => {
                  const newValue = field.value.includes(option)
                    ? field.value.filter((item: string) => item !== option)
                    : [...field.value, option];
                  field.onChange(newValue);
                }}
              >
                {option}
              </div>
            ))}
          </div>
          {fieldState.error && (
            <p className="text-destructive text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

 const t = useTranslations('Form');

 const budget =  t.raw('Budget') as string[];

  const confetti = useConfettiStore();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      budget: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error sending form");
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      // Hacer scroll hacia arriba
      window.scrollTo({ top: 0, behavior: "smooth" });
      confetti.onOpen();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative gradient-ring rounded-3xl bg-space-850/60 p-5 backdrop-blur-xl md:p-8 lg:mt-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-violet/25 blur-[100px]" />
      <form className="relative space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name')}</Label>
              <Input
                id="name"
                placeholder={t('Placeholdername')}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('Placeholderemail')}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
        </AnimationContainer>
        <AnimationContainer animation="fadeUp" delay={0.7}>
          <InterestOptions control={control} />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.12}>
          <Controller
            name="budget"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <Label className="mb-2 block">{t('BudgetLabel')}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {budget.map(
                    (budget) => (
                      <div
                        key={budget}
                        className={`border rounded-full px-4 py-2 h-12 md:h-14 flex justify-center items-center text-sm text-center cursor-pointer select-none transition-all duration-300 ${
                          budget === field.value
                            ? "brand-gradient-bg border-transparent text-white font-semibold shadow-[0_10px_30px_-12px_rgba(110,57,253,0.9)]"
                            : "border-white/12 bg-white/[0.03] text-muted-foreground hover:-translate-y-0.5 hover:border-brand-lavender/60 hover:text-foreground"
                        }`}
                        onClick={() => field.onChange(budget)}
                      >
                        {budget}
                      </div>
                    )
                  )}
                </div>
                {fieldState.error && (
                  <p className="text-destructive text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </AnimationContainer>
        <AnimationContainer animation="fadeUp" delay={0.17}>
          <div className="space-y-2">
            <Label htmlFor="message">{t('message')}</Label>
            <Textarea
              id="message"
              placeholder={t('PlaceholderMessage')}
              className="min-h-[100px]"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-destructive text-sm">
                {errors.message.message}
              </p>
            )}
          </div>
        </AnimationContainer>
        <AnimationContainer animation="scaleUp" delay={1}>
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isSubmitting}
            className={`group max-sm:mx-auto max-sm:w-full ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? (
              <>
                {t('buttonTextSending')}
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="size-6 text-white/30 animate-spin fill-brand-gold"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </>
            ) : !isValid ? (
              t('buttonText')
            ) : (
              t('buttonTextComplete')
            )}
            {!isSubmitting && <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />}
          </Button>
        </AnimationContainer>
      </form>
    </div>
  );
}
