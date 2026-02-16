// Mock data for MindSpace Week 1

export const mockEmailSubmission = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock email submitted:', email);
      resolve({ success: true, message: 'Thank you for joining the beta!' });
    }, 500);
  });
};

export const reflectionQuestions = [
  "I feel tense even when nothing specific is wrong.",
  "I overthink situations after they happen.",
  "I worry about worst-case outcomes.",
  "I notice physical tension during stress.",
  "I avoid situations that feel uncertain.",
  "I replay conversations in my head.",
  "I struggle to relax fully.",
  "I feel on edge in social situations.",
  "I prepare excessively for possible problems.",
  "I feel relief only after a stressful event ends."
];

export const getScoreInterpretation = (totalScore) => {
  if (totalScore >= 0 && totalScore <= 9) {
    return {
      title: "Lower Activation Patterns",
      message: "Your responses suggest lower activation patterns. You may experience stress situationally rather than consistently."
    };
  } else if (totalScore >= 10 && totalScore <= 19) {
    return {
      title: "Moderate Nervous System Activation",
      message: "Your responses suggest moderate nervous system activation under stress. Awareness can help you intervene earlier."
    };
  } else {
    return {
      title: "Frequent Activation Patterns",
      message: "Your responses suggest frequent activation patterns. Your nervous system may remain on alert more often than needed."
    };
  }
};
