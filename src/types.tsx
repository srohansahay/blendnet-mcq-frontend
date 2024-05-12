export interface Question{
 title: string;
 url: string;
 options: Array<string>;
 correct_option: string;
 id: string
}

export interface QuestionEditor{
 title: JSX.Element;
 url: JSX.Element;
 options: Array<JSX.Element>;
 correct_option: JSX.Element;
 id: string
}