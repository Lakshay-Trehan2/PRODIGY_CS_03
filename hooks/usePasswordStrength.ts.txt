import { useState, useEffect } from 'react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  suggestions: string[];
}

export function usePasswordStrength(password: string): PasswordStrength {
  const [strength, setStrength] = useState<PasswordStrength>({ score: 0, feedback: [], suggestions: [] });

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0;
      const feedback: string[] = [];
      const suggestions: string[] = [];

      // Length check
      if (password.length >= 12) {
        score += 25;
        feedback.push("Good length");
      } else {
        suggestions.push("Make it at least 12 characters long");
      }

      // Uppercase check
      if (/[A-Z]/.test(password)) {
        score += 25;
        feedback.push("Contains uppercase");
      } else {
        suggestions.push("Add uppercase letters");
      }

      // Lowercase check
      if (/[a-z]/.test(password)) {
        score += 25;
        feedback.push("Contains lowercase");
      } else {
        suggestions.push("Add lowercase letters");
      }

      // Number check
      if (/\d/.test(password)) {
        score += 25;
        feedback.push("Contains numbers");
      } else {
        suggestions.push("Add numbers");
      }

      // Special character check
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 25;
        feedback.push("Contains special characters");
      } else {
        suggestions.push("Add special characters");
      }

      // Normalize score to 100
      score = Math.min(100, score);

      setStrength({ score, feedback, suggestions });
    };

    calculateStrength();
  }, [password]);

  return strength;
}

