import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchMatchData } from './apiClient';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const scriptName = 'Cricket CLI Usage \n\n';
const argv = yargs(hideBin(process.argv))
  .scriptName(scriptName)
  .usage('Usage: $0 <command> [options]')
  .command('score <matchId>', 'Get the current live Cricket match score', (yargs) => {
    return yargs
      .positional('matchId', {
        describe: 'The ID of the match',
        type: 'string',
        demandOption: true,
      })
      .option('details', {
        alias: 'd',
        type: 'boolean',
        description: 'Show detailed match data',
        default: false
      })
      .help()
      .alias('help', 'h')
      .alias('version', 'v')
      .epilog('Cricket CLI - Get live cricket match scores');
  }, async (argv) => {
    try {
      
      process.stdout.write('Fetching Score > 0%');
      for (let i = 1; i <= 100; i++) {
        process.stdout.write(`\rFetching Score > ${i}%`);
        await delay(50);
      }

      process.stdout.write('\r\x1b[K');

      const data = await fetchMatchData(argv.matchId);

      console.log(`\n🏏 Match: ${data.title} \n`);
      console.log(`🔴 Livescore: ${data.livescore}\n`);
      console.log(`✅ Status: ${data.update}\n`);
      console.log(`📊 Run Rate: ${data.runrate} \n`);

      if (argv.details) {
        console.log('🥎 Current Batsmen: \n');
        data.current_batsmen.forEach((batsman, index) => {
          console.log(`${index + 1}. ${batsman.name} - ${batsman.runs} runs (${batsman.balls} balls) - SR: ${batsman.strike_rate} \n`);
        });
        console.log('🥎 Current Bowler: \n');
        data.current_bowler.forEach((bowler, index) => {
          console.log(`${index + 1}. ${bowler.name} - ${bowler.overs} overs, ${bowler.runs} runs, ${bowler.wickets} wickets \n`);
        });
        console.log(`📅 Match Date: ${data.match_date} \n`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred');
      }
    }
  })
  .demandCommand(1, 'You need to specify a command before moving on')
  .strict()
  .help()
  .alias('help', 'h')
  .alias('version', 'v')
  .epilog('Cricket CLI - Get live cricket match scores')
  .argv;
