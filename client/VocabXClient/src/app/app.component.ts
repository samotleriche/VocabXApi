import { Component } from '@angular/core';
import { Word, Progress } from './word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  words: Word[] = [
    {
      title: 'Prolific',
      definition:
        'To create many works; producing many fruits or offspring; present in large numbers or quantities',
      POS: 'adjective',
      examples: [
        'The prolific artist had works in half the museams in the city.',
        'This species of frog is quite a prolific breeder.',
        'The now extinct bat was once prolific in these areas.',
      ],
      progress: Progress.None,
      pronounce: 'prəˈlifik',
      quiz: '5e530ba5f85ba704fe658686',
      user: '5e54abd317b67149faae0d64',
    },
    {
      title: 'Exasperate',
      definition: 'Irritate and frustrate someone intensely.',
      POS: 'verb',
      examples: ['The drama left him feeling exasperated.'],
      progress: Progress.None,
      pronounce: 'iɡˈzaspəˌrāt',
      quiz: '5e530ba5f85ba704fe658686',
      user: '5e54abd317b67149faae0d64',
    },
    {
      title: 'Auspicious',
      definition: 'Conducive to success; favorable',
      POS: 'adjective',
      examples: ['The weather was not the most auspicious for sailing'],
      progress: Progress.None,
      pronounce: 'ôˈspiSHəs',
      quiz: '5e530ba5f85ba704fe658686',
      user: '5e54abd317b67149faae0d64',
    },
  ];
}
