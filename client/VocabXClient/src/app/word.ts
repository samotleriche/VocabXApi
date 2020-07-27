export interface Word {
  title: String;
  definition: String;
  POS: String;
  examples: String[];
  progress: Progress;
  pronounce: String;
  quiz: String;
  user: String;
}

export enum Progress {
  None = 'None',
  Learning = 'Learning',
  Learned = 'Learned',
}
