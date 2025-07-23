import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';

interface CharacterBreakdown {
  uppercase: number;
  lowercase: number;
  numbers: number;
  symbols: number;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  suggestions: string[];
  entropy: number;
  bruteForceTime: string;
  characterBreakdown: CharacterBreakdown;
}

export function useAdvancedPasswordStrength(password: string): PasswordStrength {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    suggestions: [],
    entropy: 0,
    bruteForceTime: '',
    characterBreakdown: { uppercase: 0, lowercase: 0, numbers: 0, symbols: 0 },
  });

  useEffect(() => {
    const calculateStrength = () => {
      const result = zxcvbn(password);
      const feedback: string[] = [];
      const suggestions: string[] = [];

      // Length check
      if (password.length >= 12) {
        feedback.push("Good length");
      } else {
        suggestions.push("Make it at least 12 characters long");
      }

      // Character diversity checks
      if (!/[A-Z]/.test(password)) suggestions.push("Add uppercase letters");
      if (!/[a-z]/.test(password)) suggestions.push("Add lowercase letters");
      if (!/\d/.test(password)) suggestions.push("Add numbers");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) suggestions.push("Add special characters");

      // Common password detection
      if (result.feedback.warning) {
        suggestions.push(result.feedback.warning);
      }

      // Pattern recognition
      if (result.sequence.length > 0) {
        suggestions.push("Avoid common patterns and sequences");
      }

      // Entropy calculation
      const entropy = Math.log2(Math.pow(95, password.length));

      // Brute force resistance estimation
      const bruteForceTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;

      // Character breakdown
      const characterBreakdown: CharacterBreakdown = {
        uppercase: (password.match(/[A-Z]/g) || []).length,
        lowercase: (password.match(/[a-z]/g) || []).length,
        numbers: (password.match(/\d/g) || []).length,
        symbols: (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length,
      };

      setStrength({
        score: result.score * 25, // Normalize to 0-100
        feedback: [...feedback, ...result.feedback.suggestions],
        suggestions,
        entropy,
        bruteForceTime,
        characterBreakdown,
      });
    };

    calculateStrength();
  }, [password]);

  return strength;
}

