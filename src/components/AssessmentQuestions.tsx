import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: string;
  category: string;
  text: string;
  type: "likert" | "slider" | "mcq";
  options?: string[];
  construct: string;
}

const questions: Question[] = [
  // Psychometric Section
  {
    id: "p1",
    category: "Interest",
    text: "I enjoy breaking down complex concepts into measurable parts.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "interest"
  },
  {
    id: "p2", 
    category: "Motivation",
    text: "Even if it's tedious, I strive to ensure assessments are fair and accurate.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "motivation"
  },
  {
    id: "p3",
    category: "Cognitive Preference", 
    text: "How much do you prefer designing systems with clear, predictable outcomes?",
    type: "slider",
    construct: "cognitive"
  },
  {
    id: "p4",
    category: "Personality Fit",
    text: "I double-check my work multiple times to ensure accuracy.",
    type: "likert", 
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "personality"
  },
  
  // Technical Section
  {
    id: "t1",
    category: "Technical Knowledge",
    text: "Which of the following best describes Bloom's Taxonomy?",
    type: "mcq",
    options: [
      "A framework for classifying educational goals and learning objectives",
      "A method for statistical analysis of test results", 
      "A type of assessment delivery platform",
      "A psychological theory about memory formation"
    ],
    construct: "knowledge"
  },
  {
    id: "t2",
    category: "Assessment Design",
    text: "What is the main difference between formative and summative assessment?",
    type: "mcq",
    options: [
      "Formative is for learning, summative is for evaluation",
      "Formative is digital, summative is paper-based",
      "Formative is shorter, summative is longer",
      "Formative is optional, summative is required"
    ],
    construct: "knowledge"
  },
  
  // WISCAR Framework
  {
    id: "w1",
    category: "Will",
    text: "I rework assessment content repeatedly until it's perfectly clear and aligned.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "will"
  },
  {
    id: "i1",
    category: "Interest", 
    text: "I find it fascinating to analyze how different questions assess learning outcomes.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "interest"
  },
  {
    id: "s1",
    category: "Skill",
    text: "How would you rate your current ability to write clear, unbiased questions?",
    type: "slider",
    construct: "skill"
  },
  {
    id: "c1",
    category: "Cognitive Readiness",
    text: "If Pattern A-B-A-B-A continues, what comes next?",
    type: "mcq", 
    options: ["A", "B", "C", "AB"],
    construct: "cognitive"
  },
  {
    id: "a1",
    category: "Ability to Learn",
    text: "I actively seek feedback and revise my work based on pilot data or expert input.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "learning"
  },
  {
    id: "r1",
    category: "Real-World Alignment",
    text: "How interested are you in spending time analyzing test statistics and learner performance data?",
    type: "slider",
    construct: "alignment"
  }
];

interface AssessmentQuestionsProps {
  onComplete: (responses: Record<string, string | number>) => void;
  onBack: () => void;
}

const AssessmentQuestions = ({ onComplete, onBack }: AssessmentQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | number>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleResponse = (value: string | number) => {
    setResponses(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const isAnswered = responses[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentQuestion === 0 ? "Back to Intro" : "Previous"}
            </Button>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-card bg-gradient-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {question.category}
              </CardTitle>
              <span className="text-sm text-muted-foreground capitalize">
                {question.construct}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg font-medium">{question.text}</p>

            {question.type === "likert" && question.options && (
              <RadioGroup
                value={responses[question.id]?.toString()}
                onValueChange={handleResponse}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
                    <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "mcq" && question.options && (
              <RadioGroup
                value={responses[question.id]?.toString()}
                onValueChange={handleResponse}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
                    <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "slider" && (
              <div className="space-y-4">
                <Slider
                  value={[responses[question.id] as number || 50]}
                  onValueChange={(value) => handleResponse(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Not at all</span>
                  <span>Extremely</span>
                </div>
                <div className="text-center text-sm font-medium">
                  Current value: {responses[question.id] || 50}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Button 
            variant="hero" 
            onClick={handleNext} 
            disabled={!isAnswered}
            size="lg"
          >
            {currentQuestion === questions.length - 1 ? "View Results" : "Next Question"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestions;