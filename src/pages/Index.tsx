import { useState } from "react";
import AssessmentIntro from "@/components/AssessmentIntro";
import AssessmentQuestions from "@/components/AssessmentQuestions";
import AssessmentResults from "@/components/AssessmentResults";

type AssessmentStep = "intro" | "questions" | "results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("intro");
  const [assessmentResponses, setAssessmentResponses] = useState<Record<string, string | number>>({});

  const handleStartAssessment = () => {
    setCurrentStep("questions");
  };

  const handleAssessmentComplete = (responses: Record<string, string | number>) => {
    setAssessmentResponses(responses);
    setCurrentStep("results");
  };

  const handleBackToIntro = () => {
    setCurrentStep("intro");
  };

  const handleRestart = () => {
    setAssessmentResponses({});
    setCurrentStep("intro");
  };

  return (
    <div>
      {currentStep === "intro" && (
        <AssessmentIntro onStartAssessment={handleStartAssessment} />
      )}
      
      {currentStep === "questions" && (
        <AssessmentQuestions 
          onComplete={handleAssessmentComplete}
          onBack={handleBackToIntro}
        />
      )}
      
      {currentStep === "results" && (
        <AssessmentResults 
          responses={assessmentResponses}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
