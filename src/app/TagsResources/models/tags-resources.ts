export interface appTagsResources {
  id: string;
  title: string;
  description: string;
  body: string;
  image: string;
  date: string;
  authors: {
    author: [
      {
        authorName: string;
        authorLink: string;
      }
    ];
  };
}
export interface appKeywordQuotes {
  keywords: string;
  quote: string;
  author: string;
}
export interface appAuthordQuotes {
  quote: string;
  author: string;
}
