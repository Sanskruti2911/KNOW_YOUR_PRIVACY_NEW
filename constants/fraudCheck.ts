// constants/fraudCheck.ts
export function basicFraudCheck(input: string): 'safe' | 'risky' {
  const value = input.trim().toLowerCase();

  if (!value) return 'safe';

  const hasIp = /https?:\/\/\d{1,3}(\.\d{1,3}){3}/.test(value);
  const hasAt = /https?:\/\/[^ ]+@/.test(value);
  const hasManyHyphens = /[a-z0-9\-]{25,}\./.test(value);
  const hasWeirdTld = /\.(zip|mov|country|click|work|top|xyz)(\/|$)/.test(value);
  const looksShortener =
    /(bit\.ly|tinyurl\.com|cutt\.ly|t\.co|rb\.gy|surl\.li|linktr\.ee)/.test(value);
  const isWhatsappForward = /free.*gift|lottery|bank.*blocked|kbc.*winner/.test(value);

  const suspicious =
    hasIp ||
    hasAt ||
    hasManyHyphens ||
    hasWeirdTld ||
    looksShortener ||
    isWhatsappForward;

  return suspicious ? 'risky' : 'safe';
}
