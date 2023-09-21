export interface ShowDto {
  score: string;
  show: Show;
}

export interface Show {
  id: string;
  url: string;
  averageRuntime: string;
  name: string;
  officialSite: string;
  network: {
    name: string;
  };
  image: {
    medium: string;
    original: string;
  };
  premiered: string;
  summary: string;
}
