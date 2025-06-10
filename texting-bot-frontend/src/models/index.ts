import { Group, ParseTextBotCommandOutput } from "../interfaces/interfaces";

/**
 * Parses the input command to determine the group and message.
 *
 * @param rawInput - The raw command input from the user.
 * @param groups - An array of available groups.
 * @returns An object containing the group ID and message, or null if not determinable.
 */
export const parseTextBotCommand = (rawInput: string, groups: Group[]): ParseTextBotCommandOutput | null => {
  const commandPattern = /^txt\s+(.+?)\s+(.*)$/i; // Regex to match command format
  const match = rawInput.match(commandPattern);

  if (!match) return null; // Return null if the command format is incorrect

  const groupPart = match[1].trim().replace(/\s+/g, ' ').toLowerCase(); // Normalize group name
  const messagePart = match[2].trim(); // Extract message part

  // Filter and find matching groups
  const matchingGroups = groups.filter(group =>
    group.name.replace(/\s+/g, ' ').toLowerCase() === groupPart
  );

  // If no groups match, return null
  if (matchingGroups.length === 0) return null;

  // If multiple groups match, select the longest group name
  const selectedGroup = matchingGroups.reduce((longest, current) =>
    current.name.length > longest.name.length ? current : longest
  );

  return {
    groupId: selectedGroup.id,
    messageToSend: messagePart
  };
};
