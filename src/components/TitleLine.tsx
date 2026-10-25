import React from 'react';

interface TitleLineProps {
  children: React.ReactNode;
  level?: 1 | 2;
}

export default function TitleLine({ children, level = 2 }: TitleLineProps) {
  const lines: React.ReactNode[][] = [[]];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'br') {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(child);
    }
  });

  const content = lines.map((lineChildren, index) => (
    <React.Fragment key={index}>
      <span className="title-line">
        <span
          className="title-line-inner"
          data-reveal="line"
          style={{ '--order': index } as React.CSSProperties}
        >
          {lineChildren}
        </span>
      </span>
      {index < lines.length - 1 && <span className="sr-only"> </span>}
    </React.Fragment>
  ));

  if (level === 1) {
    return <h1>{content}</h1>;
  }
  return <h2>{content}</h2>;
}
