'use client'

import markdownStyles from '@/components/markdown.module.css';
import { useEffect } from 'react';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash'


type Props = {
    content: string;
  };
  
  const PostBody = ({ content }: Props) => {

    useEffect(()=>{
        hljs.registerLanguage('js', typescript);
        hljs.registerLanguage('bash', bash);
        hljs.highlightAll()
    },[])

    return (
        <div className={markdownStyles["markdown"]} dangerouslySetInnerHTML={{ __html: content }} />
    )
  };
  
  export default PostBody;