import axios from 'axios';
import fs from 'fs';
import { parse } from 'yaml';
import os from 'os';
import path from 'path';

const homeDir = os.homedir();
const YAML_FILE = path.join(homeDir, 'cricket.yml');

function loadEnvFromYAML() {

  try {

    if (!fs.existsSync(YAML_FILE)) {
      console.error(`YAML file not found at path: ${YAML_FILE}`);
      return {};
    }

    const yamlContents = fs.readFileSync(YAML_FILE, 'utf8');

    if (!yamlContents.trim()) {
      console.error('YAML file is empty');
      return {};
    }

    const envVariables = parse(yamlContents);

    if (typeof envVariables !== 'object' || envVariables === null) {
      console.error('YAML file does not contain valid key-value pairs');
      return {};
    }

    return envVariables;
  } catch (error) {
    console.error('Error loading environment variables from YAML:', error);
    return {};
  }

}

const envVariables = loadEnvFromYAML();

interface Batsman {
  name: string;
  runs: string;
  balls: string;
  strike_rate: string;
}

interface Bowler {
  name: string;
  overs: string;
  runs: string;
  wickets: string;
}

interface MatchData {
  title: string;
  update: string;
  livescore: string;
  match_date: string;
  runrate: string;
  current_batsmen: Batsman[];
  current_bowler: Bowler[];
}

const BASE_API_URL = envVariables.BASE_URL;

const isValidBatsman = (batsman: any): batsman is Batsman => {
  return (
    typeof batsman.name === 'string' &&
    typeof batsman.runs === 'string' &&
    typeof batsman.balls === 'string' &&
    typeof batsman.strike_rate === 'string'
  );
};

const isValidBowler = (bowler: any): bowler is Bowler => {
  return (
    typeof bowler.name === 'string' &&
    typeof bowler.overs === 'string' &&
    typeof bowler.runs === 'string' &&
    typeof bowler.wickets === 'string'
  );
};

const isValidMatchData = (data: any): data is MatchData => {
  return (
    typeof data.title === 'string' &&
    typeof data.update === 'string' &&
    typeof data.livescore === 'string' &&
    typeof data.match_date === 'string' &&
    typeof data.runrate === 'string' &&
    Array.isArray(data.current_batsmen) &&
    data.current_batsmen.every(isValidBatsman) &&
    Array.isArray(data.current_bowler) &&
    data.current_bowler.every(isValidBowler)
  );
};

export const fetchMatchData = async (matchId: string): Promise<MatchData> => {
  try {
    const response = await axios.get(`${BASE_API_URL}?id=${matchId}`);
    const data = response.data;
    
    if (!isValidMatchData(data)) {
      throw new Error('Invalid match data format');
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Server Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Network Error: No response received from server');
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    } else if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};