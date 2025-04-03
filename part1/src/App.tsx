import React, { useState, useEffect } from 'react';
import axios from "axios";
import diariesService from './services/diaries';
import { DiaryEntry, Visibility, Weather } from './types';

interface ContentProps {
  diaryParts: DiaryEntry[];
}

interface ErrorMessage {
  errorMessage: string;
}

const Header = () => {
  return (
    <h2>Diary entries</h2>
  );
}

const Notify = (props: ErrorMessage) => {
  if ( props.errorMessage === '' ) {
    return null;
  }
  return (
    <div style={{color: 'red'}}>
      {props.errorMessage}
    </div>
  )
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
  const [errorMessage, setErrorMessage] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [addDiary, setAddDiary] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  // Com useEffect o seguinte código só se chama umha vez
  useEffect(() => {
    diariesService.getAll()
      .then(response => {
        console.log('getall', 'ok');
        setDiaries(response);
      })
      .catch(error => {
        console.log('fail diariesService.getAll', error);
      })
  }, []) // [] fequencia coa se ejecuta o efecto, [] = só co primeiro renderizado

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = { date, weather, visibility, comment };
    diariesService.create(newDiary)
      .then(response => {
        setDiaries(diaries.concat(response));
        console.log('diaryCreation', 'ok');
      })
      .catch(error => {
        if (axios.isAxiosError<string, Record<string, unknown>>(error)) {
          console.log(error.status);
          if (error.response && error.response.data) {
            console.error(error.response.data);
            notify(error.response?.data);
          }
        } else {
          console.error(error);
        }
      })
    setDate('');
    setComment('');
    setAddDiary('');
  };

  const notify = (message: string) => {
    console.log('notify', message)
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 10000)
  };

  return (
    <div>
      <Header />
      <Notify errorMessage={errorMessage} />
      { addDiary === '' ? <button onClick={() => setAddDiary('add')}>add new</button> : 
        <div>
          <form onSubmit={diaryCreation}>
            <div>
              date:
              <input value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
            <div>
              weather: 
              <select value={weather} onChange={(event) => setWeather(event.target.value as Weather)}>
                {Object.values(Weather).map((weather) => <option key={weather}>{weather}</option>)}
              </select>
            </div>
            <div>
              visibility:
              <select value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}>
                {Object.values(Visibility).map((visibility) => <option key={visibility}>{visibility}</option>)}
              </select>
            </div>
            <div>
              comment:
              <input value={comment} onChange={(event) => setComment(event.target.value)} />
            </div>
            <button type='submit'>add</button>
          </form>
          <button onClick={() => setAddDiary('')}>cancel</button>
        </div>
      }
      <Content diaryParts={diaries} />
    </div>
  );
};

export default App;