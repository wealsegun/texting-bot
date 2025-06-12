import { ParseTextBotCommandOutput, Group } from './interfaces';
/**
 * We're writing a command line program that users can use to send text messages
 * to different groups of people. The program will take in a string, and parse it
 * to determine which group of people to send the message to, and what the message
 * should be.
 *
 * For example, if the user says "txt GROUP1 Hello, world!", the program
 * should send the message "Hello, world!" to everyone in GROUP1.
 *
 * If there is a group named "sart group", and the user says "txt sart group Hello, world!",
 * then we'll send a text message to everyone in the "sart group" group.
 *
 * Your goal here is to implement the `parseTextBotCommand` function, which will
 * determine the group to send the message to, and the message to send.
 *
 * Details:
 * - When parsing the group name, please ignore any leading or
 * trailing whitespace, case, and any whitespace between words (e.g.,
 * if the group name contains multiple words). For example, if the message is
 * "txt   hotline  1  Hello,  world!" then it should send the message "Hello,  world!"
 * to the "hotline 1" group. If the group name is hotline and the message is "txt hot line hello"
 * then it should send the message "hello" to the group "hotline".
 * - If the message provided could refer to multiple different groups
 * then please use the longest group in the groups array
 * is the correct one. For example, if "test copy" and "test" are both
 * possible groups, then "txt test copy one" should send the message "one"
 * to the "test copy" group.
 *
 * - Once you've parsed the group name please return the
 * message with leading and trailing whitespace removed and no
 * other changes. Empty values for "messageToSend" are allowed.
 *
 * If you cannot determine a group and message, return null.
 *
 * @param rawInput
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
