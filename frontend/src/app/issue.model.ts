/*
export class Issue{
  id: any;
  title: string;
  responsible: string;
  description: string;
  severity: string;
  status: string;

  constructor(
      id: string;
      title: string;
      responsible: string;
      description: string;
      severity: string;
      status: string
  ) { }

  static CreateDefault(): Issue {
      return new Issue('', '', '', '', '', '');
  }
} */

export interface Issue{
      id: string;
      title: string;
      responsible: string;
      description: string;
      severity: string;
      status: string;
}
