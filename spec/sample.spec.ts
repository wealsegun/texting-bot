import { describe } from 'mocha';
import { expect } from 'chai';
import { parseTextBotCommand } from '../src';
import { TEXTING_BOT_GROUPS } from './data';


describe('parseTextBotCommand', () => {
  it('finds the correct message and group', () => {
    expect(parseTextBotCommand('txt hotline foo', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '1',
      messageToSend: 'foo',
    });
  });

  it('returns null for incorrect command format', () => {
    expect(parseTextBotCommand('not a command', TEXTING_BOT_GROUPS)).to.be.null;
  });

  it('returns null for non-matching group', () => {
    expect(parseTextBotCommand('txt unknowngroup message', TEXTING_BOT_GROUPS)).to.be.null;
  });

  it('handles multiple spaces in group name', () => {
    expect(parseTextBotCommand('txt   hotline   foo', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '1',
      messageToSend: 'foo',
    });
  });

  it('selects the longest matching group name', () => {
    const groups = [
      { id: '1', name: 'hotline' },
      { id: '2', name: 'hotline support' },
    ];
    expect(parseTextBotCommand('txt hotline support message', groups)).to.deep.equals({
      groupId: '2',
      messageToSend: 'message',
    });
  });

  it('normalizes group names case-insensitively', () => {
    expect(parseTextBotCommand('txt Hotline foo', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '1',
      messageToSend: 'foo',
    });
  });

  it('returns null for empty message part', () => {
    expect(parseTextBotCommand('txt hotline ', TEXTING_BOT_GROUPS)).to.be.null;
  });
});
