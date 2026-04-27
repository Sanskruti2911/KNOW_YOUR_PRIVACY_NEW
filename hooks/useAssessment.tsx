// hooks/useAssessment.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';

export type AnswerValue = 0 | 1 | 2; // 0 = low risk, 1 = moderate, 2 = high risk

export type AssessmentAnswers = {
  deviceLock?: AnswerValue;
  publicWifi?: AnswerValue;
  permissions?: AnswerValue;
  socialSharing?: AnswerValue;
  passwords?: AnswerValue;
  twoFA?: AnswerValue;
  socialApps?: AnswerValue;
  passwordManager?: AnswerValue;
  browsingHistory?: AnswerValue;
};

type RiskLevel = 'low' | 'moderate' | 'high';

type AssessmentContextType = {
  answers: AssessmentAnswers;
  setAnswers: (a: AssessmentAnswers) => void;
  score: number;        // 0–100 privacy score (higher = better)
  riskLevel: RiskLevel; // derived from score
  riskColor: string;    // color for UI
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined,
);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<AssessmentAnswers>({});

  /**
   * Scoring Logic (INVERTED for privacy score)
   * 0 (low risk answer)   → +10 points (good privacy)
   * 1 (moderate risk)     → +5 points
   * 2 (high risk answer)  → +0 points (poor privacy)
   */
  const score = useMemo(() => {
    const values = Object.values(answers).filter(
      (v): v is AnswerValue => v !== undefined,
    );

    if (values.length === 0) return 0;

    const rawScore = values.reduce<number>((total, ans) => {
      switch (ans) {
        case 0:
          return total + 10;
        case 1:
          return total + 5;
        case 2:
          return total + 0;
        default:
          return total;
      }
    }, 0);

    const maxPossible = values.length * 10;
    const normalized = (rawScore / maxPossible) * 100;

    return Math.round(Math.min(100, Math.max(0, normalized)));
  }, [answers]);

  const riskInfo = useMemo(() => {
    if (score <= 39) {
      return { riskLevel: 'low' as RiskLevel, riskColor: '#22c55e' };   // green
    } else if (score <= 75) {
      return { riskLevel: 'moderate' as RiskLevel, riskColor: '#facc15' }; // yellow
    }
    return { riskLevel: 'high' as RiskLevel, riskColor: '#ef4444' };    // red
  }, [score]);

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        setAnswers,
        score,
        riskLevel: riskInfo.riskLevel,
        riskColor: riskInfo.riskColor,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error('useAssessment must be used inside AssessmentProvider');
  }
  return ctx;
}
