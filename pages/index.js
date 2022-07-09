import React  from 'react';
import Image from 'next/image'
import Link from 'next/link';

const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;

export default function Home() {
  
    const htmlInput = '<p><a href="/contact">Contact</a></p><img width="200" height="200" src="/vercel.svg">';

    const processingInstructions = [
        {
            // Custom <a /> processing
            shouldProcessNode: (node) => {return  node.name === 'a';},
            processNode: (node, children,index) => {
              return <Link key={index} href={node.attribs.href} className={node.attribs.class}>{children[0]}</Link>;
            }
        },
        {
            // Custom <img /> processing
            shouldProcessNode: (node) => {return  node.name === 'img';},
            processNode: (node,children,index) => {
               return <Image key={index} src={node.attribs.src} className={node.attribs.class} width={node.attribs.width} height={node.attribs.height}  alt={node.attribs.alt} title={node.attribs.title}/>;
              }
        },
        {
            // Anything else
            shouldProcessNode: (node) => {return true;},
            processNode: new HtmlToReact.ProcessNodeDefinitions(React).processDefaultNode
        }
    ];

    const elements = new HtmlToReactParser().parseWithInstructions(htmlInput,()=>{return true},processingInstructions);

    return (
        <>
        <h1>Home</h1>
        {elements}
        </>
    )
}
