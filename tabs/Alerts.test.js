import { calculateAuroraScore, getAlertLevel } from './useAlerts';

describe('Alert Logic Tests', () => {
    test('Calculates aurora score correctly', () => {
        const cloudiness = 2; // Clear skies
        const bzLevel = -25; // Moderate geomagnetic storm
        const auroraIntensity = 60; // Strong aurora
        const bzDuration = 45; // Sustained Bz activity for 45 minutes

        const score = calculateAuroraScore(cloudiness, bzLevel, auroraIntensity, bzDuration);
        expect(score).toBe(95); // Expected score based on conditions
    });

    test('Determines alert level correctly', () => {
        expect(getAlertLevel(95)).toBe('High');
        expect(getAlertLevel(65)).toBe('Moderate');
        expect(getAlertLevel(35)).toBe('Low');
        expect(getAlertLevel(10)).toBe('Unlikely');
    });
});
