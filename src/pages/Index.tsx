
import { useState } from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import SummaryOutput from '../components/SummaryOutput';
import AnimatedParticles from '../components/AnimatedParticles';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [mode, setMode] = useState('patient'); // 'patient' or 'doctor'
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file) => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setSummary('');

    // Simulate processing delay
    setTimeout(() => {
      setShowParticles(true);
      
      // Generate mock summary based on mode
      const mockSummary = mode === 'patient' 
        ? generatePatientSummary()
        : generateDoctorSummary();
      
      setSummary(mockSummary);
      setIsProcessing(false);
      
      toast({
        title: "Success!",
        description: "Your summary has been generated successfully.",
      });

      // Hide particles after animation
      setTimeout(() => setShowParticles(false), 3000);
    }, 2000);
  };

  const generatePatientSummary = () => {
    return `**Your Medical Report Summary**

Hello! I've reviewed your medical report and here's what it means in simple terms:

**Key Findings:**
• Your blood pressure readings are within the normal range (120/80 mmHg)
• Your cholesterol levels are slightly elevated but manageable with diet changes
• Your kidney function tests show excellent results
• No signs of diabetes detected in your blood sugar levels

**What This Means:**
Your overall health looks good! The slightly high cholesterol is common and can be improved with simple lifestyle changes like eating more vegetables and walking regularly.

**Next Steps:**
• Follow up with your doctor in 3 months
• Consider reducing saturated fats in your diet
• Aim for 30 minutes of light exercise daily

**Questions?** Don't hesitate to discuss these results with your healthcare provider. They're here to help explain anything that's unclear.`;
  };

  const generateDoctorSummary = () => {
    return `**Research Paper Analysis - Clinical Summary**

**Study Overview:**
• Randomized controlled trial (n=1,247) examining novel therapeutic intervention
• 12-month follow-up period with primary endpoint assessment
• Multi-center study across 15 clinical sites

**Key Findings:**
• Primary endpoint achieved: 23% reduction in target biomarker (p<0.001)
• Secondary outcomes: Improved patient-reported quality of life scores
• Safety profile: 3.2% incidence of mild adverse events, no serious AEs reported
• Subgroup analysis shows enhanced efficacy in patients >65 years

**Clinical Implications:**
• Statistically significant improvement over standard care
• Number needed to treat (NNT) = 7
• Results consistent across demographic subgroups

**Limitations:**
• Open-label design may introduce bias
• Limited diversity in study population
• Short-term follow-up period

**Recommendation:**
Consider for inclusion in updated clinical guidelines pending larger-scale validation studies.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar mode={mode} onModeChange={setMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Medical Report Summarizer
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {mode === 'patient' 
                ? "Get clear, easy-to-understand summaries of your medical reports"
                : "Generate precise, clinical summaries of research papers and medical documents"
              }
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <FileUpload 
              mode={mode}
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
            />
            
            <SummaryOutput 
              summary={summary}
              mode={mode}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </main>

      {showParticles && <AnimatedParticles />}
    </div>
  );
};

export default Index;
