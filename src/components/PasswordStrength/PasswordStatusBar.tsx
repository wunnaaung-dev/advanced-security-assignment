import React from "react";

type CurrentPwd = {
  currentPwd: string;
};

interface PasswordStatus {
  strengthTextColor: string
  statusBarColor: string
}

enum PasswordStrength {
  Weak = "Weak",
  Medium = "Medium",
  Strong = "Strong",
}

const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 10) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 14) score += 1;

  if (/\d/.test(password)) score += 1;

  if (/[a-z]/.test(password)) score += 1;

  if (/[A-Z]/.test(password)) score += 1;

  if (/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(password)) score += 1;

  const hasGoodMix = (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
  if (hasGoodMix) score += 2;

  const commonPatterns = [
    /^[A-Z][a-z]+\d+$/,
    /^[a-z]+\d+$/,
    /^12345/,
    /password/i,
    /admin/i,
    /user/i,
    /login/i
  ];

  if (commonPatterns.some(pattern => pattern.test(password))) {
    score = Math.max(0, score - 2);
  }

  if (score < 4) return PasswordStrength.Weak;
  if (score < 7) return PasswordStrength.Medium;
  return PasswordStrength.Strong;
};

const PasswordStatusBar: React.FC<CurrentPwd> = ({ currentPwd }) => {
  const strength = getPasswordStrength(currentPwd);

  const getStrengthColor = (): PasswordStatus => {
    switch (strength) {
      case PasswordStrength.Weak:
        return {
          statusBarColor: "bg-red-500 w-[30%]",
          strengthTextColor: "text-red-500"
        }
      case PasswordStrength.Medium:
        return {
          statusBarColor: "bg-orange-500 w-[50%]",
          strengthTextColor: "text-orange-500"
        };
      case PasswordStrength.Strong:
        return {
          statusBarColor: "bg-green-500 w-[100%]",
          strengthTextColor: "text-green-500"
        };
    }
  };
  const { strengthTextColor, statusBarColor } = getStrengthColor();

  return (
    <div className="flex justify-between items-center">
      <div className="w-64 h-[8px] bg-slate-200 rounded-full">
        <div className={`transition-all duration-300 h-full rounded-full ${statusBarColor}`}></div>
      </div>
      <p className={strengthTextColor}>{strength}</p>
    </div>
  );
};

export default PasswordStatusBar;
