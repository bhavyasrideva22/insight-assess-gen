import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Target,
  Users,
  Lightbulb,
  BarChart3
} from "lucide-react";

interface AssessmentResultsProps {
  responses: Record<string, string | number>;
  onRestart: () => void;
}

interface ScoreResult {
  score: number;
  level: "high" | "medium" | "low";
  interpretation: string;
}

const calculateScores = (responses: Record<string, string | number>) => {
  // Simplified scoring logic
  const getScore = (questionIds: string[], isReverse = false) => {
    const scores = questionIds.map(id => {
      const response = responses[id];
      if (typeof response === 'string') {
        const score = parseInt(response);
        return isReverse ? 4 - score : score;
      }
      return typeof response === 'number' ? response / 25 : 2;
    });
    return (scores.reduce((a, b) => a + b, 0) / scores.length) * 25;
  };

  const psychometricScore = getScore(['p1', 'p2', 'p3', 'p4']);
  const technicalScore = getScore(['t1', 't2']) * 1.2; // Weight technical higher
  const wiscarScores = {
    will: getScore(['w1']),
    interest: getScore(['i1', 'p1']),
    skill: getScore(['s1', 't1', 't2']),
    cognitive: getScore(['c1', 'p3']),
    learning: getScore(['a1']),
    alignment: getScore(['r1'])
  };

  const overallScore = (psychometricScore + technicalScore + 
    Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;

  return {
    psychometric: psychometricScore,
    technical: technicalScore,
    wiscar: wiscarScores,
    overall: overallScore
  };
};

const getScoreResult = (score: number): ScoreResult => {
  if (score >= 80) {
    return {
      score,
      level: "high",
      interpretation: "Excellent fit - you show strong alignment with assessment design"
    };
  } else if (score >= 60) {
    return {
      score,
      level: "medium", 
      interpretation: "Good potential - with some development, this could be a great fit"
    };
  } else {
    return {
      score,
      level: "low",
      interpretation: "Limited alignment - consider exploring alternative career paths"
    };
  }
};

const getRecommendation = (overallScore: number) => {
  if (overallScore >= 80) {
    return {
      decision: "Yes",
      icon: <CheckCircle className="w-6 h-6 text-success" />,
      color: "success",
      message: "You have a structured mindset and high attention to detail. Your psychometric profile aligns with fields that require logical, ethical, and educational thinking. Start exploring instructional measurement today!"
    };
  } else if (overallScore >= 60) {
    return {
      decision: "Maybe",
      icon: <AlertTriangle className="w-6 h-6 text-warning" />,
      color: "warning",
      message: "You show moderate interest and fair aptitude, but gaps in foundational knowledge exist. With short-term upskilling in instructional design, this role is within reach."
    };
  } else {
    return {
      decision: "No",
      icon: <XCircle className="w-6 h-6 text-destructive" />,
      color: "destructive", 
      message: "Your interests and strengths may align better with more creative or interpersonal roles such as facilitator, trainer, or content creator. Consider exploring those first."
    };
  }
};

const AssessmentResults = ({ responses, onRestart }: AssessmentResultsProps) => {
  const scores = calculateScores(responses);
  const psychometricResult = getScoreResult(scores.psychometric);
  const technicalResult = getScoreResult(scores.technical);
  const overallResult = getScoreResult(scores.overall);
  const recommendation = getRecommendation(scores.overall);

  const careerRoles = [
    { title: "Assessment Designer", description: "Designs tests, quizzes, psychometrics for learning/training" },
    { title: "Learning Experience Evaluator", description: "Measures learner progress in digital environments" },
    { title: "Educational Psychometrics Associate", description: "Applies statistical techniques to validate assessments" },
    { title: "Curriculum Alignment Specialist", description: "Ensures assessments map to learning goals" },
    { title: "Digital Evaluation Strategist", description: "Works with edtech to ensure scalable assessments" }
  ];

  const skillsGap = [
    { skill: "Bloom's Taxonomy", required: "Intermediate", current: "Beginner", gap: "medium" },
    { skill: "Question Writing", required: "Intermediate", current: "Intermediate", gap: "none" },
    { skill: "Data Interpretation", required: "Intermediate", current: "Beginner", gap: "high" },
    { skill: "Educational Tools", required: "Basic", current: "None", gap: "high" },
    { skill: "Instructional Design", required: "Intermediate", current: "Basic", gap: "medium" }
  ];

  const learningPath = [
    { stage: "Beginner", content: "Assessment principles, Learning objectives, Question types", tools: "Bloom's Taxonomy, Google Forms" },
    { stage: "Intermediate", content: "Designing fair, valid assessments, Bias mitigation", tools: "Articulate, H5P" },
    { stage: "Advanced", content: "Analytics, psychometric analysis, A/B testing", tools: "xAPI, LMS analytics, Tableau" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your suitability for Assessment Design
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {recommendation.icon}
              <span>Recommendation: {recommendation.decision}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Fit Score</span>
                <span className="text-sm font-bold">{Math.round(scores.overall)}%</span>
              </div>
              <Progress value={scores.overall} className="h-3" />
            </div>
            <p className="text-muted-foreground">{recommendation.message}</p>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Psychometric Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Score</span>
                  <span className="text-sm font-bold">{Math.round(psychometricResult.score)}%</span>
                </div>
                <Progress value={psychometricResult.score} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">{psychometricResult.interpretation}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Score</span>
                  <span className="text-sm font-bold">{Math.round(technicalResult.score)}%</span>
                </div>
                <Progress value={technicalResult.score} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">{technicalResult.interpretation}</p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Framework */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              WISCAR Framework Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(scores.wiscar).map(([key, score]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{key}</span>
                    <span className="text-sm font-bold">{Math.round(score)}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Roles */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Top Roles This Skill Unlocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerRoles.map((role, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">{role.title}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Gap Analysis */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Required Skills vs Your Current Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsGap.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium">{item.skill}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>Required: {item.required}</span>
                    <span>Your Level: {item.current}</span>
                    <Badge 
                      variant={item.gap === "none" ? "default" : item.gap === "medium" ? "secondary" : "destructive"}
                    >
                      {item.gap === "none" ? "✅" : item.gap === "medium" ? "🟡" : "🔴"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Ideal Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {learningPath.map((stage, index) => (
                <div key={index} className="relative">
                  {index < learningPath.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{stage.stage}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{stage.content}</p>
                      <p className="text-xs text-muted-foreground"><strong>Tools:</strong> {stage.tools}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center">
          <Button variant="hero" size="lg" onClick={onRestart}>
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;