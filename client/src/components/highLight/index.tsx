import React from 'react';

interface HighlightedTextProps {
  text: string;
  highlight: string;
  highlightColor?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight, highlightColor = "yellow" }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  // Create a regular expression to find all occurrences of the highlight word
  const regex = new RegExp(`(${highlight})`, 'gi');
  
  // Split the text and map over the matches
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={{ backgroundColor: highlightColor }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightedText;