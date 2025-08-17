import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-assessment.jpg";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Assessment Design Interface" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse-soft">
              Should I Become an
              <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Assessment Designer?
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover if a career in Assessment Design aligns with your skills, interests, and career goals through our comprehensive evaluation.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onStartAssessment}
              className="text-lg px-12 py-6 h-auto"
            >
              Start Assessment
            </Button>
          </div>
        </div>
      </div>

      {/* What Do Assessment Designers Do Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Do Assessment Designers Do?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Assessment Designers create evaluations for education, recruitment, training, compliance, and psychological purposes. 
            They ensure content is pedagogically sound, valid, and data-rich.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Assessment Designer</h3>
              <p className="text-sm text-muted-foreground">Create reliable, valid assessments for various purposes</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Learning Specialist</h3>
              <p className="text-sm text-muted-foreground">Develop evaluation strategies for training programs</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Psychometrician</h3>
              <p className="text-sm text-muted-foreground">Apply statistical methods to measurement and evaluation</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Digital Strategist</h3>
              <p className="text-sm text-muted-foreground">Design scalable digital assessment solutions</p>
            </CardContent>
          </Card>
        </div>

        {/* Key Traits Section */}
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Key Traits for Success</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Critical thinking",
                "Attention to detail", 
                "Structured mindset",
                "Pedagogical knowledge",
                "Interest in analytics",
                "Curiosity about learning science"
              ].map((trait, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Info */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Comprehensive Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Personalized Results</span>
            </div>
          </div>
          
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onStartAssessment}
            className="text-lg px-12 py-6 h-auto"
          >
            Begin Your Assessment Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;