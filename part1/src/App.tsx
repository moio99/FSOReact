import React, { useState, useEffect } from 'react';
import diariesService from './services/diaries';
import { DiaryEntry } from './types';

interface ContentProps {
  diaryParts: DiaryEntry[];
}

const Header = () => {
  return (
    <h2>Diary entries</h2>
  );
}

const Content = (props: ContentProps) => {
  return (
    props.diaryParts.map((part) => (
      <div key={part.id} style={{ marginBottom: '1em' }}>
        <strong>{part.date}</strong>
        <div>visibility: {part.visibility}</div>
        <div>weather: {part.weather}</div>
        <div>comement: {part.comment}</div>
      </div>
    ))
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  // Com useEffect o seguinte código só se chama umha vez
  useEffect(() => {
    diariesService.getAll()
      .then(response => {
        console.log('getall', 'ok')
        setDiaries(response);
      })
      .catch(error => {
        console.log('fail diariesService.getAll', error)
      })
  }, []) // [] fequencia coa se ejecuta o efecto, [] = só co primeiro renderizado

  return (
    <div>
      <Header />
      <Content diaryParts={diaries} />
    </div>
  );
};

export default App;