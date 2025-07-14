import React, { useEffect, useState } from 'react';
import {
  HtmlEditor, Image, Inject, Link, QuickToolbar,
  RichTextEditorComponent, Toolbar
} from '@syncfusion/ej2-react-richtexteditor';
import { Header } from '../components';
import { EditorData } from '../data/dummy'; 

const LOCAL_STORAGE_KEY = 'editorContent';

const Editor = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    setContent(saved || EditorData); 
  }, []);

  const handleChange = (e) => {
    setContent(e.value);
    localStorage.setItem(LOCAL_STORAGE_KEY, e.value);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Editor" />
      <RichTextEditorComponent
        value={content}
        change={handleChange}
      >
        <Inject services={[HtmlEditor, Image, Link, QuickToolbar, Toolbar]} />
      </RichTextEditorComponent>
    </div>
  );
};

export default Editor;
