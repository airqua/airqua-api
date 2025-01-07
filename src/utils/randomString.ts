import { randomBytes } from "crypto";

export const randomString = (length: number): string => {
    // Generate random bytes
    const randomBuffer = randomBytes(length);
    // Convert to base36 (alphanumeric) and slice to the desired length
    return randomBuffer
        .toString('base64') // Use a large character set
        .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
        .slice(0, length); // Ensure the output matches the requested length
};